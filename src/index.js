import Vue from 'vue';
import init from './router.js';
import serviceWorker from './service-worker';
import 'normalize.css';
import './basic/style.css';

require('./lib/flexible.js');
require('./components/index.js');

init();
serviceWorker();




