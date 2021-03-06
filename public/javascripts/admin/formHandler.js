export default {
    genInputs: document.getElementById('generated-inputs'),

    displayRiskIndicators(data) {
        const c = this;
        let riskIndicators = [...new Set(data.map(item => item.risk_ind))];
        let alertDanger = document.querySelector('.alert-danger');
        let alertSuccess = document.querySelector('.alert-success');

        riskIndicators.forEach((riskInd, i) => {
            if (this.checkDataValidity(data)) {
                alertDanger.style.display = 'none';
                alertSuccess.style.display = 'flex';
                let risk = riskInd
                    .toLowerCase()
                    .replace(/[^a-zA-Z ]/g, '')
                    .replace(' ', '-');
                let innerHTML = `
                <div class="input-risk">
                    <label for="${risk}">Risiko Indikator (${i + 1})</label>
                    <p>
                        ${riskInd}
                    </p>      
                </div>
                `;
                c.genInputs.innerHTML += innerHTML;
            } else {
                alertSuccess.style.display = 'none';
                alertDanger.style.display = 'flex';
                let tab = '&nbsp&nbsp&nbsp&nbsp';
                let innerHTML = `
                <div class="input-error">
                    <p>
                        <samp>
                        [<br>
                            ${tab}{<br>
                                ${tab + tab}"act_grp": "...",<br>
                                ${tab + tab}"grp": "...",<br>
                                ${tab + tab}"sub_grp": "...",<br>
                                ${tab + tab}"year": "...",<br>
                                ${tab + tab}"rel_value": "...",<br>
                                ${tab + tab}"risk_ind": "..."<br>
                            ${tab}},<br>
                            ${tab}...<br>
                        ]
                        </samp>
                    </p>
                </div>
                `;
                c.genInputs.innerHTML += innerHTML;
                let submit = document.querySelector('.create-charts');
                submit.disabled = true;
            }
        });
    },

    checkDataValidity(data) {
        if (
            data.every(e => e.hasOwnProperty('act_grp')) &&
            data.every(e => e.hasOwnProperty('grp')) &&
            data.every(e => e.hasOwnProperty('sub_grp')) &&
            data.every(e => e.hasOwnProperty('year')) &&
            data.every(e => e.hasOwnProperty('rel_value')) &&
            data.every(e => e.hasOwnProperty('risk_ind'))
        ) {
            return true;
        } else {
            return false;
        }
    },

    closeForm() {
        let adminForm = document.querySelector('.admin-form-container');
        adminForm.style.display = 'none';
        return false;
    },

    openForm() {
        this.genInputs.innerHTML = '';
        let adminForm = document.querySelector('.admin-form-container');
        adminForm.style.display = 'flex';
        return false;
    },

    displayBouncyBalls() {
        let input = document.querySelector('cds-file');
        if (input) {
            input.shadowRoot.firstElementChild
                .getElementsByTagName('div')[1]
                .firstElementChild.firstElementChild.querySelector(
                    'cds-control-action'
                ).style.display = 'inline-block';
        }
    },

    hideBouncyBalls() {
        let input = document.querySelector('cds-file');
        if (input) {
            input.shadowRoot.firstElementChild
                .getElementsByTagName('div')[1]
                .firstElementChild.firstElementChild.querySelector(
                    'cds-control-action'
                ).style.display = 'none';
        }
    },
};
