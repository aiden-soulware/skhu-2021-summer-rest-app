import http from '@/utils/http';

const state = {
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
  onCreate(context, form) {
    // create user
    return http.process('user', 'create', form);
  },
};

const mutations = {
  setIsCreate(state, data) {
    state.isCreate = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
