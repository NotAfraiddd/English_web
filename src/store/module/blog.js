const blog = {
  namespaced: true,
  state: {
    file: '',
  },
  mutations: {
    setFile(state, email) {
      state.email = email;
    },
  },
};

export default blog;
