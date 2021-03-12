export default {
    pageInit: function (select, update, chartInit, compare) {
        window.addEventListener('load', () => {
            select.getChosenInputs();
            select.getHiddenSubs();
            update.chartOnChange(chartInit.charts, select, compare.charts);
        });
    },

    changeInput: function (select, update, chartInit, compare) {
        for (const e of select.clrSelect) {
            e.addEventListener('change', () => {
                if (e.name.includes('basis')) {
                    let elemSubs = document.querySelectorAll(
                        'input[name="state[sub_grp]"]:checked'
                    );
                    let hiddenSubs = Array.prototype.slice
                        .call(elemSubs)
                        .map(e => e.classList.value);
                    select.setHiddenSubs(hiddenSubs);
                } else {
                    select.getHiddenSubs();
                }
                select.getChosenInputs();
                update.chartOnChange(chartInit.charts, select, compare.charts);
            });
        }
    },

    changeCheckAll: function (select, update, chartInit, compare) {
        select.checkAll.addEventListener('change', () => {
            if (select.checkAll.checked) {
                select.subs.forEach(e => {
                    e.checked = true;
                });
                update.chartOnCheckAll(select, chartInit.charts, true, compare.charts);
            } else {
                select.subs.forEach(e => {
                    e.checked = false;
                });
                update.chartOnCheckAll(select, chartInit.charts, false, compare.charts);
            }
        });
    },
};
