import { transition } from 'd3-transition';
import { easePolyOut } from 'd3-ease';

export default function updateVis() {
    let vis = this;
    //Defining transitions
    vis.t = 1250;
    vis.transFull = transition().duration(vis.t).ease(easePolyOut);
    vis.transHalf = transition()
        .duration(vis.t / 2)
        .ease(easePolyOut);
    vis.delay = 675;

    ///////////////// AXIS /////////////////
    //UPDATE SCALES
    vis.x.domain(vis.range);
    vis.y.domain([0, vis.yMax]);

    //xAxis
    vis.xAxis
        .transition(vis.transFull)
        .call(vis.xAxisCall)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.2em')
        .attr('dy', '.55em')
        .attr('transform', 'rotate(-45)');

    //Check if a horizontal line is added that has no tick on yAxis and add tick if necessary
    vis.yTicks = vis.y.ticks();
    if (vis.chartParams.lineData) {
        if (vis.yAxisCall.tickValues()) {
            let ticks = [];
            vis.chartParams.lineData.forEach(e => {
                ticks.push(e.values[0].value);
            });

            if (!ticks.every(value => vis.yAxisCall.tickValues().includes(value))) {
                ticks.forEach(e => {
                    if (!vis.yAxisCall.tickValues().includes(e)) {
                        vis.yTicks.push(e);
                    }
                });
            }
        }
    }

    vis.yAxis.transition(vis.transFull).call(vis.yAxisCall.tickValues(vis.yTicks));

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
                .call(enter => enter.transition(vis.transFull).attr('width', vis.x.bandwidth())),
        update =>
            update.call(update =>
                update
                    .transition(vis.transHalf)
                    .delay(vis.t)
                    .attr('width', vis.x.bandwidth())
                    .attr('x', d => vis.x(d.year))
                    .attr('y', d => vis.y(d['rel_value']))
                    .attr('height', d => vis.height - vis.y(d['rel_value']))
            ),

        exit => {
            return exit.transition(vis.transFull).attr('y', vis.y(0)).attr('height', 0).remove();
        }
    );

    ///////////////// LINES /////////////////
    if (vis.chartParams.lineData) {
        vis.lines = vis.g.selectAll('g.lines').selectAll('.line').data(vis.chartParams.lineData);

        vis.lines.join(
            enter =>
                enter
                    .append('path')
                    .attr('class', 'line')
                    .style('stroke', d => vis.lineColor(d.key))
                    .style('stroke-width', '2px')
                    .style('stroke-opacity', 0)
                    .call(enter => enter.transition(vis.transFull).style('stroke-opacity', 1)),
            update =>
                update.call(update =>
                    update
                        .transition(vis.transFull)
                        .attr('d', d => vis.line(d.values))
                )
        );
    }

    vis.updateStackBars();
}
