import filter from './filter'
import Controls from '../charts/Controls';
let controls = new Controls();

export default {
    chartOnChange(data, initObject) {
        let filteredData = filter.filterForSubchecks(data);
        let arrSort = controls.sortSubGrps(undefined, filteredData);
        let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];
        
        //send data to charts and init back
        initObject.charts.forEach(chart => {
            chart.barBackChart.updateChartBack(subsFill, filteredData);
            chart.barBackChart.wrangleData();
        });
        
        //create subchecks
        const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
        controls.createLegend(subGrps, {});
        
        //filter by subchecks
        let filteredDataFront = filter.filterCheckedSubs(filteredData);
        initObject.charts.forEach(chart =>
            chart.barBackChart.updateChartFront(filteredDataFront)
        );
    }
}