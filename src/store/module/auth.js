const auth = {
  namespaced: true,
  state: {
    email: '',
    password: '',
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
  },
};

export default auth;
