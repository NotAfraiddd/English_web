const course = {
  namespaced: true,
  state: {
    submit: false,
    idCoursePending: null,
  },
  mutations: {
    setSubmit(state, submit) {
      state.submit = submit;
    },
    setIDCourse(state, idCoursePending) {
      state.idCoursePending = idCoursePending;
    },
  },
};

export default course;
