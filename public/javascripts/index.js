import * as essentialAssets from '../../assets/essentialImports'
import * as hmr from '../../assets/webpackHMR';
import * as cds from './index/register'

[essentialAssets]

import '../scss/common.scss';
import '../scss/index.scss';
import '../../views/index.ejs';
import '../../views/login.ejs';
import '../../views/register.ejs';
import '../../views/downloads.ejs';

import {scrollNavigation} from './index/scrollNavigation'

let alert = document.querySelector('cds-alert-group')
alert.closeChange(() => {console.log('change')})
scrollNavigation() 