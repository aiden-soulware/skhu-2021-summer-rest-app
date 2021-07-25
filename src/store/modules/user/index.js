import http from '@/utils/http';

const state = {
  listData: null,
  user: null,
};

const getters = {};

const actions = {
  getList({ commit }) {
    return http.process('user', 'list').then((data) => {
      commit('setListData', data);
    });
  },
  getUser({ commit }, userId) {
    return http.process('user', 'id', { id: userId }).then((data) => {
      commit('setUser', data.user);
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
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
