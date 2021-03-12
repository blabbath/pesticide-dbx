import { max } from 'd3-array';
import initVis from './chartInit';
import wrangleData from './chartWrangle';
import updateChart from './chartUpdate';

const CompareChart = class CompareChart {
    constructor(_parentElement, _risk, chartParams) {
        this.parentElement = _parentElement;
        this.risk = _risk;
        this.xyMax;
        this.xMax;
        this.yMax;
        this.chartParams = chartParams;
        this.initVis();
    }

    getMax(scatterData) {
        this.xMax = max(scatterData, d => d.x) + max(scatterData, d => d.x) * 0.05;
        this.yMax = max(scatterData, d => d.y) + max(scatterData, d => d.y) * 0.05;
    }

    updateChart() {
        wrangleData();
    }
};

CompareChart.prototype.initVis = initVis;
CompareChart.prototype.wrangleData = wrangleData;
CompareChart.prototype.updateChart = updateChart;

export default CompareChart;
