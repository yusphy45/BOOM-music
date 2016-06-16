import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var App = Vue.extend({
  components: {
    app: require('./app.vue')
  }
});

var router = new VueRouter();

router.map({
  '/main': {
    component: require('./main/index.vue'),
    subRoutes: {
      '/': {
        component: require('./main/index/recommend.vue')
      },
      '/djradio': {
        component: require('./main/index/djradio.vue')
      },
      '/toplist': {
        component: require('./main/index/toplist.vue')
      },
      '/playlist': {
        component: require('./main/index/playlist.vue')
      }
    }
  },
  '/my-music:': {
    component: require('./main/my-music.vue')
  },
  '/sns:': {
    component: require('./main/sns.vue')
  },
  '/account:': {
    component: require('./main/account.vue')
  }
});

export default function () {
  router.start(App, '#container');
}
