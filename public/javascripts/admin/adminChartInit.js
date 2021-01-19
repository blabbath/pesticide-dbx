export default {
    chartContainer: document.querySelector('.chart-container'),

    createChartContainer(obj) {
        let inner;
        if (obj.charts.length === 2) {
            inner =
                '<div id="chart-view" class="tabcontent" style="position: relative; top: 40%;-webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">';
        } else {
            inner = `<div id="chart-view" class="tabcontent">
                            <div class="clr-row" class="charts">
                            ${
                                obj.charts.length > 1
                                    ? obj.selectorCharts
                                          .map(item =>
                                              `<div class="svg-container clr-col-lg-12 clr-col-xl-6" id="${item.replace('#', '')}"></div>
                            `.trim()
                                          )
                                          .join('')
                                    : `<div class="svg-container clr-col-lg-12" id="${obj.selectorCharts[0].replace('#', '')}"></div>`
                            }
                        </div>
                    </div>`;
        }
        this.chartContainer.innerHTML = inner;
    },

    initChartObject(arr) {
        let obj = {};
        obj.charts = [];
        obj.selectorCharts = [];
        obj.headerCharts = [];
        for (let i = 0; i < arr.length; i++) {
            obj.charts.push({ barBackChart: false });
            obj.selectorCharts.push('#chart-bar-back' + (i + 1));
            obj.headerCharts.push(arr[i]);
        }
        return obj;
    },
};
