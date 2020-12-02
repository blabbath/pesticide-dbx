import * as d3 from 'd3';
import chartData from './chartData';

export default function updateVis() {
    let vis = this;
    //Defining transitions
    vis.t = 1250;
    vis.trans = d3.transition().duration(vis.t).ease(d3.easePolyOut);

    ///////////////// AXIS /////////////////
    //UPDATE SCALES
    vis.x.domain(vis.range);
    vis.y.domain([0, vis.yMax]);

    //xAxis
    vis.xAxis
        .transition(vis.trans)
        //.delay(675)
        .call(vis.xAxisCall)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.2em')
        .attr('dy', '.55em')
        .attr('transform', 'rotate(-45)');

    vis.yTicks = vis.y.ticks();
    vis.yTicks.push(0.7);
    vis.yAxis
        .transition(vis.trans)
        //.delay(675)
        .call(vis.yAxisCall.tickValues(vis.yTicks));
    ///////////////// BACKGROUND BARS /////////////////
    vis.backBars = vis.g
        .selectAll('g.back-bars')
        .selectAll('rect')
        .data(vis.datafiltered, d => d.year);

    vis.backBars.join(
        enter =>
            enter
                .append('rect')
                .attr('class', 'back-rect')
                .attr('stroke', '#bec1c1')
                .attr('stroke-width', '.035rem')
                .attr('fill-opacity', 0)
                .attr('x', d => vis.x(d.year))
                .attr('y', vis.y(0))
                .attr('height', 0)
                .attr('width', vis.x.bandwdith)
                .call(enter => enter.transition(vis.trans)),
        update =>
            update.call(update =>
                update
                    .transition(vis.trans)
                    .delay(675)
                    .attr('x', d => vis.x(d.year))
                    .attr('y', d => vis.y(d['rel_value']))
                    .attr('height', d => vis.height - vis.y(d['rel_value']))
                    .attr('width', vis.x.bandwidth())
            ),
        exit => {
            return exit
                .transition(vis.trans)
                .attr('y', vis.y(0))
                .attr('height', 0)
                .remove();
        }
    );
    ///////////////// LINES /////////////////
    vis.lines = vis.g
        .selectAll('g.lines')
        .selectAll('.line')
        .data(chartData.lineData);

    vis.lines.join(
        enter =>
            enter
                .append('path')
                .attr('class', 'line')
                .attr('d', d => vis.line(d.values))
                .style('stroke', d => vis.lineColor(d.key))
                .style('stroke-width', '2px')
                .call(enter => enter.transition(vis.trans)),
        update =>
            update.call(update =>
                update
                    .transition(vis.trans)
                    .delay(675)
                    .attr('d', d => vis.line(d.values))
                    .attr('stroke-opacity', 1)
            )
    );
    ///////////////// TOOLTIP /////////////////
    function mouseover(d) {
        vis.tooltip
            .html(
                `${d.class
                    .replace('stack-', '')
                    .toUpperCase()
                    .replace(/-{2,}/g, '-')
                    .replace(/-+$/, '')}: ${(d[1] - d[0]).toFixed(5)}`
            )
            .style('display', 'block')
            .style('left', d3.event.pageX + 20 + 'px')
            .style('top', d3.event.pageY - 30 + 'px');
    }

    function mouseleave(d) {
        vis.tooltip.style('display', 'none');
    }
    ///////////////// STACKED BARS /////////////////
    vis.stackData.forEach(stackedBar => {
        stackedBar.forEach(stack => {
            stack.id = `${stackedBar.key}-${stack.data.year}`;
            stack.class = `stack-${stackedBar.key}`;
        });
    });

    vis.bars = vis.g
        .selectAll('g.stacks')
        .selectAll('.stack')
        .data(vis.stackData, d => d.key);

    vis.bars.join(
        enter => {
            vis.barsEnter = enter.append('g').attr('class', 'stack');
            vis.barsEnter
                .append('g')
                .attr('class', 'bars')
                .style('fill', d => vis.colors(d.key));
            updateRects(vis.barsEnter.select('.bars'));
            return enter;
        },
        update => {
            vis.barsUpdate = update.select('.bars');
            updateRects(vis.barsUpdate);
        },
        exit => exit.remove()
    );

    function updateRects(childRects) {
        childRects
            .selectAll('rect')
            .data(
                d => d,
                d => d.id
            )
            .join(
                enter =>
                    enter
                        .append('rect')
                        .attr('id', d => d.id)
                        .attr('class', 'bar')
                        .attr('class', d => d.class)
                        .attr('x', d => vis.x(d.data.year))
                        .attr('y', vis.y(0))
                        .attr('width', vis.x.bandwidth())
                        .call(
                            enter =>
                                enter
                                    .transition(vis.trans)
                                    .attr('x', d => vis.x(d.data.year))
                                    .attr('y', d => vis.y(d[1]))
                                    .attr(
                                        'height',
                                        d => vis.y(d[0]) - vis.y(d[1])
                                    )
                            //.attr('width', vis.x.bandwidth())
                        ),
                update =>
                    update
                        .on('mouseover', mouseover)
                        .on('mouseout', mouseleave)
                        .call(update =>
                            update
                                .transition(vis.trans)
                                .delay(675)
                                .attr('x', d => vis.x(d.data.year))
                                .attr('y', d => vis.y(d[1]))
                                .attr('height', d => vis.y(d[0]) - vis.y(d[1]))
                                .attr('width', vis.x.bandwidth())
                        ),
                exit =>
                    exit.call(exit => {
                        return exit
                            .transition()
                            .duration(500)
                            .attr('y', vis.y(0))
                            .attr('height', 0)
                            .remove();
                    })
            );
    }
}
