import 'webpack-hot-middleware/client?reload=true';
import '../scss/charts.scss';
import '../../views/synops.ejs';

import '@clr/ui/clr-ui.min.css';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/clr-icons.min.css';
import axios from 'axios';
import * as d3 from 'd3';
import * as d3c from 'd3-collection';

import configFE from '../../config/live';
import Controls from './controls/Controls';
import Select from './controls/Select';
import BarBackChart from './charts/chart';
import DataPrepD3 from './charts/DataPrepD3'

let controls = new Controls();
let select = new Select();
let subsFill;

let elemCheckSelect = document.querySelector('#select-all-checks');
const elemClrCheck = document.querySelectorAll('.clr-select');

String.prototype.subRegExp = function () {
    const regString = this.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    return regString;
};

//Initial page load
document.addEventListener('DOMContentLoaded', () => {
    let obj = select.selectInput();
    let subs;
    if (obj.elemSubs.length < 1) {
        subs = undefined;
    } else {
        subs = Array.prototype.slice.call(obj.elemSubs).map(e => e.id);
    }
    addData(obj.basis, obj.grp, obj.act, subs);
});

//Change of select elements basis, grp, act_grp
for (const e of elemClrCheck) {
    e.addEventListener('change', () => {
        let obj = select.selectInput();
        //The subGrp gets defined through the sub checkboxes, thus no subGrp param needed
        addData(obj.basis, obj.grp, obj.act, undefined);
    });
}

//Change of check boxes
elemCheckSelect.addEventListener('change', () => {
    let obj = select.selectInput();

    const elemSubCheck = document.getElementsByName('state[sub_grp]');
    if (elemCheckSelect.checked) {
        elemSubCheck.forEach(e => {
            e.checked = true;
        });
        dataCheckedBoxes(obj.basis, obj.grp, obj.act);
    } else {
        elemSubCheck.forEach(e => {
            e.checked = false;
        });
        axios
            .get(
                `${configFE.url}/services/visData_${obj.basis}?grp=${obj.grp}&act_grp=${obj.act}&sub_grp=${undefined}`
            )
            .then(({ data }) => {
                //updateTable(data); // table.js
                prepareDataGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
                updateCharts(); // chartMain.js  CALLING DRAWING METHODS IN charts.js
            });
    }
});

function addData(basis, grp, act, subs) {
    axios
        .get(
            `${configFE.url}/services/subgrps_${basis}?grp=${grp}&act_grp=${act}`
        )
        .then(({ data }) => {
            let arrSort = controls.sortSubGrps(grp, data);
            subsFill = [
                ...new Set(arrSort.map(item => item.sub_grp.subRegExp())),
            ];

            prepareDataBackGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
            updateCharts(); // chartMain.js  CALLING DRAWING METHODS

            const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
            controls.createSubChecks(subGrps, subs, grp);
            controls.legendRects();
            controls.highlightMultiple();
            //Un-check select-all box on sub-grp reload
            elemCheckSelect.checked = false;
        })
        .then(() => {
            const elemSubCheck = document.getElementsByName('state[sub_grp]');
            //Runs on page load and grp/act change
            dataCheckedBoxes(basis, grp, act);
            //REQUEST DATA FOR ALL SELECTED SUBGROUPS
            elemSubCheck.forEach(sub => {
                sub.addEventListener('change', () => {
                    dataCheckedBoxes(basis, grp, act);
                });
            });
            controls.hoverOpacity();
        });
}

function dataCheckedBoxes(basis, grp, actGrp) {
    const checkedBoxes = document.querySelectorAll(
        'input[name="state[sub_grp]"]:checked'
    );
    const subGrps = [];
    checkedBoxes.forEach(e => subGrps.push(e.id.replace(/,/g, 'XY')));
    axios
        .get(
            `${configFE.url}/services/visData_${basis}?grp=${grp}&act_grp=${actGrp}&sub_grp=${subGrps}`
        )
        .then(({ data }) => {
            //updateTable(data); // table.js
            prepareDataGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
            updateCharts(); // chartMain.js  CALLING DRAWING METHODS IN charts.js
        });
}

let nestedBackData = {};
let frontData = {};
let barBackChart1 = false,
    barBackChart2 = false,
    barBackChart3 = false,
    barBackChart4 = false;

function prepareDataGraph(data) {
    frontData = data;
    for (let i = 0; i < frontData.length; i++) {
        frontData[i].sub_grp = frontData[i].sub_grp.subRegExp();
    }
}

function prepareDataBackGraph(data) {
    let reducedData = [
        ...data
            .reduce((r, obj) => {
                const key = obj.year + '-' + obj.risk_ind;
                const item =
                    r.get(key) ||
                    Object.assign({}, obj, {
                        rel_value: 0,
                    });
                item.rel_value += obj.rel_value;
                return r.set(key, item);
            }, new Map())
            .values(),
    ];
    let yMax;
    yMax = d3.max(reducedData, d => d.rel_value + 0.1);

    if(barBackChart1) {
        barBackChart1.setYMax(yMax)
        barBackChart2.setYMax(yMax)
        barBackChart3.setYMax(yMax)
        barBackChart4.setYMax(yMax)
    }
    //Produce d3 friendly array
    nestedBackData = d3c
        .nest()
        .key(d => d.risk_ind)
        .sortValues((a, b) => a.year - b.year)
        .entries(reducedData);

    //Init objects for each risk indicator
    if (!barBackChart1)
        barBackChart1 = new BarBackChart(
            '#chart-bar-back1',
            'Akut aquatisches Risiko',
            yMax
        );
    if (!barBackChart2)
        barBackChart2 = new BarBackChart(
            '#chart-bar-back2',
            'Chronisch aquatisches Risiko',
            yMax
        );
    if (!barBackChart3)
        barBackChart3 = new BarBackChart(
            '#chart-bar-back3',
            'Akutes Risiko für NTA',
            yMax
        );
    if (!barBackChart4)
        barBackChart4 = new BarBackChart(
            '#chart-bar-back4',
            'Chronisches Risiko für Bodenorganismen',
            yMax
        );
}

