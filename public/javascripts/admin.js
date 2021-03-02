import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../scss/admin.scss';
import '../../views/admin.ejs';
import '../scss/charts.scss';
import form from './admin/formHandler';
import createControls from './admin/createControls';
import Controls from './charts/Controls';
import initCharts from './admin/initCharts';
import Select from './charts/Select';
import update from './admin/chartUpdateFunctions';
import './register';

import filter from './admin/filter';

let jsonInput = document.getElementById('json-file');
let controls = new Controls();

jsonInput.addEventListener('change', () => {
    let json = jsonInput.files[0];
    let reader = new FileReader();

    reader.onload = function fileReadCompleted() {
        form.displayBouncyBalls();
        // when the reader is done, the content is in reader.result.
        let data = JSON.parse(reader.result);
        data.forEach(obj => {
            obj.year = +obj.year;
            obj.rel_value = +obj.rel_value;
        });

        form.displayRiskIndicators(data);
        form.hideBouncyBalls();

        let submit = document.querySelector('.create-charts');
        if (!document.querySelector('.input-error')) submit.disabled = false;
        submit.addEventListener('click', () => {
            form.closeForm(); //Close modal for JSON selection
            createControls.selectBox(data);
            let select = new Select();
            select.getChosenInputs();

            //create chart divs
            let riskInd = [...new Set(data.map(item => item.risk_ind))];
            let initObject = initCharts.initChartObject(riskInd);
            initCharts.createChartContainer(initObject);
            initObject = initCharts.createChartObjects(initObject);
            //filter and sort data
            update.chartOnChange(data, initObject);
            console.log(select.clrSelect);

            for (const e of select.clrSelect) {
                e.addEventListener('change', () => {
                    select.getChosenInputs();
                    update.chartOnChange(data, initObject);
                    controls.hoverOpacity();
                });
                controls.hoverOpacity();
            }

            /*             let subsAll = document.querySelectorAll('input[name="state[sub_grp]"]');
            subsAll.forEach(sub => {
                sub.addEventListener('change', () => {
                    let filteredData = filter.filterForSubchecks(data);
                    let arrSort = controls.sortSubGrps(undefined, filteredData);
                    let subsFill = [...new Set(arrSort.map(item => item.sub_grp.subRegExp()))];

                    //send data to charts and init back
                    initObject.charts.forEach(chart => {
                        chart.barBackChart.updateChartBack(subsFill, filteredData);
                        chart.barBackChart.wrangleData();
                    });

                    //filter by subchecks
                    let checkedBoxes = document.querySelectorAll(
                        'input[name="state[sub_grp]"]:checked'
                    );
                    let subs = [];
                    checkedBoxes.forEach(e => subs.push(e.value));
                    let filteredDataFront = data.filter(obj =>
                        subs
                            ? subs.includes(obj.sub_grp)
                            : ['NoSubgroupsSelected'].includes(obj.sub_grp)
                    );
                    initObject.charts.forEach(chart =>
                        chart.barBackChart.updateChartFront(filteredDataFront)
                    );
                });
            }); */
        });
    };
    reader.readAsText(json);
});

let reload = document.querySelector('.refresh-charts');
reload.addEventListener('click', () => {
    form.openForm();
});
