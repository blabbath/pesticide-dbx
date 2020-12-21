import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/charts.scss';
import '../../views/charts.ejs';
import update from './charts/chartUpdateFunctions';
import BarBackChart from './charts/BarBackChart';
import '../scss/chart/modal.scss';
import * as modal from './index/modal';
import Select from './charts/Select';
[essentialAssets, modal];

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
    
    yAxisLabel: 'Relativer HRI',
}

const chartInit = {
charts: [{ barBackChart: false }],
selectorCharts: ['#chart-bar-back1'],
headerCharts: ['Harmonized Risk (%)']
}

chartInit.charts.forEach((chart, i) => {
    if (!chart.barBackChart)
        chart.barBackChart = new BarBackChart(chartInit.selectorCharts[i], chartInit.headerCharts[i], chartParams);
});

let select = new Select();

//Initial page load
document.addEventListener('DOMContentLoaded', () => {
    select.getChosenInputs();
    update.chartOnChange(chartInit.charts, select);
});

//Change of select elements basis, grp, act_grp, subs
for (const e of select.clrSelect) {
    e.addEventListener('change', () => {
        select.getChosenInputs();
        update.chartOnChange(chartInit.charts, select);
    });
}

//Runs on checkbox-all change
select.checkAll.addEventListener('change', () => {
    if (select.checkAll.checked) {
        select.subs.forEach(e => {
            e.checked = true;
        });
        update.chartOnCheckAll(select, chartInit.charts, true);
    } else {
        select.subs.forEach(e => {
            e.checked = false;
        });
        update.chartOnCheckAll(select, chartInit.charts, false);
    }
});
