import Vue from 'vue';
import Vuex from 'vuex';
import image from './modules/image';
import form from './modules/user/form';

import create from './modules/user/crud/create';
import load from './modules/user/crud/read';
import update from './modules/user/crud/update';
import remove from './modules/user/crud/delete';

import validation from './modules/user/validation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    image,
    load,
    form,
    create,
    update,
    remove,
    validation,
  },
});
