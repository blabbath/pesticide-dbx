export default class Select {
    constructor() {
        this.basis;
        this.weight;
        this.grp;
        this.act;
        this.subs;
        this.indA;
        this.indB;
        this.checkedSubs;
        this.hiddenSubs;
        this.currentSubs = document.querySelectorAll('.checkbox-label');
        this.subsFill;
        this.checkAll = document.querySelector('#select-all-checks');
        this.clrSelect = document.querySelectorAll('.clr-select');
        this.spinner = document.querySelector('.loading');
    }

    getChosenInputs() {
        if (document.querySelector('.select-basis')) {
            this.basis = document.querySelector('.select-basis').value;
        }

        if (document.querySelector('.select-weight')) {
            this.weight = document.querySelector('.select-weight').value;
        }

        if (document.querySelector('.select-grp')) {
            this.grp = document.querySelector('.select-grp').value;
        }

        if (document.querySelector('.select-act')) {
            this.act = document.querySelector('.select-act').value;
        }

        if (document.getElementsByName('state[sub_grp]')) {
            this.subs = document.getElementsByName('state[sub_grp]');
        }

        if (document.querySelector('.indicator-a')) {
            this.indA = document.querySelector('.indicator-a').value;
        }
        if (document.querySelector('.indicator-b')) {
            this.indB = document.querySelector('.indicator-b').value;
        }
    }

    getCheckedSubs() {
        let checkedBoxes = document.querySelectorAll('input[name="state[sub_grp]"]:checked');
        let subGrps = [];
        checkedBoxes.forEach(e => subGrps.push(e.classList.value.replace(/,/g, 'XY')));
        this.checkedSubs = subGrps;
    }

    getHiddenSubs() {
        const elemSubs = document.querySelectorAll('.hidden-sub');
        if (elemSubs.length < 1) {
            this.hiddenSubs = undefined;
        } else {
            this.hiddenSubs = Array.prototype.slice.call(elemSubs).map(e => e.id);
        }
    }

    getSubsFill(data) {
        let arrSort = this.sortSubGrps(this.grp, data);
        this.subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];
    }

    setHiddenSubs(hidden) {
        this.hiddenSubs = hidden;
    }

    getCurrentSubs() {
        this.currentSubs = document.querySelectorAll('.checkbox-label');
    }
}
