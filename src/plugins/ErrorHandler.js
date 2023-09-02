/**
 * @param {Error} error
 * @param {Vue} context
 */
function handleError(error) {
  console.error(error);
}

export default {
  install(Vue) {
    Vue.prototype.$handleError = handleError;
  },
};
