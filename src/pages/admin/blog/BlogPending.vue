<template>
  <div class="text-primary_black">
    <ButtonBack title="Blog pending" @back="changeBack" :hide-back="true" />
    <div v-if="listBlog.length == 0" class="text-xl font-semibold mt-5">
      No data
    </div>
    <ListBlog
      v-else
      :data="listBlog"
      :avatar="true"
      :user="true"
      :button="true"
      :image="true"
      @changePath="goToDetail"
      @rejected="handleRejected"
      @approved="handleApproved"
    />
    <div class="mt-5 flex justify-center">
      <a-pagination
        class="pagination"
        v-model:current="current"
        v-model:page-size="pageSize"
        :total="total"
        @change="onShowSizeChange"
      />
    </div>
  </div>
</template>

<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import { AVATAR, TITLE } from '../../../constants/image';
import { NOTIFY, NOTIFY_MESSAGE, SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';
import blogApi from '../../../apis/blog';
import { notification } from 'ant-design-vue';
import moment from 'moment';

export default {
  name: 'BlogPending',
  components: { ButtonBack, ListBlog },
  created() {
    this.TITLE = TITLE;
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.AVATAR = AVATAR;
    this.NOTIFY = NOTIFY;
    this.getAllPost();
  },
  watch: {
    pageSize(value) {
      this.pageSize = value;
    },
  },

  methods: {
    ...mapMutations('notify', ['setNotify']),
    async getAllPost() {
      try {
        this.listBlog = [];
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getAllPostPending(this.current);
        data?.content.forEach((item) => {
          this.listBlog.push({
            id: item?.id,
            userID: item?.author?.uid,
            author: item?.author?.fullName,
            avatar: item?.author?.avtURL,
            imageTitle: item?.thumbnailURL,
            title: item?.title || 'Notitle',
            content: item?.content,
            date: moment(item?.createDate).format('DD/MM/YYYY HH:mm'),
          });
          this.total = data?.totalElements;
          this.pageSize = data?.size;
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    async apiApprovePost(dataIdPost) {
      try {
        await blogApi.approvePost({ id: dataIdPost });
        notification.success({ message: NOTIFY_MESSAGE.APPROVE_SUCCESS });
      } catch (error) {
        console.log(error);
      } finally {
        await this.getAllPost();
      }
    },
    async apiRejectPost(dataIdPost) {
      try {
        await blogApi.rejectPost({ id: dataIdPost });
        notification.error({ message: NOTIFY_MESSAGE.APPROVE_SUCCESS });
      } catch (error) {
        console.log(error);
      } finally {
        await this.getAllPost();
      }
    },
    handleRejected(data) {
      this.idUserBlog = data.userID;
      // join socket rejectcomment
      const dataSocket = {
        room: this.idUserBlog,
        kind: SOCKET.REJECTED_BLOG_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let content = {
        data: data,
        kind: SOCKET.REJECTED_BLOG_PENDING,
      };
      this.$socket.emit('sendSignal', content);
      // remove item out list( call api)
      this.listBlog = this.listBlog.filter(
        (item) => item.userID !== this.idUserBlog,
      );
      this.apiRejectPost(data?.id);
    },
    handleApproved(data) {
      this.idUserBlog = data.userID;
      // join socket rejectcomment
      const dataSocket = {
        room: this.idUserBlog,
        kind: SOCKET.NOTIFY_BLOG_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let content = {
        data: data,
        kind: SOCKET.NOTIFY_BLOG_PENDING,
      };
      this.$socket.emit('sendSignal', content);
      // remove item out list( call api)
      this.listBlog = this.listBlog.filter(
        (item) => item.userID !== this.idUserBlog,
      );
      this.apiApprovePost(data?.id);
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getAllPost();
    },
    changeBack() {
      this.$router.push({ name: 'Dashboard' });
    },
    goToDetail(data) {
      this.$router.push({
        name: 'DetailBlogPending',
        params: { username: data.userID, id: data.id },
      });
    },
  },
  data() {
    return {
      index: 0,
      numNotify: 0,
      current: 1,
      pageSize: 0,
      idUserBlog: null,
      total: 0,
      listBlog: [],
    };
  },
};
</script>

<style lang="scss">
.ant-pagination-item:focus-visible a,
.ant-pagination-item-active a,
.ant-pagination-item:hover {
  border-color: rgba(81, 166, 221, 0.7);
  color: rgba(81, 166, 221, 0.7);
}
.ant-pagination-item,
.ant-pagination-prev .ant-pagination-item-link,
.ant-pagination-disabled .ant-pagination-item-link,
.ant-pagination-next .ant-pagination-item-link {
  border-color: #fff;
}
.ant-pagination-next .ant-pagination-item-link,
.ant-pagination-prev .ant-pagination-item-link {
  border: none;
}

.ant-pagination-item-active,
.ant-pagination-item:hover {
  border-radius: 50%;
  background-color: rgba(81, 166, 221, 0.7);
  a {
    color: #fff !important;
  }
}
</style>
