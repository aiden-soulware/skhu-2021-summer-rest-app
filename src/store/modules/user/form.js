import info from './info';

const state = {
  user: { ...info.user },
};

const getters = {};

const actions = {};

const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  refresh(state) {
    state.user = { ...info.user };
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
