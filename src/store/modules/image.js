import http from '@/utils/http';

const state = {
  image: null,
  message: '',
};

const getters = {
  getImage(state) {
    return state.image;
  },
};

const actions = {};

const mutations = {
  setImage(state, data) {
    state.image = data;
  },
  updateAvatar(state, user) {
    // avatar upload
    state.message = '';
    if (state.image)
      http
        .process('s3', 'upload', {
          name: `avatar_${user.id}`,
          file: state.image,
        })
        .then((res) => {
          state.image = null;
          return http
            .process('user', 'update', {
              ...user,
              avatar: res.url,
            })
            .catch(() => {
              state.message = ', but avatar update failed';
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
