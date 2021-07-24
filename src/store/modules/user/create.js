import http from '@/utils/http';
import info from './info';

const state = {
  user: { ...info.user },
  msg: {
    error: { ...info.validationMessages.error },
    success: { ...info.validationMessages.success },
  },
  defaltMsg: {
    error: { ...info.validationMessages.error },
    success: { ...info.validationMessages.success },
  },
  reg: { ...info.regExp },
  isValidated: { ...info.user },
  isCreate: false,
  isRefreshed: false,
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
  getDefaulMsg(state) {
    return state.defaltMsg;
  },
  getIsRefreshed(state) {
    return state.isRefreshed;
  },
  getIsValidated(state) {
    return !Object.values(state.isValidated).includes(false);
  },
};

const actions = {
  // validation
  emailValidation({ getters, commit }) {
    const user = getters.getUser;
    const reg = getters.getReg;
    const defaultMsg = getters.getDefaulMsg;
    const isRefreshed = getters.getIsRefreshed;
    // message setting
    if (user.email && user.email.length > 0) {
      // email validation
      // with regular expression
      if (reg.email.test(user.email)) {
        // with database exsistance
        http.process('user', 'email', { email: user.email }).then((res) => {
          if (res.success) {
            commit('setMessage', {
              option: 'email',
              success: {
                message: '',
              },
              error: {
                message: res.message,
              },
            });
            commit('setIsValidated', { option: 'email', isValidated: false });
          } else {
            commit('setMessage', {
              option: 'email',
              success: {
                message: defaultMsg.success.email,
              },
              error: {
                message: '',
              },
            });
            commit('setIsValidated', { option: 'email', isValidated: true });
          }
        });
      } else {
        commit('setMessage', {
          option: 'email',
          success: {
            message: '',
          },
          error: {
            message: defaultMsg.error.email,
          },
        });
        commit('setIsValidated', { option: 'email', isValidated: false });
      }
    } else if (!isRefreshed) {
      commit('setMessage', {
        option: 'email',
        success: {
          message: '',
        },
        error: {
          message: '',
        },
      });
      commit('setIsValidated', { option: 'email', isValidated: false });
    }
    // validation
  },
  validation({ getters, commit }, option) {
    const user = getters.getUser;
    const reg = getters.getReg;
    const defaultMsg = getters.getDefaulMsg;
    const isRefreshed = getters.getIsRefreshed;

    // message setting
    if (user[option] && user[option].length > 0) {
      if (reg[option].test(user[option])) {
        commit('setMessage', {
          option: option,
          success: {
            message: defaultMsg.success[option],
          },
          error: {
            message: '',
          },
        });
        commit('setIsValidated', { option: option, isValidated: true });
      } else {
        commit('setMessage', {
          option: option,
          success: {
            message: '',
          },
          error: {
            message: defaultMsg.error[option],
          },
        });
        commit('setIsValidated', { option: option, isValidated: false });
      }
    } else if (!isRefreshed) {
      commit('setMessage', {
        option: option,
        success: {
          message: '',
        },
        error: {
          message: '',
        },
      });
      commit('setIsValidated', { option: option, isValidated: false });
    }
  },
  submit({ getters, commit }) {
    const user = getters.getUser;

    // create user
    return http.process('user', 'create', user).then((res) => {
      commit('updateAvatar', res.user);
    });
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
  // validation
  setIsValidated(state, payload) {
    const option = payload.option;
    const isValidated = payload.isValidated;
    state.isValidated[option] = isValidated;
  },
  // message setting
  setMessage(state, payload) {
    const success = payload.success,
      error = payload.error,
      option = payload.option;
    if (success) state.msg.success[option] = success.message;
    if (error) state.msg.error[option] = error.message;
  },
  setSuccessMsg(state, payload) {
    let message = payload.message,
      option = payload.option;
    state.msg.success[option] = message;
  },

  // functions
  initialize(state) {
    state.user = { ...info.user };
    state.msg.success = { ...info.user };
    state.msg.error = { ...info.user };
    state.isValidated = { ...info.user };
    state.image = null;
    state.isRefreshed = false;
    state.isCreate = false;
  },
  refresh(state) {
    state.user = { ...info.user };
    state.msg.success = { ...info.user };
    state.msg.error = { ...info.informationMessages };
    state.isValidated = { ...info.user };
    state.image = null;
    state.isRefreshed = true;
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
