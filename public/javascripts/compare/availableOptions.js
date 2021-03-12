import options from './options';

const availableOptions = function (array, from, to) {
    let group = from.options[from.selectedIndex].getAttribute('group');
    let value = from.value;
    let indicator = array.filter(item => item.group === group && item.value !== value);
    to.innerHTML = '';
    to.innerHTML = `${indicator
        .map(item => `<option value="${item.value}" group="${item.group}">${item.name}</option>`)
        .join('')}`;
};

let indicatorA = document.querySelector('.indicator-a');
let indicatorB = document.querySelector('.indicator-b');

window.addEventListener('load', availableOptions(options, indicatorA, indicatorB));
indicatorA.addEventListener('change', () => availableOptions(options, indicatorA, indicatorB));
