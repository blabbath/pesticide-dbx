export default class Select {
    constructor() {
        this.basis = document.querySelector('#select-basis').value;
        this.grp = document.querySelector('#select-grp').value;
        this.act = document.querySelector('#select-act').value;
    }

    set setBasis(basis) {
        this.basis = basis;
    }

    set setGrp(grp) {
        this.grp = grp;
    }

    set setActGrp(act) {
        this.act = act;
    }

    selectInput() {
        let obj = {
            basis: document.querySelector('#select-basis').value,
            grp: document.querySelector('#select-grp').value,
            act: document.querySelector('#select-act').value,
            elemSubs: document.querySelectorAll('.hidden-sub'),
        };
        return obj;
    }
}
