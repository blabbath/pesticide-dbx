import '@clr/ui/clr-ui.min.css';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/clr-icons.min.css';
import Icon from '../public/images/logo_jki.png';

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
