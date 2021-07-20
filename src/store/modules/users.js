import http from '@/utils/http'

const state = {
  listData: null
};

const getters = {};

const actions = {
  getList({ commit }) {
    return http.process("user", "list").then(data => {
      commit("setListData", data);
    })
    /* return http.process("user", "item", { id: 1 }).then(data => {
      commit("setListData", data);
    }) */
  },
};

const mutations = {
  setListData(state, data) {
    state.listData = data;
  }
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};