import axios from 'axios';
import Controls from './Controls';
import configFE from '../../../config/live';

export default {
    controls: new Controls(),

    chartOnCheckAll(obj, charts, boolean) {
        const c = this;
        let v = c.getBaseAndIndicator(obj);
        c.service = v.indicator.includes('admin') ? 'admin' : 'services';
        let subs = c.getSubs(obj, boolean);

        axios
            .get(
                `${configFE.url}/${c.service}/visData_${v.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${v.base}&sub_grp=${subs}&weight=${obj.weight}`
            )
            .then(({ data }) => {
                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
            });
    },

    chartOnChange: function (charts, obj) {
        const c = this;
        let v = c.getBaseAndIndicator(obj);
        c.service = v.indicator.includes('admin') ? 'admin' : 'services';

        axios
            .get(
                `${configFE.url}/${c.service}/subgrps_${v.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${v.base}&weight=${obj.weight}`
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
                        `${configFE.url}/${c.service}/visData_${v.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${v.base}&weight=${obj.weight}&sub_grp=${obj.checkedSubs}`
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
                                `${configFE.url}/${c.service}/visData_${v.indicator}?grp=${obj.grp}&act_grp=${obj.act}&base=${v.base}&weight=${obj.weight}&sub_grp=${obj.checkedSubs}`
                            )
                            .then(({ data }) => {
                                charts.forEach(chart => chart.barBackChart.updateChartFront(data));
                            });
                    });
                });
                c.controls.hoverOpacity();
            });
    },

    getBaseAndIndicator(obj) {
        let v = {};
        v.indicator = obj.basis.split('-')[0];
        v.base = obj.basis.split('-')[1];
        return v;
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
