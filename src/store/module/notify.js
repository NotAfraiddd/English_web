const notify = {
  namespaced: true,
  state: {
    inforComment: {
      id: null,
      numberNotifications: 0,
      content: {},
      kind: null,
      admin: false,
    },
    statusCallAPICourse: false,
  },
  mutations: {
    setNotify(state, { id, numberNotifications, content, kind, admin }) {
      state.inforComment = { id, numberNotifications, content, kind, admin };
    },
    setStatusCallAPICourse(state, statusCallAPICourse) {
      state.statusCallAPICourse = statusCallAPICourse;
    },
  },
};

export default notify;
