import * as essentialAssets from '../../assets/essentialImports'
import * as hmr from '../../assets/webpackHMR';

import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';

[essentialAssets]

import '../scss/common.scss';
import '../scss/index.scss';
import '../../views/index.ejs';
import '../../views/login.ejs';
import '../../views/register.ejs';
import '../../views/downloads.ejs';

import {scrollNavigation} from './index/scrollNavigation'

scrollNavigation();