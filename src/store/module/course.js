const course = {
  namespaced: true,
  state: {
    submit: false,
    idCoursePending: null,
    numCourse: 0,
    file: null,
  },
  mutations: {
    setSubmit(state, submit) {
      state.submit = submit;
    },
    setIDCourse(state, idCoursePending) {
      state.idCoursePending = idCoursePending;
    },
    setNumberCourse(state, numCourse) {
      state.numCourse = numCourse;
    },
    setFileImage(state, file) {
      state.file = file;
    },
  },
};

export default course;
