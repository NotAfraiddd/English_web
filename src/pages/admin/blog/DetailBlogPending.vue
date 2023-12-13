<template>
  <div class="text-primary_black relative">
    <ButtonBack title="Blog detail" @back="changeBack" :hide-back="true" />
    <div class="flex mt-5">
      <Avatar :imgUrl="avatar" :name="name" class="w-10 h-10 border" />

      <div class="flex flex-col ml-4 items-start">
        <div class="text-sm">{{ created_at }}</div>
        <div class="text-base font-semibold">{{ name }}</div>
      </div>
    </div>
    <div class="mt-4 text-left text-xl font-semibold">{{ title }}</div>
    <div class="mt-4 text-left" v-html="content" />
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
import { NOTIFY_MESSAGE, SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';
import blogApi from '../../../apis/blog';
import moment from 'moment';
import { notification } from 'ant-design-vue';
export default {
  name: 'DetailBlogPending',
  created() {
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.idBlog = +this.$route.params.id;
    this.userID = this.$route.params.username;
    if (this.idBlog) {
      this.getDetail();
    }
  },
  components: { ButtonBack, Avatar },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    async getDetail() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getDetailBlog({ id: this.idBlog });
        this.content = data?.content;
        this.created_at = moment(data?.createDate).format('DD/MM/YYYY HH:mm');
        this.name = data?.author?.fullName || data?.author?.email;
        this.avatar = data?.author?.avtURL;
        this.title = data?.title;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    async apiApprovePost() {
      try {
        await blogApi.approvePost({ id: this.idBlog });
        notification.success({ message: NOTIFY_MESSAGE.APPROVE_SUCCESS });
      } catch (error) {
        console.log(error);
        notification.error({ message: NOTIFY_MESSAGE.APPROVE_FAILED });
      } finally {
        this.$router.push({ name: 'BlogPending' });
      }
    },
    async apiRejectPost() {
      try {
        await blogApi.rejectPost({ id: this.idBlog });
        notification.success({ message: NOTIFY_MESSAGE.REJECT_SUCCESS });
      } catch (error) {
        console.log(error);
        notification.error({ message: NOTIFY_MESSAGE.REJECT_FAILED });
      } finally {
        this.$router.push({ name: 'BlogPending' });
      }
    },
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
      this.apiRejectPost();
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
      this.apiApprovePost();
    },
    changeBack() {
      this.$router.push({ name: 'BlogPending' });
    },
  },
  data() {
    return {
      title: null,
      idBlog: null,
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
