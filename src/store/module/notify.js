const notify = {
  namespaced: true,
  state: {
    inforComment: { id: null, numberNotifications: 0, content: {} },
  },
  mutations: {
    setNotify(state, { id, numberNotifications, content }) {
      state.inforComment = { id, numberNotifications, content };
    },
  },
};

export default notify;
