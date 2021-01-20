import axios from 'axios';
import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../scss/admin.scss';
import '../../views/admin.ejs';
import configFE from '../../config/live';
import adminFunc from './admin/adminFormFunctions';

[essentialAssets];

let jsonInput = document.getElementById('json-file');

jsonInput.addEventListener('change', () => {
    let json = jsonInput.files[0];
    let reader = new FileReader();

    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        let data = JSON.parse(reader.result);
        let riskIndicators = [...new Set(data.map(item => item.risk_ind))];
        adminFunc.displayRiskIndicators(riskIndicators);

        let submit = document.querySelector('.create-charts');
        submit.disabled = false;
        submit.addEventListener('click', () => {
            document.querySelector('.loading').style.display = 'block';
            axios
                .post(`${configFE.url}/admin/receive_data`, data)
                .then(() => {
                    window.location.href = `${configFE.url}/admin/chart`;
                })
                .catch(error => {
                    console.log(error)
                    window.location.href = `${configFE.url}/admin`
                });
        });
    };

    reader.readAsText(json);
});
