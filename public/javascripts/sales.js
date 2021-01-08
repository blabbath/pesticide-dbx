import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/charts.scss';
import '../../views/charts.ejs';
import update from './charts/chartUpdateFunctions';
import BarBackChart from './charts/BarBackChart';
import Select from './charts/Select';
import listener from './charts/chartListener';
import '../scss/chart/modal.scss';
import * as modal from './index/modal';
[essentialAssets, modal];

const chartParams = { yAxisLabel: 't/Jahr' };

const chartInit = {
    charts: [{ barBackChart: false }],
    selectorCharts: ['#chart-bar-back1'],
    headerCharts: ['Absolute Absatzzahlen (t/Jahr)'],
};

chartInit.charts.forEach((chart, i) => {
    if (!chart.barBackChart)
        chart.barBackChart = new BarBackChart(
            chartInit.selectorCharts[i],
            chartInit.headerCharts[i],
            chartParams
        );
});

let select = new Select();

listener.pageInit(select, update, chartInit);
listener.changeInput(select, update, chartInit);
listener.changeCheckAll(select, update, chartInit);
