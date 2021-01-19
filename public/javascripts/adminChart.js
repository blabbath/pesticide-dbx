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

axios
    .get(`${configFE.url}/admin/risk_ind`)
    .then(({ data }) => {
        let initChart = function (arr) {
            let obj = {};
            arr.forEach((e, i) => {
                obj.charts = [];
                obj.charts.push({ barBackChart: false });
                obj.selectorCharts = [];
                obj.selectorCharts.push(`#chart-bar-back${i + 1}`);
                obj.headerCharts = [];
                obj.headerCharts.push(e);
            });
            return obj;
        };
        return initChart(data);
    })
    .then(result => {
        let chartContainer = document.querySelector('.chart-container');

        let createChartContainer = function (arr, node) {
            let inner;
            if (arr.length === 2) {
                inner =
                    '<div id="chart-view" class="tabcontent" style="position: relative; top: 40%;-webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">';
            } else {
                inner = `<div id="chart-view" class="tabcontent">
                        <div class="clr-row" class="charts">
                        ${
                            arr.length > 1
                                ? arr
                                      .map(item =>
                                          `<div class="svg-container clr-col-lg-12 clr-col-xl-6" id="${item.selectorCharts}"></div>
                        `.trim()
                                      )
                                      .join()
                                : `<div class="svg-container clr-col-lg-12" id="${arr.selectorCharts[0]}"></div>`
                        }
                    </div>
                </div>`;
            }
            console.log(inner);
            node.innerHTML = inner;
        };

        createChartContainer(result, chartContainer);

        result.charts.forEach((chart, i) => {
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
