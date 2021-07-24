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
  isCreate: false,
  isRefreshed: false,
  isValidated: false,
  image: null,
};

const getters = {
  getUser(state) {
    return state.user;
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
          console.log(res.success);
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
          } else
            commit('setMessage', {
              option: 'email',
              success: {
                message: defaultMsg.success.email,
              },
              error: {
                message: '',
              },
            });
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
    }
    // validation
    commit('setIsValidated');
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
    }
    // validation
    commit('setIsValidated');
  },
  submit({ commit }) {
    http.process('user', 'create', state.user).then((res) => {
      // email check
      if (res.success) commit('initialize');
      else
        commit('setMessage', {
          option: 'email',
          success: {
            message: '',
          },
          error: {
            message: res.messsage,
          },
        });
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
  setIsValidated(state) {
    if (Object.values(state.msg.success).includes(''))
      state.isValidated = false;
    else state.isValidated = true;
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
    state.isValidated = false;
    state.isRefreshed = false;
    state.isCreate = false;
  },
  refresh(state) {
    state.user = { ...info.user };
    state.msg.success = { ...info.user };
    state.msg.error = { ...info.informationMessages };
    state.isValidated = false;
    state.isRefreshed = true;
  },

  // submit(state) {
  //   // http
  //   //   .process('s3', 'upload', { name: 'avatar_tmp', file: state.image })
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //   });

  //   http.process('user', 'create', state.user).then((res) => {
  //     console.log(res.message);
  //   });
  // },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
