import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import create from './modules/user/create';
import update from './modules/user/update';
import validation from './modules/user/validation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    create,
    update,
    validation,
  },
});
