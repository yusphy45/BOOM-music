import Vue from 'vue';
import VueResource from 'vue-resource';
import init from './router.js';
import serviceWorker from './service-worker';
import Promise from 'es6-promise';
import 'normalize.css';
import './basic/style.css';

Promise.polyfill();

require('./lib/flexible.js');
require('./components/index.js');
require('./basic/util.js');

Vue.use(VueResource);
init();

serviceWorker();




