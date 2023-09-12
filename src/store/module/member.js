const member = {
  namespaced: true,
  state: {
    save: false,
  },
  mutations: {
    setSave(state, save) {
      state.save = save;
    },
  },
};

export default member;
