import http from '@/utils/http';
import info from './info';

const state = {
  user: { ...info.user },
  reg: { ...info.regExp },
  msg: {
    error: { ...info.validationMessages.error },
    success: { ...info.validationMessages.success },
  },

  isValidated: { ...info.user },
  isUpdate: false,

  image: null,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getImage(state) {
    return state.image;
  },
  getReg(state) {
    return state.reg;
  },
  getIsValidated(state) {
    return (
      !Object.values(state.isValidated).includes(false) &&
      !Object.values(state.isValidated).includes('')
    );
  },
};

const actions = {
  validation({ getters, commit }, type) {
    const user = getters.getUser;
    const reg = getters.getReg;

    if (user[type] && user[type].length > 0) {
      // regex expression
      if (reg[type].test(user[type])) {
        switch (type) {
          case 'email':
            // email check
            http.process('user', 'email', { email: user.email }).then((res) => {
              if (res.success) {
                commit('setMessage', {
                  type: type,
                  option: 'success',
                  message: res.message,
                });
              } else {
                commit('setMessage', {
                  type: type,
                  option: 'success',
                  message: info.validationMessages.success.email,
                });
              }
            });
            break;

          case 'firstName':
          case 'lastName':
            commit('setMessage', {
              type: type,
              option: 'success',
              message: info.validationMessages.success[type],
            });
            break;

          default:
            console.log('validation input type error');
            return;
        }
      } else {
        // when regex expression returns false
        commit('setMessage', {
          type: type,
          option: 'error',
          message: info.validationMessages.error[type],
        });
      }
    } else {
      // refresh
      commit('setMessage', {
        type: type,
        option: 'clear',
      });
    }
  },
  submit({ getters, commit }) {
    const user = getters.getUser;

    // create user
    return http.process('user', 'create', user).then((res) => {
      commit('updateAvatar', res.user);
    });
  },
  initialize({ commit }) {
    commit('refresh');
    commit('setIsUpdate', false);
  },
};

const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  setImage(state, data) {
    state.image = data;
  },
  setIsUpdate(state, data) {
    state.isUpdate = data;
  },

  // message setting
  setMessage(state, payload) {
    const type = payload.type;
    switch (payload.option) {
      case 'success':
        state.msg.success[type] = payload.message;
        state.msg.error[type] = '';
        state.isValidated[type] = true;
        break;

      case 'error':
        state.msg.success[type] = '';
        state.msg.error[type] = payload.message;
        state.isValidated[type] = false;
        break;

      case 'clear':
        state.msg.success[type] = '';
        state.msg.error[type] = '';
        state.isValidated[type] = false;
        break;
      default:
        console.log('message setting error');
        return;
    }
  },

  // functions
  refresh(state) {
    state.user = { ...info.user };
    state.msg.success = { ...info.user };
    state.msg.error = { ...info.user };
    state.isValidated = { ...info.user };
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
