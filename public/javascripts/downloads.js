import * as essentialAssets from '../../assets/essentialImports'
import * as hmr from '../../assets/webpackHMR';

[essentialAssets]

import '../scss/downloads.scss';
import '../scss/downloads.scss';
import '../../views/downloads.ejs';

import { alertTimeOut, alertClickClose } from './index/alert';
import {scrollNavigation} from './index/scrollNavigation'

alertTimeOut();
alertClickClose();
scrollNavigation();