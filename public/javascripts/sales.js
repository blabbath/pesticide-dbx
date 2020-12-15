import * as wpAssets from '../../assets/chartImports'
import * as hmr from '../../assets/webpackHMR';
import '../scss/charts.scss';
import '../../views/charts.ejs';
import update from './charts/chartUpdateFunctions';
import { charts, select } from './sales/initBarBackChart';

[wpAssets]

String.prototype.subRegExp = function () {
    const regString = this.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    return regString;
};

//Initial page load
document.addEventListener('DOMContentLoaded', () => {
    select.getChosenInputs();
    update.chartOnChange(charts, select);
});

//Change of select elements basis, grp, act_grp, subs
for (const e of select.clrSelect) {
    e.addEventListener('change', () => {
        select.getChosenInputs();
        update.chartOnChange(charts, select);
    });
}

//Runs on checkbox-all change
select.checkAll.addEventListener('change', () => {
    if (select.checkAll.checked) {
        select.subs.forEach(e => {
            e.checked = true;
        });
        update.chartOnCheckAll(select, charts, true);
    } else {
        select.subs.forEach(e => {
            e.checked = false;
        });
        update.chartOnCheckAll(select, charts, false);
    }
});
