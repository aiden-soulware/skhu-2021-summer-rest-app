import info from './info';

const state = {
  user: info.user,
  defaltMsg: {
    error: { ...info.messages.error },
    success: { ...info.messages.success },
  },
  msg: {
    error: { ...info.messages.error },
    success: { ...info.messages.success },
  },
  reg: { ...info.regExp },
  isCreate: false,
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getReg(state) {
    return state.reg;
  },
};

const actions = {
  // validation
  validation({ getters, commit }, option) {
    const user = getters.getUser;
    const reg = getters.getReg;
    // message setting
    if (user[option] && user[option].length > 0) {
      if (reg[option].test(user[option])) {
        commit('setSuccessMsg', option);
        commit('clearErrorMsg', option);
      } else {
        commit('setErrorMsg', option);
        commit('clearSuccessMsg', option);
      }
    } else {
      commit('clearErrorMsg', option);
      commit('clearSuccessMsg', option);
    }
  },
};

const mutations = {
  setIsCreate(state, data) {
    state.isCreate = data;
  },
  setUser(state, data) {
    state.user = data;
  },
  // validation
  setErrorMsg(state, option) {
    state.msg.error[option] = state.defaltMsg.error[option];
    console.log(state.defaltMsg.error[option]);
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
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
