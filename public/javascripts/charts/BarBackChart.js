import { max } from 'd3-array';
import { nest } from 'd3-collection';
import initVis from './chartInit';
import wrangleData from './chartWrangle';
import updateVis from './chartUpdate';
import updateStackBars from './chartStackBars';

const BarBackChart = class BarBackChart {
    constructor(_parentElement, _risk, chartParams) {
        this.parentElement = _parentElement;
        this.risk = _risk;
        this.yMax;
        this.subsFill;
        this.nestedBackData = {};
        this.frontData = {};
        this.reducedData;
        this.chartParams = chartParams;
        this.initVis();
    }

    updateChartBack(subsFill, data) {
        this.setSubsFill(subsFill);
        this.prepareDataBackGraph(data);
        this.wrangleData();
    }

    updateChartFront(data) {
        this.prepareDataGraph(data);
        this.wrangleData();
    }

    calcYMax() {
        this.yMax = max(this.reducedData, d => d.rel_value + 0.1);
    }

    setYMax(yMax) {
        this.yMax = yMax;
    }
    setSubsFill(subsFill) {
        this.subsFill = subsFill;
    }

    prepareDataBackGraph(data) {
        this.reduceData(data);
        this.calcYMax();
        this.nestBackData();
    }

    prepareDataGraph(data) {
        this.frontData = data;
        for (let i = 0; i < this.frontData.length; i++) {
            this.frontData[i].sub_grp = this.frontData[i].sub_grp.subRegExp();
        }
    }

    reduceData(data) {
        this.reducedData = [
            ...data
                .reduce((r, obj) => {
                    const key = obj.year + '-' + obj.risk_ind;
                    const item =
                        r.get(key) ||
                        Object.assign({}, obj, {
                            rel_value: 0,
                        });
                    item.rel_value += obj.rel_value;
                    return r.set(key, item);
                }, new Map())
                .values(),
        ];
    }

    nestBackData() {
        this.nestedBackData = nest()
            .key(d => d.risk_ind)
            .sortValues((a, b) => a.year - b.year)
            .entries(this.reducedData);
    }
};

BarBackChart.prototype.initVis = initVis;
BarBackChart.prototype.wrangleData = wrangleData;
BarBackChart.prototype.updateVis = updateVis;
BarBackChart.prototype.updateStackBars = updateStackBars;

export default BarBackChart;
