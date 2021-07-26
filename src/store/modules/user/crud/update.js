import info from '../info';

const state = {
  user: { ...info.user },
  isUpdate: false,
};

const getters = {
  getIsUpdate(state) {
    return state.getIsUpdate;
  },
};

const actions = {};

const mutations = {
  setIsUpdate(state, data) {
    state.isUpdate = data;
  },
  setUser(state, data) {
    state.user = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
