const notify = {
  namespaced: true,
  state: {
    inforComment: { id: null, numberNotifications: 0, content: {}, kind: null },
  },
  mutations: {
    setNotify(state, { id, numberNotifications, content, kind }) {
      state.inforComment = { id, numberNotifications, content, kind };
    },
  },
};

export default notify;
