import axios from 'axios';
import Controls from '../charts/Controls';
import configFE from '../../../config/live';
import compareFunction from './compareFunction';

export default {
    controls: new Controls(),

    chartOnCheckAll(select, charts, boolean, compare) {
        const c = this;
        let subs = c.getSubs(select, boolean);
        axios
            .get(
                `${configFE.url}/services/compare_subgrps?grp=${select.grp}&act_grp=${select.act}&base=${select.basis}&indicatorA=${select.indA}&indicatorB=${select.indB}`
            )
            .then(({ data }) => {
                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                compareFunction(compare, data);
            });
    },

    chartOnChange: function (charts, select, compare) {
        const c = this;
        select.spinner.style.display = 'flex';
        axios
            .get(
                `${configFE.url}/services/compare_subgrps?grp=${select.grp}&act_grp=${select.act}&base=${select.basis}&indicatorA=${select.indA}&indicatorB=${select.indB}`
            )
            .then(({ data }) => {
                //TODO if change === basis keep checked boxes on new selection if subsOld === subsNew
                let arrSort = c.controls.sortSubGrps(select.grp, data);
                let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];
                charts.forEach(chart => chart.barBackChart.updateChartBack(subsFill, data));
                select.spinner.style.display = 'none';

                const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
                c.controls.createLegend(subGrps, select);
                //Un-check select-all box on sub-grp reload
                select.checkAll.checked = false;
            })
            .then(() => {
                //Runs on page load and grp/act change
                select.getCheckedSubs();
                axios
                    .get(
                        `${configFE.url}/services/compare_data?grp=${select.grp}&act_grp=${select.act}&base=${select.basis}&sub_grp=${select.checkedSubs}&indicatorA=${select.indA}&indicatorB=${select.indB}`
                    )
                    .then(({ data }) => {
                        charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                        /* START */
                        compareFunction(compare, data);
                        /* END */
                    });
                //REQUEST DATA FOR ALL SELECTED SUBGROUPS
                select.subs.forEach(sub => {
                    sub.addEventListener('change', () => {
                        //Runs on checkbox change
                        select.getCheckedSubs();
                        axios
                            .get(
                                `${configFE.url}/services/compare_data?grp=${select.grp}&act_grp=${select.act}&base=${select.basis}&sub_grp=${select.checkedSubs}&indicatorA=${select.indA}&indicatorB=${select.indB}`
                            )
                            .then(({ data }) => {
                                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                                compareFunction(compare, data);
                            });
                    });
                });
                c.controls.hoverOpacity();
            });
    },

    getSubs(select, boolean) {
        let subs;
        if (boolean) {
            select.getCheckedSubs();
            subs = select.checkedSubs;
        } else {
            subs = undefined;
        }
        return subs;
    },
};
