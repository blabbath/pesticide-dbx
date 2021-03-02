import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../../views/state.ejs';
import '../scss/index.scss';
import '../scss/state.scss';
import '@cds/core/icon/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, barChartIcon, trashIcon } from '@cds/core/icon';
ClarityIcons.addIcons(barChartIcon);
ClarityIcons.addIcons(trashIcon);

let tableCell = document.querySelectorAll('.div-sub-grps');

for (const e of tableCell) {
    let children = Array.prototype.slice.call(e.children); // turn HTMLCollection into Array
    let childrenShow = children.filter(child => child.classList.contains('sub-table-show'));
    if (
        childrenShow.some(child => child.classList.contains('sub-table-show')) &&
        childrenShow.filter(child => child.classList.contains('sub-table-show')).length > 5
    ) {
        e.addEventListener('mouseenter', () => {
            children
                .filter(child => child.classList.contains('sub-table'))
                .forEach(c => (c.style.display = 'none')); //hide the 5 present sub_grps
            childrenShow.forEach(c => (c.style.display = 'block')); //show all sub_grps
            return false;
        });
        e.addEventListener('mouseleave', () => {
            children
                .filter(child => child.classList.contains('sub-table'))
                .forEach(c => (c.style.display = 'block')); //show 5 sub_grps
            childrenShow.forEach(c => (c.style.display = 'none')); //hide all sub_grps
            return false;
        });
    }
}
