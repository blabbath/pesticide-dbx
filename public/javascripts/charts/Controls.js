export default class Controls {
    constructor() {}

    createLegend(subGrps, obj) {
        this.createSubChecks(subGrps, obj.hiddenSubs, obj.grp);
        this.legendRects();
        this.highlightMultiple();
    }

    sortSubGrps(grp, data) {
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
            let arrBottom = arr.splice(10);
            arrBottom.sort((a, b) => a.sub_grp.localeCompare(b.sub_grp));
            const arrSort = [...arr, ...arrBottom];
            return arrSort;
        } else {
            return arr;
        }
    }

    hoverOpacity() {
        const domCheck = document.querySelectorAll('.checkbox-label');
        const domStacks = document.querySelectorAll('rect[class^=stack-]');
        for (let i = 0; i < domCheck.length; i++) {
            domCheck[i].onmouseenter = function (currentEvent) {
                const forCheckBoxId = currentEvent.target.getAttribute('for');
                const selectInput = domCheck[i].classList[1];
                domStacks.forEach(e => {
                    const compareStack = e.classList.value.substring(6);
                    const checkChecked = document.getElementById(forCheckBoxId).checked;
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

    highlightMultiple() {
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

    removeHighlight() {
        const domStacks = document.querySelectorAll('rect[class^=stack-]');
        domStacks.forEach(stack => stack.classList.remove('click-rect'));
        const domRect = document.querySelectorAll('svg.svg-label');
        domRect.forEach(rect => rect.classList.remove('legend-highlight'));
    }

    legendRects() {
        const plots = document.querySelectorAll;

        const docBars = Array.prototype.slice.call(document.querySelectorAll('.bars'));
        let arrBars = docBars.splice(docBars.length - docBars.length / plots.length);

        arrBars.forEach(e => {
            const color = e.getAttribute('style').replace('fill: ', '').replace(';', '');
            document.getElementsByClassName(
                `svg-label ${e.firstElementChild.getAttribute('class')}`.replace('stack-', '')
            )[0].style.fill = color;
        });
    }

    createSubChecks(subGrps, checkedSubs, grp) {
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

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
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

            let span = undefined
            if (sub.length > 16) {
                label.appendChild(document.createTextNode(sub.slice(0, 14).trim() + '...'));
                span = document.createElement('span');
                span.className = `hidden-span ${subRegExp}`;
                span.innerHTML = sub.replace(/(.{14})/g, "$1-<br>");
            } else {
                label.appendChild(document.createTextNode(sub));
            }

            if (span) {
                label.appendChild(span);
            }

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
}

export { Controls };
