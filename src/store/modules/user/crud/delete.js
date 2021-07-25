import http from '@/utils/http';

const state = {};

const getters = {};

const actions = {
  onDelete({ commit }, user) {
    // delete user
    return http.process('user', 'delete', { id: user.id });

    // return commit('deleteInS3', user);
  },
};

const mutations = {
  // deleteInS3(state, user) {
  //   http.process('s3', 'delete', { user: user });
  // },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
