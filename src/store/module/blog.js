const blog = {
  namespaced: true,
  state: {
    file: '',
    numBlog: 0,
  },
  mutations: {
    setFile(state, email) {
      state.email = email;
    },
    setNumBlog(state, numBlog) {
      state.numBlog = numBlog;
    },
  },
};

export default blog;
