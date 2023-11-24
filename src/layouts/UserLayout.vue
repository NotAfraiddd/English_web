<template>
  <BaseSideBar />
  <div class="content-user-layout">
    <BaseHeader :hideSearch="true" />
    <div class="user-layout">
      <div class="user-content-wrap">
        <router-view />
      </div>
    </div>
  </div>
  <BaseFooter />
  <LoadingScreen v-if="isLoading" />
</template>

<script>
import BaseSideBar from '../components/User/BaseSideBar.vue';
import BaseHeader from '../components/admin/BaseHeader';
import BaseFooter from '../components/admin/BaseFooter';
import LoadingScreen from '../components/common/LoadingScreen';
import { LoadingMixins } from '../mixins/Loading';
import { SOCKET } from '../constants';
import { mapMutations } from 'vuex';
export default {
  name: 'UserLayout',
  components: { BaseSideBar, BaseHeader, LoadingScreen, BaseFooter },
  mixins: [LoadingMixins],
  created() {
    this.userInfor = JSON.parse(localStorage.getItem('user'));
  },
  data() {
    return {
      userInfor: null,
      numNotify: 0,
      isLoading: false,
    };
  },
  mounted() {
    // reject
    this.sockets.subscribe('rejectCoursePending', (data) => {
      if (
        data.kind == SOCKET.REJECTED_COURSE_PENDING &&
        data.data.creatorUserid.email == this.userInfor.email
      ) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REJECTED_COURSE_PENDING,
          admin: true,
        });
      }
    });
    const contentReject = {
      room: this.userInfor.email,
      kind: SOCKET.REJECTED_COURSE_PENDING,
    };
    this.$socket.emit('joinRoom', contentReject);
    // accept
    this.sockets.subscribe('coursePending', (data) => {
      if (
        data.kind == SOCKET.NOTIFY_COURSE_PENDING &&
        data.data.creatorUserid.email == this.userInfor.email
      ) {
        this.setStatusCallAPICourse(true);
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.NOTIFY_COURSE_PENDING,
          admin: true,
        });
      }
    });
    const content = {
      room: this.userInfor.email,
      kind: SOCKET.NOTIFY_COURSE_PENDING,
    };
    this.$socket.emit('joinRoom', content);
    // ------------------ react ------------------
    this.sockets.subscribe('react', (data) => {
      if (data.kind == SOCKET.REACT && data.data.id == this.userInfor.email) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT,
          admin: data.data.admin,
        });
      }
    });
    const dataReact = {
      room: this.userInfor.email,
      kind: SOCKET.REACT,
    };
    this.$socket.emit('joinRoom', dataReact);
    // ------------------ react comment ------------------
    this.sockets.subscribe('reactComment', (data) => {
      if (
        data.kind == SOCKET.REACT_COMMENT &&
        data.data.id == this.userInfor.email
      ) {
        console.log('SOCKET.REACT_COMMENT');
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT_COMMENT,
          admin: data.data.admin,
        });
      }
    });
    const dataReactComment = {
      room: this.idUserBlog,
      kind: SOCKET.REACT_COMMENT,
    };
    this.$socket.emit('joinRoom', dataReactComment);
    // ------------------ react reply comment ------------------
    this.sockets.subscribe('reactCommentReply', (data) => {
      if (
        data.kind == SOCKET.REACT_COMMENT_REPLY &&
        data.data.id == this.userInfor.email
      ) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT_COMMENT_REPLY,
          admin: data.data.admin,
        });
      }
    });
    const dataReactCommentReply = {
      room: this.idUserBlog,
      kind: SOCKET.REACT_COMMENT_REPLY,
    };
    this.$socket.emit('joinRoom', dataReactCommentReply);
    // listeing socket
    this.sockets.subscribe('signal', (data) => {
      console.log('comment', data);
      if (data.kind == SOCKET.COMMENT && data.data.id == this.userInfor.email) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.COMMENT,
          admin: data.data.admin,
        });
      }
    });
    const data = {
      room: this.idUserBlog,
      kind: SOCKET.COMMENT,
    };
    this.$socket.emit('joinRoom', data);
    // ------------------ reply comment ------------------
    this.sockets.subscribe('reply', (data) => {
      if (
        data.kind == SOCKET.REPLY_COMMENT &&
        data.data.id == this.userInfor.email
      ) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REPLY_COMMENT,
          admin: data.data.admin,
        });
      }
    });
    const dataReply = {
      room: this.idUserBlog + `REPLY`,
      kind: SOCKET.REPLY_COMMENT,
    };
    this.$socket.emit('joinRoom', dataReply);
  },
  watch: {
    $route(to, from) {
      this.emitter.emit('isShowLoading', true);
      setTimeout(() => {
        this.emitter.emit('isShowLoading', false);
      }, 1000);
    },
  },
  methods: {
    ...mapMutations('notify', ['setNotify', 'setStatusCallAPICourse']),
  },
};
</script>

<style lang="scss">
.user-layout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #615a5a;
}
.content-user-layout {
  position: relative;
  width: 100%;
  padding-left: 121px;
}

html *::-webkit-scrollbar {
  border-radius: 0;
  height: 12px;
  width: 8px;
}

html *::-webkit-scrollbar {
  border-radius: 0;
  height: 12px;
  width: 8px;
}

html *::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.15);
}

html *::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.15);
}

html *::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}

html *::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}
</style>
