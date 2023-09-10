const course = {
  namespaced: true,
  state: {
    submit: false,
  },
  mutations: {
    setSubmit(state, submit) {
      state.submit = submit;
    },
  },
};

export default course;
