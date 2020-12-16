import * as essentialAssets from '../../assets/essentialImports'
import * as hmr from '../../assets/webpackHMR';

[essentialAssets]

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