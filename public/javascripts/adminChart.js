import axios from 'axios';
import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/charts.scss';
import '../../views/charts.ejs';
import update from './charts/chartUpdateFunctions';
import '../scss/chart/modal.scss';
import * as modal from './index/modal';
import BarBackChart from './charts/BarBackChart';
import Select from './charts/Select';
import listener from './charts/chartListener';
import configFE from '../../config/live';
[essentialAssets, modal];

let chartParams = {
    yAxisLabel: '',
};

axios.get(`${configFE.url}/admin/risk_ind`).then(({ data }) => {
    console.log(data);
});

let chartInit = {
    charts: [{ barBackChart: false }],

    selectorCharts: ['#chart-bar-back1'],

    headerCharts: ['Harmonized Risk (%)'],
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
