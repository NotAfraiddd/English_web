const notify = {
  namespaced: true,
  state: {
    inforComment: { id: null, numberNotifications: 0 },
  },
  mutations: {
    setNotify(state, { id, numberNotifications }) {
      state.inforComment = { id, numberNotifications };
    },
  },
};

export default notify;
