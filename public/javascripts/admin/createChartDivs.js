import initCharts from './initCharts';

export default {
    divs: function (data) {
        let riskInd = [...new Set(data.map(item => item.risk_ind))];
        let initObject = initCharts.initChartObject(riskInd);
        initCharts.createChartContainer(initObject);
        initObject = initCharts.createChartObjects(initObject);
        return initObject;
    },
};
