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
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getReg(state) {
    return state.reg;
  },
  getIsRefreshed(state) {
    return state.isRefreshed;
  },
};

const actions = {
  // validation
  validation({ getters, commit }, option) {
    const user = getters.getUser;
    const reg = getters.getReg;
    const isRefreshed = getters.getIsRefreshed;
    // message setting
    if (user[option] && user[option].length > 0) {
      if (reg[option].test(user[option])) {
        commit('setSuccessMsg', option);
        commit('clearErrorMsg', option);
      } else {
        commit('setErrorMsg', option);
        commit('clearSuccessMsg', option);
      }
    } else if (!isRefreshed) {
      commit('clearErrorMsg', option);
      commit('clearSuccessMsg', option);
    }
    // validation
    commit('setIsValidated');
  },
};

const mutations = {
  setUser(state, data) {
    state.user = data;
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
  setErrorMsg(state, option) {
    state.msg.error[option] = state.defaltMsg.error[option];
  },
  setSuccessMsg(state, option) {
    state.msg.success[option] = state.defaltMsg.success[option];
  },
  clearErrorMsg(state, option) {
    state.msg.error[option] = '';
  },
  clearSuccessMsg(state, option) {
    state.msg.success[option] = '';
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

  submit(state) {
    return http.process('user', 'create', state.user);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
