import http from '@/utils/http';

const state = {
  listData: null,
  info: null,
};

const getters = {};

const actions = {
  getList({ commit }) {
    return http.process('user', 'list').then((data) => {
      commit('setListData', data);
    });
  },
  getInfo({ commit }, userId) {
    return http.process('user', 'id', { id: userId }).then((data) => {
      commit('setInfo', data.user);
    });
  },
};

const mutations = {
  setListData(state, data) {
    state.listData = data;
  },
  setInfo(state, data) {
    state.info = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
