const member = {
  namespaced: true,
  state: {
    save: false,
    user: {},
  },
  mutations: {
    setSave(state, save) {
      state.save = save;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
};

export default member;
