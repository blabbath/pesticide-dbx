export default {
    displayRiskIndicators(data) {
        let genInputs = document.getElementById('generated-inputs');
        let riskIndicators = [...new Set(data.map(item => item.risk_ind))];
        let alertDanger = document.querySelector('.alert-danger');
        let alertSuccess = document.querySelector('.alert-success');
        genInputs.innerHTML = '';
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
                    <label for="${risk}" class="clr-control-label">Risiko Indikator (${
                    i + 1
                })</label>
                    <div class="clr-control-container">
                        <div class="clr-input-wrapper">
                            ${riskInd}
                        </div>
                    </div>
                </div>
                `;
                genInputs.innerHTML += innerHTML;
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
                                ${tab + tab}"base": "...",<br>
                            ${tab}},<br>
                            ${tab}...<br>
                        ]
                        </samp>
                    </p>
                </div>
                `;
                genInputs.innerHTML += innerHTML;
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
        let adminForm = document.querySelector('.admin-form-container');
        adminForm.style.display = 'flex';
        return false;
    },
};
