import 'webpack-hot-middleware/client?reload=true';
import '../../scss/style.scss';
import '../../views/index.ejs';

let sub = document.querySelector('.sub-header')
sub.innerHTML = 'This sub-header is added using JavaScript ES6'