import axios from 'axios';
import Controls from '../charts/Controls';
import configFE from '../../../config/live';

export default {
    controls: new Controls(),

    chartOnCheckAll(obj, charts, boolean) {
        const c = this;
        let subs = c.getSubs(obj, boolean);
        axios
            .get(
                `${configFE.url}/services/compare_subgrps?grp=${obj.grp}&act_grp=${obj.act}&base=${obj.basis}&weight=${obj.weight}&indicatorA=${obj.indA}&indicatorB=${obj.indB}`
            )
            .then(({ data }) => {
                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
            });
    },

    chartOnChange: function (charts, obj) {
        const c = this;
        obj.spinner.style.display = 'flex';
        axios
            .get(
                `${configFE.url}/services/compare_subgrps?grp=${obj.grp}&act_grp=${obj.act}&base=${obj.basis}&weight=${obj.weight}&indicatorA=${obj.indA}&indicatorB=${obj.indB}`
            )
            .then(({ data }) => {
                //TODO if change === basis keep checked boxes on new selection if subsOld === subsNew
                let arrSort = c.controls.sortSubGrps(obj.grp, data);
                let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];
                charts.forEach(chart => chart.barBackChart.updateChartBack(subsFill, data));
                obj.spinner.style.display = 'none';

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
                        `${configFE.url}/services/compare_data?grp=${obj.grp}&act_grp=${obj.act}&base=${obj.basis}&sub_grp=${obj.checkedSubs}&indicatorA=${obj.indA}&indicatorB=${obj.indB}`
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
                                `${configFE.url}/services/compare_data?grp=${obj.grp}&act_grp=${obj.act}&base=${obj.basis}&sub_grp=${obj.checkedSubs}&indicatorA=${obj.indA}&indicatorB=${obj.indB}`
                            )
                            .then(({ data }) => {
                                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                            });
                    });
                });
                c.controls.hoverOpacity();
            });
    },

    getSubs(obj, boolean) {
        let subs;
        if (boolean) {
            obj.getCheckedSubs();
            subs = obj.checkedSubs;
        } else {
            subs = undefined;
        }
        return subs;
    },
};
