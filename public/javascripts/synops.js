import 'webpack-hot-middleware/client?reload=true';
import '../scss/index.scss';
import '../../views/synops.ejs';

import '@clr/ui/clr-ui.min.css';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/clr-icons.min.css';
import axios from 'axios';

const elemClrCheck = document.querySelectorAll('.clr-select');
let elemCheckSelect = document.querySelector('#select-all-checks');
let urlParams = new URLSearchParams(window.location.search);
const base = urlParams.get('base');

console.log(document.querySelectorAll('.hidden-sub'));

//Initial page load
document.addEventListener('DOMContentLoaded', () => {
    const grp = document.querySelector('#select-grp').value;
    const act = document.querySelector('#select-act').value;
    const elemSubs = document.querySelectorAll('.hidden-sub');
    let subs;
    if (elemSubs.length < 1) {
        subs = undefined;
    } else {
        subs = Array.prototype.slice.call(elemSubs).map(e => e.id);
    }
    addData(grp, act, subs);
});

//Change of select elements
for (const e of elemClrCheck) {
    e.addEventListener('change', () => {
        const grp = document.querySelector('#select-grp').value;
        const act = document.querySelector('#select-act').value;
        //The subGrp gets defined through the sub checkboxes, thus no subGrp param needed
        addData(grp, act, undefined);
    });
}

//Change of check boxes
elemCheckSelect.addEventListener('change', () => {
    const grp = document.querySelector('#select-grp').value;
    const act = document.querySelector('#select-act').value;
    const elemSubCheck = document.getElementsByName('state[sub_grp]');
    if (elemCheckSelect.checked) {
        elemSubCheck.forEach(e => {
            e.checked = true;
        });
        dataCheckedBoxes(grp, act);
    } else {
        elemSubCheck.forEach(e => {
            e.checked = false;
        });
        axios
            .get(
                `${url}/data/${base}?grp=${grp}&act_grp=${act}&sub_grp=${undefined}`
            )
            .then(({ data }) => {
                updateTable(data); // table.js
                prepareDataGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
                updateCharts(); // chartMain.js  CALLING DRAWING METHODS IN charts.js
            });
    }
});

function addData(grp, act, subs) {
    axios
        .get(`${url}/data/subgroups_${base}?grp=${grp}&act_grp=${act}`)
        .then(({ data }) => {
            let arrSort = sortSubGrps(grp, data);
            subsFill = [
                ...new Set(arrSort.map(item => item.sub_grp.subRegExp())),
            ];
            prepareDataBackGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
            updateCharts(); // chartMain.js  CALLING DRAWING METHODS
            const subGrps = [...new Set(arrSort.map(item => item.sub_grp))];
            createSubChecks(subGrps, subs, grp);
            legendRects(base);
            highlightMultiple();
            //Un-check select-all box on sub-grp reload
            elemCheckSelect.checked = false;
        })
        .then(() => {
            const elemSubCheck = document.getElementsByName('state[sub_grp]');
            //Runs on page load and grp/act change
            dataCheckedBoxes(grp, act);
            //REQUEST DATA FOR ALL SELECTED SUBGROUPS
            elemSubCheck.forEach(sub => {
                sub.addEventListener('change', () => {
                    dataCheckedBoxes(grp, act);
                });
            });
            hoverOpacity();
        });
}

String.prototype.subRegExp = function () {
    const regString = this.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    return regString;
};

function dataCheckedBoxes(grp, actGrp) {
    const checkedBoxes = document.querySelectorAll(
        'input[name="state[sub_grp]"]:checked'
    );
    const subGrps = [];
    checkedBoxes.forEach(e => subGrps.push(e.id.replace(/,/g, 'XY')));
    axios
        .get(
            `${url}/data/${base}?grp=${grp}&act_grp=${actGrp}&sub_grp=${subGrps}`
        )
        .then(({ data }) => {
            updateTable(data); // table.js
            prepareDataGraph(data); // chartMain.js PREPROCESSING CHARTS DATA
            updateCharts(); // chartMain.js  CALLING DRAWING METHODS IN charts.js
        });
}

function sortSubGrps(grp, data) {
    const arr = [];

    data.reduce(function (res, value) {
        if (!res[value.sub_grp]) {
            res[value.sub_grp] = { sub_grp: value.sub_grp, sum: 0 };
            arr.push(res[value.sub_grp]);
        }
        res[value.sub_grp].sum += value.rel_value;
        return res;
    }, {});
    arr.sort((a, b) => b.sum - a.sum);

    if (grp !== 'Kulturgruppen') {
        arrBottom = arr.splice(10);
        arrBottom.sort((a, b) => a.sub_grp.localeCompare(b.sub_grp));
        const arrSort = [...arr, ...arrBottom];
        return arrSort;
    } else {
        return arr;
    }
}

