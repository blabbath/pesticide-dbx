export default function (array, from, to) {
    let group = from.options[from.selectedIndex].getAttribute('group');
    let value = from.value;
    let indicator = array.filter(item => item.group === group && item.value !== value);
    to.innerHTML = '';
    to.innerHTML = `${indicator
        .map(item => `<option value="${item.value}" group="${item.group}">${item.name}</option>`)
        .join('')}`;
}
