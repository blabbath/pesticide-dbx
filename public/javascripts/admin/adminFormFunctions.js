export default {
    displayRiskIndicators(riskIndicators) {
        let genInputs = document.getElementById('generated-inputs');
        genInputs.innerHTML = '';
        riskIndicators.forEach((riskInd, i) => {
            if (riskInd) {
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
                let tab = '&nbsp&nbsp&nbsp&nbsp';
                let innerHTML = `
                <div class="input-error">
                    <p>
                        FEHLER:<br>
                        Bitte Stellen sie eine JSON Datei mit<br>folgendem Format zur Verfügung:<br>
                        <br>
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
};
