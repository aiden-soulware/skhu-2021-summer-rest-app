import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import create from './modules/user/create';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    create,
  },
});
