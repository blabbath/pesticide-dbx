import * as wpAssets from '../../assets/chartImports'
import * as hmr from '../../assets/webpackHMR';

[wpAssets]

import '../scss/index.scss';
import '../../views/index.ejs';
import '../../views/login.ejs';
import '../../views/register.ejs';
import '../../views/downloads.ejs';

import { alertTimeOut, alertClickClose } from './index/alert';
import {scrollNavigation} from './index/scrollNavigation'

alertTimeOut();
alertClickClose();
scrollNavigation();