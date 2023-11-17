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
        :showSizeChanger="false"
        v-model:page-size="pageSize"
        :total="500"
        @change="onShowSizeChange"
      />
    </div>
  </div>
</template>

<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import { AVATAR, TITLE } from '../../../constants/image';
import { NOTIFY, SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';
export default {
  name: 'BlogPending',
  components: { ButtonBack, ListBlog },
  created() {
    this.TITLE = TITLE;
    this.AVATAR = AVATAR;
    this.NOTIFY = NOTIFY;
  },
  watch: {
    pageSize(value) {},
    current(value) {},
  },
  mounted() {
    // reject blog
    this.sockets.subscribe('rejectBlogPending', (data) => {
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
      room: this.idUserBlog,
      kind: SOCKET.REJECTED_BLOG_PENDING,
    };
    this.$socket.emit('joinRoom', rejectContent);
    // accept blog
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
      room: this.idUserBlog,
      kind: SOCKET.NOTIFY_BLOG_PENDING,
    };
    this.$socket.emit('joinRoom', content);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    handleRejected(data) {
      this.idUserBlog = +data.userID;
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
    },
    handleApproved(data) {
      this.idUserBlog = +data.userID;
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
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    changeBack() {
      this.$router.push({ name: 'Dashboard' });
    },
    goToDetail(dataID) {
      this.$router.push({ name: 'DetailBlogPending', params: { id: dataID } });
    },
  },
  data() {
    return {
      numNotify: 0,
      current: 6,
      pageSize: 3,
      idUserBlog: null,
      listBlog: [
        {
          id: 1,
          author: 'Chi Bao',
          avatar: AVATAR,
          userID: 1,
          imageTitle: TITLE,
          title: 'Effective Methods for Improving English Language Skills.',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill. When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 2,
          author: 'Ngoc Huan',
          avatar: AVATAR,
          userID: 2,
          imageTitle: TITLE,
          title: 'Hello',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 3,
          author: 'Bao Huan',
          avatar: AVATAR,
          userID: 3,
          imageTitle: TITLE,
          title:
            'Effective Methods for Improving English Language Skills.adbjabskbdk',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
      ],
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
