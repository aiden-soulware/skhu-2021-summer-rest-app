import http from '@/utils/http';

const state = {
  listData: null,
  user: null,
  cuser: null,
};

const getters = {};

const actions = {
  getList({ commit }) {
    return http.process('user', 'list').then((data) => {
      commit('setListData', data);
      console.log(data);
    });
    /* return http.process("user", "item", { id: 1 }).then(data => {
      commit("setListData", data);
    }) */
  },
  getUser({ commit }, userId) {
    return http.process('user', 'id', { id: userId }).then((data) => {
      commit('setUser', data);
    });
  },
  createUser({ commit }, param) {
    return http.process('user', 'create', param).then((data) => {
      console.log(data);
      commit('setCUser', data);
    });
  },
};

const mutations = {
  setListData(state, data) {
    state.listData = data;
  },
  setUser(state, data) {
    state.user = data;
  },
  setCUser(state, data) {
    state.cuser = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
