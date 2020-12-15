import { select } from 'd3-selection';
import { scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';

export default function initVis() {
    let vis = this;
    vis.margin = { left: 70, right: 20, top: 40, bottom: 30 };
    vis.height = 300 - vis.margin.top - vis.margin.bottom;
    vis.width = 500 - vis.margin.left - vis.margin.right;

    //Init svg to draw in
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

    //Add tooltips
    vis.body = select('body');
    vis.tooltip = vis.body
        .append('div')
        .attr('id', 'hover-rect')
        .attr('class', 'tooltip')
        .style('display', 'none');

    //Define plot titles
    vis.g
        .append('text')
        .attr('class', 'chart-title')
        .attr('x', vis.width / 2)
        .attr('y', vis.height * 0.005)
        .attr('dy', -10)
        .attr('text-anchor', 'middle')
        .text(vis.risk);
    //Add y-label
    vis.g
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - vis.margin.left)
        .attr('x', 0 - vis.height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text(vis.chartParams.yAxisLabel);

    //Add drawing areas for back-bars lines and stack for ordering
    vis.g.append('g').attr('class', 'back-bars');
    vis.g.append('g').attr('class', 'stacks');
    vis.g.append('g').attr('class', 'lines');

    //Define scale types
    vis.x = scaleBand().range([0, vis.width]).padding(0.2);
    vis.xLine = scaleOrdinal().range([0, vis.width], 0.09);

    vis.y = scaleLinear().range([vis.height, 0]);

    vis.yHeight = scaleLinear().range([0, vis.height]);

    //Define axis
    vis.xAxisCall = axisBottom(vis.x);
    vis.yAxisCall = axisLeft(vis.y);

    vis.xAxis = vis.g
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${vis.height})`);

    vis.yAxis = vis.g.append('g').attr('class', 'y-axis');

    //Define lines
    vis.line = line()
        .x(d => vis.xLine(d.year))
        .y(d => vis.y(d.value));

    //Set line colors
    if (vis.chartParams.lineData) {
        vis.lineColorScheme = ['#b6b3b3', '#5576f0', '#04873f'];
        vis.lineColor = scaleOrdinal()
            .range(vis.lineColorScheme)
            .domain(vis.chartParams.lineData.map(d => d.key));
    }
}
