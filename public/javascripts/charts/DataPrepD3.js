import * as d3 from 'd3';
import BarBackChart from './chart';

export default class DataPrepD3 {
    constructor(data) {
        //this.data = data;
        this.reducedData;
        this.frontData = {};
        this.yMax;
        this.nestedBackData;
        this.barBackChart1 = false;
        this.barBackChart2 = false;
        this.barBackChart3 = false;
        this.barBackChart4 = false;
    }

    prepareDataBackGraph(data) {
        this.calcReducedData(data);
        this.calcYMax();
        this.calcNestedBackData();
    }

    calcReducedData(data) {
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

    calcYMax() {
        this.yMax = d3.max(this.reducedData, d => d.rel_value + 0.1);
    }

    //Produce d3 friendly array
    calcNestedBackData() {
        this.nestedBackData = d3
            .nest()
            .key(d => d.risk_ind)
            .sortValues((a, b) => a.year - b.year)
            .entries(this.reducedData);
    }

    //Init objects for each risk indicator
    initD3Elements(yMax) {
        if (!this.barBackChart1)
            this.barBackChart1 = new BarBackChart(
                '#chart-bar-back1',
                'Akut aquatisches Risiko',
                yMax
            );
        if (!this.barBackChart2)
            this.barBackChart2 = new BarBackChart(
                '#chart-bar-back2',
                'Chronisch aquatisches Risiko',
                yMax
            );
        if (!this.barBackChart3)
            this.barBackChart3 = new BarBackChart(
                '#chart-bar-back3',
                'Akutes Risiko für NTA',
                yMax
            );
        if (!this.barBackChart4)
            this.barBackChart4 = new BarBackChart(
                '#chart-bar-back4',
                'Chronisches Risiko für Bodenorganismen',
                yMax
            );
    }

    prepareDataGraph(data) {
        this.frontData = data;
        for (let i = 0; i < this.frontData.length; i++) {
            this.frontData[i].sub_grp = this.frontData[i].sub_grp.subRegExp();
        }
    }

    updateCharts() {
        console.log(this.barBackChart1);
        this.barBackChart1.wrangleData(); //chart.js
        this.barBackChart2.wrangleData(); //chart.js
        this.barBackChart3.wrangleData(); //chart.js
        this.barBackChart4.wrangleData(); //chart.js
    }
}
