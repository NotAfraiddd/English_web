const member = {
  namespaced: true,
  state: {
    save: false,
    user: {},
    hasErrorListening: false,
  },
  mutations: {
    setSave(state, save) {
      state.save = save;
    },
    setUser(state, user) {
      state.user = user;
    },
    setErrorListening(state, hasErrorListening) {
      state.hasErrorListening = hasErrorListening;
    },
  },
};

export default member;
