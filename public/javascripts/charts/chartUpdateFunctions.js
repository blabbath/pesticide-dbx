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

        let indicator = obj.basis.split('-')[0]
        let base = obj.basis.split('-')[1]

        axios
            .get(
                `${configFE.url}/services/visData_${indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${base}&sub_grp=${subs}`
            )
            .then(({ data }) => {
                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
            });
    },

    chartOnChange: function (charts, obj) {
        const c = this;

        c.indicator = obj.basis.split('-')[0]
        c.base = obj.basis.split('-')[1]

        axios
            .get(`${configFE.url}/services/subgrps_${c.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${c.base}`)
            .then(({ data }) => {
                //TODO if change === basis keep checked boxes on new selection if subsOld === subsNew
                let arrSort = c.controls.sortSubGrps(obj.grp, data);
                let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];
                charts.forEach(chart => chart.barBackChart.updateChartBack(subsFill, data));

                const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
                c.controls.removeHighlight();
                c.controls.createLegend(subGrps, obj);
                //Un-check select-all box on sub-grp reload
                obj.checkAll.checked = false;
            })
            .then(() => {
                //Runs on page load and grp/act change

                obj.getCheckedSubs();
                console.log(obj)
                axios
                    .get(
                        `${configFE.url}/services/visData_${c.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${c.base}&sub_grp=${obj.checkedSubs}`
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
                                `${configFE.url}/services/visData_${c.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${c.base}&sub_grp=${obj.checkedSubs}`
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
