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
import adminInitCharts from './admin/adminChartInit';
[essentialAssets, modal];

let chartParams = {
    yAxisLabel: '',
};

axios
    .get(`${configFE.url}/admin/risk_ind`)
    .then(({ data }) => {
        return adminInitCharts.initChartObject(data);
    })
    .then(result => {
        adminInitCharts.createChartContainer(result);
        result.charts.forEach((chart, i) => {
            if (!chart.barBackChart)
                chart.barBackChart = new BarBackChart(
                    result.selectorCharts[i],
                    result.headerCharts[i],
                    chartParams
                );
        });

        let select = new Select();

        listener.pageInit(select, update, result);
        listener.changeInput(select, update, result);
        listener.changeCheckAll(select, update, result);
    });
