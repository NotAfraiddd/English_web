<template>
  <div class="text-primary_black relative">
    <ButtonBack title="Blog detail" @back="changeBack" :hide-back="true" />
    <div class="flex mt-5">
      <Avatar :imgUrl="avatar" class="w-10 border" />
      <div class="flex flex-col ml-4 items-start">
        <div class="text-sm">{{ created_at }}</div>
        <div class="text-base font-semibold">{{ name }}</div>
      </div>
    </div>
    <div class="mt-4 p-5" v-html="content" />
    <div class="flex gap-5 absolute right-0">
      <div
        @click="handleRejected"
        class="text-text_red text-base h-10 leading-10 w-24 cursor-pointer"
      >
        Rejected
      </div>
      <div
        @click="handleApproved"
        class="text-white bg-text_green h-10 leading-10 w-24 text-base font-medium rounded-lg border-table_header border cursor-pointer"
      >
        Approved
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Avatar from '../../../components/common/Avatar.vue';
import { AVATAR } from '../../../constants/image';
import { SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';

export default {
  name: 'DetailBlogPending',
  created() {
    this.AVATAR = AVATAR;
  },
  components: { ButtonBack, Avatar },
  mounted() {
    // reject comment
    this.sockets.subscribe('rejectBlogPending', (data) => {
      console.log('rejectBlogPending', data);
      if (data.kind == SOCKET.REJECTED_BLOG_PENDING) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REJECTED_BLOG_PENDING,
        });
      }
    });
    const rejectContent = {
      room: this.userID,
      kind: SOCKET.REJECTED_BLOG_PENDING,
    };
    this.$socket.emit('joinRoom', rejectContent);
    // comment
    this.sockets.subscribe('blogPending', (data) => {
      if (data.kind == SOCKET.NOTIFY_BLOG_PENDING) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.NOTIFY_BLOG_PENDING,
        });
      }
    });
    const content = {
      room: this.userID,
      kind: SOCKET.NOTIFY_BLOG_PENDING,
    };
    this.$socket.emit('joinRoom', content);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    handleRejected() {
      // join socket rejectcomment
      const dataSocket = {
        room: this.userID,
        kind: SOCKET.REJECTED_BLOG_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let blog = {
        userID: this.userID,
        avatar: this.avatar,
        name: this.name,
        created_at: this.created_at,
        content: this.content,
      };
      let data = {
        data: blog,
        kind: SOCKET.REJECTED_BLOG_PENDING,
      };
      this.$socket.emit('sendSignal', data);
      // ( call api)
    },
    handleApproved() {
      // join socket react
      const dataSocket = {
        room: this.userID,
        kind: SOCKET.NOTIFY_BLOG_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let blog = {
        userID: this.userID,
        avatar: this.avatar,
        name: this.name,
        created_at: this.created_at,
        content: this.content,
      };
      let data = {
        data: blog,
        kind: SOCKET.NOTIFY_BLOG_PENDING,
      };
      this.$socket.emit('sendSignal', data);
      // ( call api)
    },
    changeBack() {
      this.$router.push({ name: 'BlogPending' });
    },
  },
  data() {
    return {
      numNotify: 0,
      userID: 1,
      avatar: AVATAR,
      name: 'Nguyen Huynh Chí Bảo',
      created_at: '20/03/2023 10:23',
      content: 'Nguyen Huynh Chí Bảo',
    };
  },
};
</script>

<style lang="scss"></style>
