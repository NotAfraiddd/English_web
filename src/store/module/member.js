const member = {
  namespaced: true,
  state: {
    save: false,
    user: {},
    hasErrorListening: false,
    hasErrorListeningAdvanced: false,
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
    setErrorListeningAdvanced(state, hasErrorListeningAdvanced) {
      state.hasErrorListeningAdvanced = hasErrorListeningAdvanced;
    },
  },
};

export default member;
