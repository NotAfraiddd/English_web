const auth = {
  namespaced: true,
  state: {
    email: '',
    password: '',
    error: 0,
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setError(state, error) {
      state.error = error;
    },
  },
};

export default auth;
