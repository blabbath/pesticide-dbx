import controls from './createControls';

export default {
    filterForSubchecks(data) {
        let filtered = data;
        let arrSelects = controls.getNecessarySelects(data);
        arrSelects.forEach(e => {
            let item = document.getElementById(`select-${e}`).value;
            filtered = filtered.filter(obj => obj[e] === item);
        });
        return filtered;
    },

    filterCheckedSubs(data) {
        let checkedBoxes = document.querySelectorAll('input[name="state[sub_grp]"]:checked');
        let subs = [];
        checkedBoxes.forEach(e => subs.push(e.value));
        let filtered = data.filter(obj =>
            subs ? subs.includes(obj.sub_grp) : ['NoSubgroupsSelected'].includes(obj.sub_grp)
        );
        return filtered
    }
};
