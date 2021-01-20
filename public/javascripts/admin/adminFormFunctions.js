export default {
    displayRiskIndicators (riskIndicators) {
        let genInputs = document.getElementById('generated-inputs');
        genInputs.innerHTML = '';
        riskIndicators.forEach((riskInd, i) => {
            let risk = riskInd
                .toLowerCase()
                .replace(/[^a-zA-Z ]/g, '')
                .replace(' ', '-');
            let innerHTML = `
            <div class="input-risk">
                <label for="${risk}" class="clr-control-label">Risiko Indikator (${i + 1})</label>
                <div class="clr-control-container">
                    <div class="clr-input-wrapper">
                        ${riskInd}
                    </div>
                </div>
            </div>
            `;
            genInputs.innerHTML += innerHTML;
        });
    }
}