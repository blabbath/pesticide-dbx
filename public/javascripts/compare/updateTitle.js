const clrSelect = document.querySelectorAll('.clr-select');

const updateTitle = function () {
    let titles = document.querySelectorAll('.chart-title');
    let titleA = titles[0];
    let titleB = titles[1];
    let selectA = document.querySelector('.indicator-a');
    let selectB = document.querySelector('.indicator-b');
    titleA.innerHTML = selectA.options[selectA.selectedIndex].text;
    titleB.innerHTML = selectB.options[selectB.selectedIndex].text;
};

for (const e of clrSelect) {
    e.addEventListener('change', () => {
        updateTitle();
    });
}

window.addEventListener('load', () => {
    updateTitle();
});
