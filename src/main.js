// Polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/scss/main.scss';
import alert from './plugins/alert';

Vue.config.productionTip = false;

export const EventBus = new Vue();
Vue.use(alert);
new Vue({
  router,
  store,
  vuetify,

  render: (h) => h(app),
}).$mount('#app');
