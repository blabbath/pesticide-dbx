import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/charts.scss';
import '../../views/charts.ejs';
import update from './charts/chartUpdateFunctions';
import BarBackChart from './charts/BarBackChart';
import Select from './charts/Select';
import listener from './charts/chartListener';
import * as register from './register'
[essentialAssets, register];

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

    yAxisLabel: 'Relativer PRI',
};

const chartInit = {
    charts: [{ barBackChart: false }, { barBackChart: false }, { barBackChart: false }],
    selectorCharts: ['#chart-bar-back1', '#chart-bar-back2', '#chart-bar-back3'],
    headerCharts: [
        'Pesticide Risk (%)',
        'Pesticide Risk Human (%)',
        'Pesticide Risk Environment (%)',
    ],
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
