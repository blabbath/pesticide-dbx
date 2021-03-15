import { transition } from 'd3-transition';
import { easePolyOut } from 'd3-ease';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

export default function updateChart() {
    let vis = this;

    vis.t = 1500;
    vis.transFull = transition().duration(vis.t).ease(easePolyOut);

    vis.x.domain([0, vis.xMax]);
    vis.y.domain([0, vis.yMax]);

    vis.xAxis.transition(vis.transFull).call(vis.xAxisCall);
    vis.yAxis.transition(vis.transFull).call(vis.yAxisCall);

    vis.g.append('g').attr('class', 'scatter');
    vis.scatter = vis.g
        .selectAll('g.scatter')
        .selectAll('circle')
        .data(vis.scatterData, d => d.year);
    vis.scatter.join(
        enter =>
            enter
                .append('circle')
                .attr('cx', d => vis.x(d.x))
                .attr('cy', d => vis.y(d.y))
                .attr('r', 5)
                .attr('fill', 'grey')
                .attr('fill-opacity', 0)
                .attr('class', d => `circle_${d.sub}_${d.year}`)
                .on('mouseover', mouseover)
                .on('mouseout', mouseout)
                .call(enter => enter.transition(vis.transFull).attr('fill-opacity', 1)),
        update =>
            update.call(update =>
                update
                    .transition(vis.transFull)
                    .attr('cx', d => vis.x(d.x))
                    .attr('cy', d => vis.y(d.y))
            ),
        exit => exit.call(exit => exit.transition(vis.transFull).attr('fill-opacity', 0).remove())
    );

    vis.stacks = document.querySelectorAll('rect[class^="stack-"]');
    vis.colors = [];
    vis.stacks.forEach(s => {
        let name = s.classList[0].replace('stack-', '');
        let rgb = s.parentElement.style.fill;
        let obj = { name, rgb };
        if (!vis.colors.some(color => color.name === name)) {
            vis.colors.push(obj);
        }
    });

    vis.points = document.querySelectorAll('circle[class^="circle_"]');
    vis.pointsStacksID = [];
    vis.points.forEach(p => {
        let name = p.classList[0].split('_')[1];
        let id = [];
        vis.pointsStacksID.push(p.classList[0].split('_')[1] + '-' + p.classList[0].split('_')[2]);
        vis.colors.forEach(color => {
            if (name === color.name) {
                p.style.fill = color.rgb;
            }
        });
    });

    vis.selectA = document.querySelector('.indicator-a');
    vis.selectB = document.querySelector('.indicator-b');
    vis.indA = vis.selectA.options[vis.selectA.selectedIndex].text;
    vis.indB = vis.selectB.options[vis.selectB.selectedIndex].text;
    vis.xLabel.text(vis.indA);
    vis.yLabel.text(vis.indB);

    vis.line = line()
        .x(d => vis.xLine(d.x))
        .y(d => vis.y(d.y));

    function mouseover(d) {
        /* Enlarge Point */
        select(this).transition().duration(250).attr('r', 10).style('stroke', 'white');

        /* Highlickt corresponding stacks */
        let pointID = this.classList[0].split('_')[1] + '-' + this.classList[0].split('_')[2];
        vis.stacks.forEach(stack => {
            if (stack.id !== pointID) {
                window.requestAnimationFrame(function () {
                    // assume that bar should complete final 50% in 10s
                    stack.style.transition = 'fill-opacity 250ms linear';
                    stack.setAttribute('fill-opacity', 0.3);
                });
            }
        });

        /* Show tooltip */
        vis.tooltip
            .html(
                `${d.sub
                    .replace('stack-', '')
                    .toUpperCase()
                    .replace(/-{2,}/g, '-')
                    .replace(/-+$/, '')} (${d.year})
                    <br>${vis.indA}: ${d.x.toFixed(5)}
                    <br>${vis.indB}: ${d.y.toFixed(5)}
                `
            )
            .style('display', 'block')
            .style('left', event.pageX + 20 + 'px')
            .style('top', event.pageY - 30 + 'px');
    }

    function mouseout(d) {
        select(this).transition().duration(250).attr('r', 5).style('stroke', 'none');
        vis.tooltip.style('display', 'none');
        vis.stacks.forEach(stack => {
            window.requestAnimationFrame(function () {
                // assume that bar should complete final 50% in 10s
                stack.style.transition = 'fill-opacity 250ms linear';
                stack.setAttribute('fill-opacity', 1);
            });
        });
    }
}
