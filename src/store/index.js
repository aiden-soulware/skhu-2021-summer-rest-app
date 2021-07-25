import Vue from 'vue';
import Vuex from 'vuex';
import image from './modules/image';
import form from './modules/user/form';
import user from './modules/user/crud/read';
import create from './modules/user/crud/create';
import update from './modules/user/crud/update';

import validation from './modules/user/validation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    image,
    user,
    form,
    create,
    update,
    validation,
  },
});
