export default {
    selectBox(data) {
        let selectControls = document.querySelector('.select-container');
        selectControls.innerHTML = '';
        let arr = this.getSelectValues(data);
        arr.forEach(e => {
            let key = Object.keys(e)[0];
            let inner = `
                <div class="grp-container">
                    <label for="select-${key}" class="clr-control-label">
                        ${key.toUpperCase()}
                    </label>
                    <div class="clr-select-wrapper">
                        <select
                            name="state[${key}]"
                            class="clr-select select-input"
                            id="select-${key}"
                        >
                            ${e[key]
                                .map(item => `<option value="${item}">${item}</option>`)
                                .join('')}
                        </select>
                    </div>
                </div>
            `;
            selectControls.innerHTML += inner;
        });
    },

    getNecessarySelects(data) {
        let arr = [];
        data[0].hasOwnProperty('base') ? arr.push('base') : false;
        data[0].hasOwnProperty('act_grp') ? arr.push('act_grp') : false;
        data[0].hasOwnProperty('grp') ? arr.push('grp') : false;
        data[0].hasOwnProperty('weight') ? arr.push('weight') : false;
        return arr;
    },

    getSelectValues(data) {
        let arr = this.getNecessarySelects(data);
        let selectValues = [];
        arr.forEach(e => {
            let entries = [...new Set(data.map(item => item[e]))];
            selectValues.push({ [e]: entries });
        });
        return selectValues;
    },
};
