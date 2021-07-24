import info from './info';
import http from '@/utils/http';

const state = {
  reg: { ...info.regExp },
  isValidated: { ...info.user },
  msg: {
    error: { ...info.validationMessages.error },
    success: { ...info.validationMessages.success },
  },
};
const getters = {
  getIsValidated(state) {
    return (
      !Object.values(state.isValidated).includes(false) &&
      !Object.values(state.isValidated).includes('')
    );
  },
  getReg(state) {
    return state.reg;
  },
};
const actions = {
  main({ getters, commit }, payload) {
    const value = payload.value,
      type = payload.type,
      reg = getters.getReg;

    if (value && value.length > 0) {
      // regex expression
      if (reg[type].test(value)) {
        switch (type) {
          case 'email':
            // email check
            http.process('user', 'email', { email: value }).then((res) => {
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
};

const mutations = {
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
  refresh(state) {
    state.msg.success = { ...info.user };
    state.msg.error = { ...info.user };
    state.isValidated = { ...info.user };
  },
};

export default { namespaced: true, getters, state, actions, mutations };
