import * as essentialAssets from '../../assets/essentialImports'
import * as hmr from '../../assets/webpackHMR';
//import '../scss/charts.scss';
import '../../views/state.ejs';
import '../scss/index.scss';
import '../scss/state.scss';
import '@clr/icons/shapes/chart-shapes';
import { alertTimeOut, alertClickClose } from './index/alert';
import {scrollNavigation} from './index/scrollNavigation'

alertTimeOut();
alertClickClose();
scrollNavigation();

[essentialAssets]
