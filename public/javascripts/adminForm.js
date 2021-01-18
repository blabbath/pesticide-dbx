import axios from 'axios';
import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/admin.scss';
import '../../views/admin.ejs';
import configFE from '../../config/live';

[essentialAssets];

let jsonInput = document.getElementById('json-file');
jsonInput.addEventListener('change', () => {
    let json = jsonInput.files[0];
    let reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        let data = JSON.parse(reader.result);
        const risk_indicators = [...new Set(data.map(item => item.risk_ind))];

        let genInputs = document.getElementById('generated-inputs');
        genInputs.innerHTML = '';
        risk_indicators.forEach((riskInd, i) => {
            let risk = riskInd
                .toLowerCase()
                .replace(/[^a-zA-Z ]/g, '')
                .replace(' ', '-');
            let innerHTML = `
            <div class="clr-form-control">
                <label for="${risk}" class="clr-control-label">Risiko Indikator (${i + 1})</label>
                <div class="clr-control-container">
                    <div class="clr-input-wrapper">
                        <input
                            type="text"
                            id="${risk}"
                            placeholder="${riskInd}"
                            class="clr-input"
                            value="${riskInd}"
                        />
                    </div>
                </div>
            </div>
            `;
            genInputs.innerHTML += innerHTML;
        });

        let submit = document.querySelector('.create-charts');
        submit.disabled = false;
        submit.addEventListener('click', () => {
            console.log('POST');
            axios
                .post(`${configFE.url}/admin/receive_data`, data)
                .then(() => {
                    window.location.href = `${configFE.url}/admin/chart`;
                })
                .catch(error => {
                    console.log(error);
                });
        });
    };

    reader.readAsText(json);
});
