import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../scss/admin.scss';
import '../../views/admin.ejs';
import '../scss/charts.scss';
import form from './admin/formHandler';
import createControls from './admin/createControls';
import Controls from './charts/Controls';
import createCharts from './admin/createChartDivs'
import Select from './charts/Select';
import update from './admin/chartUpdateFunctions';
import transform from './admin/transformInput'
import './admin/setInputType';
import './admin/reloadData'
import './register';

let fileInput = document.getElementById('file');
let controls = new Controls();

fileInput.addEventListener('change', () => {
    let json = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function fileReadCompleted() {
        form.displayBouncyBalls();
        // when the reader is done, the content is in reader.result.
        let data = transform.transform(reader)

        form.displayRiskIndicators(data);
        form.hideBouncyBalls();

        let submit = document.querySelector('.create-charts');
        if (!document.querySelector('.input-error')) submit.disabled = false;

        submit.addEventListener('click', () => {
            form.closeForm(); //Close modal
            createControls.selectBox(data);
            let select = new Select();
            select.getChosenInputs();

            let initObject = createCharts.divs(data)
            update.chartOnChange(data, initObject);

            for (const e of select.clrSelect) {
                e.addEventListener('change', () => {
                    select.getChosenInputs();
                    update.chartOnChange(data, initObject);
                    controls.hoverOpacity();
                });
                controls.hoverOpacity();
            }
        });
    };
    reader.readAsText(json);
});