const blog = {
  namespaced: true,
  state: {
    file: '',
    numBlog: 0,
    numReport: 0,
  },
  mutations: {
    setFile(state, email) {
      state.email = email;
    },
    setNumBlog(state, numBlog) {
      state.numBlog = numBlog;
    },
    setNumReport(state, numReport) {
      state.numReport = numReport;
    },
  },
};

export default blog;
