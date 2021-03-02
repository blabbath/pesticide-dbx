import '../../assets/essentialImports';
import '../../assets/webpackHMR';
import '../scss/downloads.scss';
import '../scss/downloads.scss';
import '../../views/downloads.ejs';
import './register';

import '@cds/core/icon/register.js';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';
ClarityIcons.addIcons(downloadIcon);

import { scrollNavigation } from './index/scrollNavigation';

scrollNavigation();
