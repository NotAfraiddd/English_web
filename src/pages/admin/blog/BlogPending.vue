<template>
  <div class="text-primary_black">
    <GroupBack title="Blog pending" @back="changeBack" />
    <ListBlog :data="listBlog" />
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
import GroupBack from '../../../components/common/GroupBack.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import { ARROW_LEFT, AVATAR, TITLE } from '../../../constants/image';
import { NOTIFY } from '../../../constants/index';
export default {
  name: 'BlogPending',
  components: { GroupBack, ListBlog },
  created() {
    this.TITLE = TITLE;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
  },
  watch: {
    pageSize(value) {
      console.log('value', value);
    },
    current(value) {},
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    changeBack() {
      this.$router.push(`/admin`);
    },
  },
  data() {
    return {
      current: 6,
      pageSize: 3,
      listBlog: [
        {
          id: 1,
          author: 'Chi Bao',
          avatar: AVATAR,
          imageTitle: TITLE,
          title: 'Effective Methods for Improving English Language Skills.',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 2,
          author: 'Ngoc Huan',
          avatar: AVATAR,
          imageTitle: TITLE,
          title: 'Hello',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 3,
          author: 'Bao Huan',
          avatar: AVATAR,
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
    color: #fff;
  }
}
</style>
