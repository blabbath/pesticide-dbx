import axios from 'axios';

import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../scss/compare.scss';
import '../../views/compare.ejs';
import './register';
import './compare/availableOptions';
import './compare/updateTitle';
import Select from './charts/Select';
import BarBackChart from './charts/BarBackChart';
import CompareChart from './compare/CompareChart';
import update from './compare/chartUpdateFunctions';
import listener from './compare/chartListener';

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
    headerCharts: ['figureA', 'figureB'],
};

chartInit.charts.forEach((chart, i) => {
    if (!chart.barBackChart)
        chart.barBackChart = new BarBackChart(
            chartInit.selectorCharts[i],
            chartInit.headerCharts[i],
            chartParams
        );
});

const compareParams = {
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

const compareInit = {
    charts: [{ compareChart: false }/* , { compareChart: false } */],
    selectorCharts: ['#chart-scatter-1'/* , '#chart-scatter-2' */],
    headerCharts: ['Abbildung C'/* , 'Abbildung D' */],
};

compareInit.charts.forEach((chart, i) => {
    if (!chart.compareChart)
        chart.compareChart = new CompareChart(
            compareInit.selectorCharts[i],
            compareInit.headerCharts[i],
            compareParams
        );
});

let select = new Select();

listener.pageInit(select, update, chartInit, compareInit);
listener.changeInput(select, update, chartInit, compareInit);
listener.changeCheckAll(select, update, chartInit, compareInit);
