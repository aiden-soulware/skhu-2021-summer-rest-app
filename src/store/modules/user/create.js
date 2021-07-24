import http from '@/utils/http';
import info from './info';

const state = {
  user: { ...info.user },
  isCreate: false,
  image: null,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getImage(state) {
    return state.image;
  },

  getIsCreate(state) {
    return state.getIsCreate;
  },
};

const actions = {
  submit({ getters, commit }) {
    const user = getters.getUser;

    // create user
    return http.process('user', 'create', user).then((res) => {
      commit('updateAvatar', res.user);
    });
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
  setImage(state, data) {
    state.image = data;
  },
  setIsCreate(state, data) {
    state.isCreate = data;
  },

  // functions
  refresh(state) {
    state.user = { ...info.user };
    state.image = null;
  },
  updateAvatar(state, user) {
    // avatar upload
    if (state.image)
      return http
        .process('s3', 'upload', {
          name: `avatar_${user.id}`,
          file: state.image,
        })
        .then((res) => {
          http.process('user', 'update', {
            ...user,
            avatar: res.url,
          });
        });
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
