import { EventBus } from "@/event-bus";

const alertObj = {
  success: (msg) => { EventBus.$emit('alert:success', msg) },
  fail: (msg) => { EventBus.$emit('alert:fail', msg) },

  popup: (title, message, okCallback, opt) => { EventBus.$emit('dialog:open', { title: title, message: message, ok: okCallback, cancel: null, opt: Object.assign({}, opt, { noCancel: true }) }) },
  popupMessage: (message, opt) => { EventBus.$emit('dialog:open', { title: null, message: message, ok: null, cancel: null, opt: Object.assign({}, opt, { showClose: true, noActionButtons: true }) }) },
  popupWithCancel: (title, message, okCallback, cancalCallback, opt) => { EventBus.$emit('dialog:open', { title: title, message: message, ok: okCallback, cancel: cancalCallback, opt: Object.assign({}, opt) }) },
}

const Alert = {
  install(Vue) {
    Vue.prototype.$alert = alertObj
  }
};

export default Alert;