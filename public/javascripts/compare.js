import axios from 'axios';

import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../scss/compare.scss';
import '../../views/compare.ejs';
import './register';
import Select from './charts/Select';
import options from './compare/options';
import availableOptions from './compare/availableOptions';

let indicatorA = document.querySelector('.indicator-a');
let indicatorB = document.querySelector('.indicator-b');

window.addEventListener('load', availableOptions(options, indicatorA, indicatorB));
indicatorA.addEventListener('change', () => availableOptions(options, indicatorA, indicatorB));

import BarBackChart from './charts/BarBackChart';
import update from './compare/chartUpdateFunctions';
import listener from './charts/chartListener';

const chartParams = {
    lineData: [
        {
            key: 'high',
            values: [
                { type: 'high', year: 1996, value: 1.0 },
                { type: 'high', year: 2016, value: 1.0 },
            ],
        },
    ],

    yAxisLabel: '',
};

const chartInit = {
    charts: [{ barBackChart: false }, { barBackChart: false }],
    selectorCharts: ['#chart-bar-back1', '#chart-bar-back2'],
    headerCharts: ['Abbildung A', 'Abbildung B'],
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
