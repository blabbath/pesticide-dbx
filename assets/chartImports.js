import '@clr/ui/clr-ui.min.css';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/clr-icons.min.css';

String.prototype.subRegExp = function () {
    const regString = this.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    return regString;
};