function updateCharts() {
    barBackChart1.wrangleData(); //chart.js
    barBackChart2.wrangleData(); //chart.js
    barBackChart3.wrangleData(); //chart.js
    barBackChart4.wrangleData(); //chart.js
}

BarBackChart.prototype.wrangleData = function () {
    //BACK DATA
    let vis = this;
    for (let i = 0; i < nestedBackData.length; i++) {
        if (nestedBackData[i].key === vis.risk) {
            vis.datafiltered = nestedBackData[i].values;
        }
    }
    vis.minYear = Math.min(
        ...[...new Set(vis.datafiltered.map(item => item.year))]
    );
    vis.maxYear = Math.max(
        ...[...new Set(vis.datafiltered.map(item => item.year))]
    );

    vis.range = range(vis.minYear, vis.maxYear);
    vis.datafiltered = fillYears(vis.datafiltered, vis.range, 0);

    //FRONT DATA
    vis.dataFront = [];
    for (let i = 0; i < frontData.length; i++) {
        if (frontData[i].risk_ind === vis.risk)
            vis.dataFront.push(frontData[i]);
    }
    vis.dataFront = vis.dataFront.sort((a, b) => a.year - b.year);
    vis.dataStack = transformFront(vis.dataFront); //Prepare data for d3.stack()
    vis.dataStack = fillGapsFront(vis.dataStack, vis.range, subsFill, 0);

    vis.stack = d3
        .stack()
        .keys(subsFill)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    vis.stackData = vis.stack(vis.dataStack);
    vis.stackData.sort(compareValues('key'));
    let colorArr = color(subsFill);
    //COLORS FOR THE STACKS
    if (vis.datafiltered[0].grp === 'Kulturgruppen') {
        vis.colors = d3.scaleOrdinal(subsFill, colorArrCrop);
    } else {
        vis.colors = d3.scaleOrdinal(subsFill, colorArr);
    }
    vis.updateVis();

    /* FUNCTIONS */
    function range(start, stop) {
        let range = [];
        const length = stop - start;
        for (let i = 0; i <= length; i++) {
            range[i] = start;
            start++;
        }
        return range;
    }

    function fillYears(arr, range, fillVal) {
        const arrYear = [...new Set(arr.map(item => item.year))].sort();
        const gaps = range.filter(val => !arrYear.includes(val));
        for (const e of gaps) {
            obj = {};
            obj.year = e;
            obj.rel_value = fillVal;
            arr.push(obj);
        }
        arr.sort((a, b) => a.year - b.year);
        return arr;
    }
    function transformFront(data) {
        let trans = {};
        let transItem;
        data.forEach((i, idx) => {
            if (i.year in trans) {
                transItem = trans[i.year];
            } else {
                transItem = {};
                transItem.year = i.year;
            }
            transItem[i.sub_grp] = i.rel_value;
            trans[i.year] = transItem;
        });
        let result = [];
        for (let i in trans) result.push(trans[i]);
        return result;
    }

    function fillGapsFront(arr, range, subs, fillVal) {
        //First add year if missing;
        const arrYear = [...new Set(arr.map(item => item.year))].sort();
        const yearGaps = range.filter(val => !arrYear.includes(val));
        for (const e of yearGaps) {
            let obj = {};
            obj.year = e;
            arr.push(obj);
        }
        //Then add subgrps if missing
        arr.forEach(obj => {
            const arrKeys = Object.keys(obj).filter(e => e != 'year');
            const arrGaps = subs.filter(val => !arrKeys.includes(val));
            arrGaps.forEach(e => {
                obj[`${e}`] = fillVal;
            });
        });
        arr.sort((a, b) => a.year - b.year);
        return arr;
    }

    function compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA =
                typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
            const varB =
                typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return order === 'desc' ? comparison * -1 : comparison;
        };
    }
};

//CHARTDATA
let lineData = [
    {
        key: 'high',
        values: [
            { type: 'high', year: 1996, value: 1.0 },
            { type: 'high', year: 2016, value: 1.0 },
        ],
    },
    {
        key: 'medium',
        values: [
            { type: 'medium', year: 1996, value: 0.8 },
            { type: 'medium', year: 2016, value: 0.8 },
        ],
    },
    {
        key: 'low',
        values: [
            { type: 'low', year: 1996, value: 0.7 },
            { type: 'low', year: 2016, value: 0.7 },
        ],
    },
];

function color(arrTotal) {
    const grey = '#696c6b';
    const colorArr = [
        '#013935',
        '#025d57',
        '#028178',
        '#02a59a',
        '#02cabc',

        '#df5c06',
        '#fa6d10',
        '#fb8233',
        '#fd9856',
        '#feae79',
    ];
    let greyArr = [];
    for (let i = 0; i < arrTotal.length - colorArr.length; i++) {
        greyArr.push(grey);
    }
    const arr = [...colorArr, ...greyArr];
    return arr;
}

const colorArrCrop = [
    '#013935',
    '#025d57',
    '#028178',
    '#02a59a',
    '#02cabc',
    '#02efde',
    '#17feee',

    '#df5c06',
    '#fa6d10',
    '#fb8233',
    '#fd9856',
    '#feae79',
    '#fec49d',
    '#ffd9c1',

    '#4d8211',
    '#60a314',
    '#73c418',
    '#86e51c',
    '#97e93b',
    '#a9ed5c',
    '#baf17c',
];
