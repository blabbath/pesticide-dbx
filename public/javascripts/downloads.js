import * as essentialAssets from '../../assets/essentialImports';
import * as hmr from '../../assets/webpackHMR';

[essentialAssets];

import '../scss/downloads.scss';
import '../scss/downloads.scss';
import '../../views/downloads.ejs';

import { closeAlert } from './index/alert';
import { scrollNavigation } from './index/scrollNavigation';

closeAlert.timeOut();
closeAlert.click();
scrollNavigation();