function legendRects(base) {
    const docBars = Array.prototype.slice.call(
        document.querySelectorAll('.bars')
    );
    if (base.includes('synops')) {
        arrBars = docBars.splice(docBars.length - docBars.length / 4);
    } else if (base === 'sales' || base === 'hri') {
        arrBars = docBars;
    } else if (base === 'pli' || base === 'pri' || base === 'tli') {
        arrBars = docBars.splice(docBars.length - docBars.length / 3);
    }
    arrBars.forEach(e => {
        const color = e
            .getAttribute('style')
            .replace('fill: ', '')
            .replace(';', '');
        document.getElementsByClassName(
            `svg-label ${e.firstElementChild.getAttribute('class')}`.replace(
                'stack-',
                ''
            )
        )[0].style.fill = color;
    });
}

function hoverOpacity() {
    const domCheck = document.querySelectorAll('.checkbox-label');
    const domStacks = document.querySelectorAll('rect[class^=stack-]');
    for (let i = 0; i < domCheck.length; i++) {
        domCheck[i].onmouseenter = function (currentEvent) {
            const forCheckBoxId = currentEvent.target.getAttribute('for');
            const selectInput = domCheck[i].classList[1];
            domStacks.forEach(e => {
                const compareStack = e.classList.value.substring(6);
                const checkChecked = document.getElementById(forCheckBoxId)
                    .checked;
                if (selectInput !== compareStack && checkChecked === true) {
                    e.classList.add('mouseover-rect');
                }
            });
        };
        domCheck[i].onmouseleave = () => {
            domStacks.forEach(e => e.classList.remove('mouseover-rect'));
        };
    }
}

function highlightMultiple() {
    const domRect = document.querySelectorAll('svg.svg-label');
    const domStacks = document.querySelectorAll('rect[class^=stack-]');
    let selectInput = [];
    domRect.forEach(rect => {
        rect.addEventListener('click', () => {
            rect.classList.toggle('legend-highlight');
            const domClickRect = document.querySelectorAll('.click-rect');
            domClickRect.forEach(c => c.classList.remove('click-rect'));
            const element = rect.classList[1];
            if (selectInput.includes(element)) {
                selectInput = selectInput.filter(e => e !== element);
            } else {
                selectInput.push(element);
            }
            domStacks.forEach(stack => {
                const compareStack = stack.classList.value.substring(6);
                if (selectInput.includes(compareStack)) {
                    stack.classList.add('click-rect');
                }
            });
        });
    });
}

function createSubChecks(subGrps, checkedSubs, grp) {
    const elemSubGrp = document.querySelector('#check-sub-grp');
    elemSubGrp.innerHTML = '';
    const fragment = document.createDocumentFragment();
    subGrps.forEach((sub, index) => {
        if (index === 0) {
            const title10 = document.createElement('h5');
            title10.className = 'legend-header';
            let t10;
            if (grp !== 'Kulturgruppen') {
                t10 = document.createTextNode('10 höchsten Werte');
            } else {
                t10 = document.createTextNode('Absteigend nach Wert');
            }
            title10.appendChild(t10);
            fragment.appendChild(title10);
        }
        const subRegExp = sub.subRegExp();
        const li = document.createElement('li');
        li.className = 'sidenav-li';
        const div = document.createElement('div');
        div.className = 'li-div';

        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        svg.setAttribute('class', `svg-label ${subRegExp}`);
        svg.innerHTML = '<rect height="16" width="32"/>';
        div.appendChild(svg);

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = `state[sub_grp]`;
        input.value = sub;
        input.id = sub;
        input.className = `${subRegExp}`;
        const label = document.createElement('label');
        label.htmlFor = sub;
        label.className = `checkbox-label ${subRegExp}`;
        if (!checkedSubs && index < 10) {
            input.checked = true;
        } else if (checkedSubs) {
            if (checkedSubs.some(subs => subs.includes(sub))) {
                input.checked = true;
            }
        }
        label.appendChild(document.createTextNode(sub));

        if (index === 10 && grp !== 'Kulturgruppen') {
            li.appendChild(document.createElement('hr'));
            const titleRest = document.createElement('h5');
            titleRest.className = 'legend-header';
            const tRest = document.createTextNode('Alphabetische Sortierung');
            titleRest.appendChild(tRest);
            li.appendChild(titleRest);
        }

        div.appendChild(input);
        div.appendChild(label);
        li.appendChild(div);
        fragment.appendChild(li);
    });
    elemSubGrp.appendChild(fragment);
}
