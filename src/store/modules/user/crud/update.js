const state = {
  isUpdate: false,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getIsUpdate(state) {
    return state.getIsUpdate;
  },
};

const actions = {};

const mutations = {
  setIsUpdate(state, data) {
    state.isUpdate = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
