import 'webpack-hot-middleware/client?reload=true';
import '../scss/index.scss';
import '../../views/index.ejs';
import '../../views/login.ejs';
import '../../views/register.ejs';
import '../../views/downloads.ejs';

import '@clr/ui/clr-ui.min.css';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/clr-icons.min.css';

import { alertTimeOut, alertClickClose } from './index/alert';
import {scrollNavigation} from './index/scrollNavigation'

alertTimeOut();
alertClickClose();
scrollNavigation();