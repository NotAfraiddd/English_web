const course = {
  namespaced: true,
  state: {
    submit: false,
    idCoursePending: null,
    numCourse: 0,
    file: null,
    media: null,
    idSession: null,
  },
  mutations: {
    setIdSession(state, idSession) {
      state.idSession = idSession;
    },
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
    setMedia(state, media) {
      state.media = media;
    },
  },
};

export default course;
