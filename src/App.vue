<template>
  <router-view />
  <div class="flex justify-content-center">
    <Toast
      position="bottom-left"
      v-model:visible="visible"
      @close="visible = false"
      style="left: 25px; width: 400px; border-radius: 6px"
    >
      <template #message="slotProps">
        <div class="flex items-center bg-white w-full gap-4">
          <Avatar
            :imgUrl="
              inforComment.admin
                ? ADMIN
                : inforComment.content?.creatorUserid?.avatar
            "
            :name="
              inforComment.admin
                ? inforComment.content.name
                : inforComment.content?.creatorUserid?.fullName
            "
            externalClass="h-10 w-12 rounded-full"
          />
          <div class="w-full">
            <div class="text-base font-semibold">
              {{ slotProps.message.summary }}
            </div>
            <div>{{ slotProps.message.detail }}</div>
          </div>
        </div>
      </template>
    </Toast>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HOME_ICON, ADMIN } from './constants/image';
import Toast from 'primevue/toast';
import { SOCKET } from '../socket_server/config/constant';
import Avatar from './components/common/Avatar.vue';

export default {
  components: { Toast, Avatar },
  created() {
    this.ADMIN = ADMIN;
    this.HOME_ICON = HOME_ICON;
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState('notify', ['inforComment']),
  },
  watch: {
    inforComment(newVal, oldVal) {
      if (newVal.numberNotifications > 0) {
        this.showToast(newVal);
      }
    },
  },
  methods: {
    showToast(data) {
      if (data.kind == SOCKET.COMMENT)
        this.$toast.add({
          severity: 'success',
          summary: `${data.content.name} `,
          detail: 'mentioned you in a comment.',
          life: 3000,
        });
      else if (data.kind == SOCKET.REPLY_COMMENT) {
        this.$toast.add({
          severity: 'success',
          summary: `${data.content.name} `,
          detail: 'replied to your comment on your post.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REACT) {
        console.log('SOCKET.REACT', data.content);
        this.$toast.add({
          severity: 'success',
          summary: `${data.content.name}`,
          detail: 'reacts your blog.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REACT_COMMENT) {
        this.$toast.add({
          severity: 'success',
          summary: `${data.content.name}`,
          detail: 'reacts to your comment on your post.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REACT_COMMENT_REPLY) {
        this.$toast.add({
          severity: 'success',
          summary: `${data.content.name}`,
          detail: 'reacts to your comment on your post.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN) {
        this.$toast.add({
          severity: 'success',
          detail: 'Admin have approved reported comment of you.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.NOTIFY_BLOG_PENDING) {
        this.$toast.add({
          severity: 'success',
          detail: 'Admin have approved blog of you.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.NOTIFY_COURSE_PENDING) {
        this.$toast.add({
          severity: 'success',
          detail: 'Admin have approved course of you.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN) {
        this.$toast.add({
          severity: 'warn',
          detail: 'Admin have rejected comment of you.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REJECTED_BLOG_PENDING) {
        this.$toast.add({
          severity: 'warn',
          detail: 'Admin have rejected blog of you.',
          life: 3000,
        });
      } else if (data.kind == SOCKET.REJECTED_COURSE_PENDING) {
        this.$toast.add({
          severity: 'warn',
          detail: 'Admin have rejected course of you.',
          life: 3000,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.p-toast-message-content {
  background: #fff;
  border-radius: 6px;
}

body {
  overflow-x: hidden;
  ::selection {
    background-color: #f05123;
  }
}
#app {
  font-family: 'Jost', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
