import axios from 'axios';
import Controls from './Controls';
import configFE from '../../../config/live';

export default {
    controls: new Controls(),
    chartOnCheckAll(obj, charts, boolean) {
        let subs;
        if (boolean) {
            obj.getCheckedSubs();
            subs = obj.checkedSubs;
        } else {
            subs = undefined;
        }
        axios
            .get(
                `${configFE.url}/services/visData_${obj.basis}?grp=${obj.grp}&act_grp=${obj.act}&sub_grp=${subs}`
            )
            .then(({ data }) => {
                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
            });
    },

    chartOnChange: function (charts, obj) {
        const c = this;
        axios
            .get(`${configFE.url}/services/subgrps_${obj.basis}?grp=${obj.grp}&act_grp=${obj.act}`)
            .then(({ data }) => {
                let arrSort = c.controls.sortSubGrps(obj.grp, data);
                let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];

                charts.forEach(chart => chart.barBackChart.updateChartBack(subsFill, data));
                const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
                c.controls.createLegend(subGrps, obj);
                //Un-check select-all box on sub-grp reload
                obj.checkAll.checked = false;
            })
            .then(() => {
                //Runs on page load and grp/act change
                obj.getCheckedSubs();
                axios
                    .get(
                        `${configFE.url}/services/visData_${obj.basis}?grp=${obj.grp}&act_grp=${obj.act}&sub_grp=${obj.checkedSubs}`
                    )
                    .then(({ data }) => {
                        charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                    }); //REQUEST DATA FOR ALL SELECTED SUBGROUPS
                obj.subs.forEach(sub => {
                    sub.addEventListener('change', () => {
                        //Runs on checkbox change
                        obj.getCheckedSubs();
                        axios
                            .get(
                                `${configFE.url}/services/visData_${obj.basis}?grp=${obj.grp}&act_grp=${obj.act}&sub_grp=${obj.checkedSubs}`
                            )
                            .then(({ data }) => {
                                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                            });
                    });
                });
                c.controls.hoverOpacity();
            });
    },
};
