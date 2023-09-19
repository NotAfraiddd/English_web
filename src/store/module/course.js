const course = {
  namespaced: true,
  state: {
    submit: false,
  },
  mutations: {
    setSubmit(state, submit) {
      console.log(submit);
      state.submit = submit;
    },
  },
};

export default course;
