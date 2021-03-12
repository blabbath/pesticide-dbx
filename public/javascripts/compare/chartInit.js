import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

export default function initVis() {
    let vis = this;
    vis.margin = { left: 70, right: 20, top: 40, bottom: 50 };
    vis.height = 300 - vis.margin.top - vis.margin.bottom;
    vis.width = 500 - vis.margin.left - vis.margin.right;
    /* Init svg to draw in */
    vis.svg = select(vis.parentElement)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr(
            'viewBox',
            `0 0 ${vis.width + vis.margin.left + vis.margin.right} ${
                vis.height + vis.margin.top + vis.margin.bottom
            }`
        )
        .classed('svg-content-responsive', true)
        .attr('class', 'plot-area');
    vis.g = vis.svg
        .append('g')
        .attr('transform', `translate(${vis.margin.left}, ${vis.margin.top})`);

    /* Tooltip */
    vis.body = select('body');
    vis.tooltip = vis.body
        .append('div')
        .attr('id', 'scatter-rect')
        .attr('class', 'tooltip')
        .style('display', 'none');

    /* Y Label */
    vis.yLabel = vis.g
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - vis.margin.left)
        .attr('x', 0 - vis.height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .attr('class', 'y-label');

    /* X Label */
    vis.xLabel = vis.g
        .append('text')
        .attr('y', vis.height)
        .attr('x', vis.width / 2)
        .attr('dy', '2.5rem')
        .style('text-anchor', 'middle')
        .attr('class', 'x-label');

    /* Axis */
    vis.x = scaleLinear().range([0, vis.width]);
    vis.y = scaleLinear().range([vis.height, 0]);

    vis.xAxisCall = axisBottom(vis.x);
    vis.yAxisCall = axisLeft(vis.y);

    vis.xAxis = vis.g
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${vis.height})`);

    vis.yAxis = vis.g.append('g').attr('class', 'y-axis');
}
