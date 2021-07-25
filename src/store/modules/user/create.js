import http from '@/utils/http';
import info from './info';

const state = {
  user: { ...info.user },
  isCreate: false,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getIsCreate(state) {
    return state.getIsCreate;
  },
};

const actions = {
  submit({ getters }) {
    const user = getters.getUser;

    // create user
    return http.process('user', 'create', user);
  },
  initialize({ commit }) {
    commit('refresh');
    commit('setIsCreate', false);
  },
  refresh({ commit }) {
    commit('refresh');
  },
};

const mutations = {
  setUser(state, data) {
    state.user = data;
  },

  setIsCreate(state, data) {
    state.isCreate = data;
  },

  // functions
  refresh(state) {
    state.user = { ...info.user };
    state.image = null;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
