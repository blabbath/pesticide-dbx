import { event } from 'd3-selection';
export default function updateStackBars() {
    let vis = this;

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
                        .attr('height', d => vis.y(d[0]) - vis.y(d[1]))
                        .attr('width', vis.x.bandwidth())
                        .call(enter => enter.transition(vis.transFull)),
                update =>
                    update
                        .on('mouseover', mouseover)
                        .on('mouseout', mouseleave)
                        .call(update =>
                            update
                                .transition(vis.transHalf)
                                .delay(vis.t)
                                .attr('x', d => vis.x(d.data.year))
                                .attr('width', vis.x.bandwidth())
                                .attr('y', d => vis.y(d[1]))
                                .attr('height', d => vis.y(d[0]) - vis.y(d[1]))
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
            .style('left', event.pageX + 20 + 'px')
            .style('top', event.pageY - 30 + 'px');
    }

    function mouseleave(d) {
        vis.tooltip.style('display', 'none');
    }
}
