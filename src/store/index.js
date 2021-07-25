import Vue from 'vue';
import Vuex from 'vuex';
import image from './modules/image';
import user from './modules/user';
import create from './modules/user/create';
import validation from './modules/user/validation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    image,
    user,
    create,
    validation,
  },
});
