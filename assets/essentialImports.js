import '@cds/core/icon/register.js';
import { ClarityIcons, barsIcon } from '@cds/core/icon';

ClarityIcons.addIcons(barsIcon);

import '../public/scss/common.scss';
import Icon from '../public/images/logo_jki.png';
import { closeAlert } from '../public/javascripts/index/alert';

closeAlert.timeOut();
closeAlert.click();

String.prototype.subRegExp = function () {
    const regString = this.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    return regString;
};

window.onload = function () {
    const icon = new Image();
    icon.src = Icon;
    icon.height = 50;
    icon.width = 70;
    icon.alt = 'JKI GIS-Viewer';
    document.getElementById('brand-icon').appendChild(icon);
};