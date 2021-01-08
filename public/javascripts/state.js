import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';
import '../../views/state.ejs';
import '../scss/index.scss';
import '../scss/state.scss';
import '@clr/icons/shapes/chart-shapes';
import { alertTimeOut, alertClickClose } from './index/alert';

alertTimeOut();
alertClickClose();

let tableCell = document.querySelectorAll('.state-td');

for (const e of tableCell) {
    let children = Array.prototype.slice.call(e.children);
    let childrenHide = children.filter(child => child.classList.contains('sub-table-hide'));
    if (
        childrenHide.some(child => child.classList.contains('sub-table-hide')) &&
        childrenHide.filter(child => child.classList.contains('sub-table-hide')).length > 5
    ) {
        e.addEventListener('mouseenter', () => {
            children.filter(child => child.classList.contains('sub-table')).forEach(c => c.style.display = 'none')
            childrenHide.forEach(child => child.classList.remove('sub-table-hide'));
            childrenHide.forEach(child => child.classList.add('sub-table-show'));
            return false;
        });
        e.addEventListener('mouseleave', () => {
            children.filter(child => child.classList.contains('sub-table')).forEach(c => c.style.display = 'block')
            childrenHide.forEach(child => child.classList.remove('sub-table-show'));
            childrenHide.forEach(child => child.classList.add('sub-table-hide'));
            return false;
        });
    }
}

[essentialAssets];
