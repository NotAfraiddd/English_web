<template>
  <div>
    <div
      class="comment fixed bg-white"
      :class="{ 'menu-visible': showComment }"
    >
      Nội dung của comment
    </div>
    <div
      class="overlay fixed"
      :class="{ 'overlay-visible': showComment }"
      @click="handleCloseComment"
    />
    <GroupBack title="Course" @back="changeBack" />
    <BaseSearch :search="inputSearch" @update="updateValue" />
    <ListBlog
      :data="listBlog"
      :icon="true"
      :react="true"
      @show-comment="handleShowComment"
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
import BaseSearch from '../../../components/common/BaseSearch.vue';
import GroupBack from '../../../components/common/GroupBack.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import { NOTIFY } from '../../../constants';
import { AVATAR, TITLE } from '../../../constants/image';
BaseSearch;
export default {
  name: 'Course',
  components: { BaseSearch, ListBlog, GroupBack },
  created() {
    this.TITLE = TITLE;
    this.AVATAR = AVATAR;
    this.NOTIFY = NOTIFY;
  },

  methods: {
    handleShowComment(data) {
      if (data.status) {
        this.showComment = true;
      }
    },
    handleCloseComment() {
      this.showComment = false;
    },
    updateValue(data) {
      this.inputSearch = data;
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    changeBack() {
      this.$router.push(`/admin`);
    },
  },
  data() {
    return {
      inputSearch: '',
      showComment: false,
      current: 6,
      pageSize: 3,
      listBlog: [
        {
          id: 1,
          author: 'Chi Bao',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 12,
          numComment: 12,
          title: 'Effective Methods for Improving English Language Skills.',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 2,
          author: 'Ngoc Huan',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 0,
          numComment: 12,
          title: 'Hello',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 3,
          author: 'Bao Huan',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 0,
          numComment: 0,
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

///comement
.overlay {
  background-color: rgb(170 170 170 / 40%);
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  z-index: 1111;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, left 0.5s ease-in-out;
}

.overlay-visible {
  opacity: 1;
  left: 0;
}

.comment {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  width: 524px;
  height: 100vh;
  right: -512px;
  top: 0;
  z-index: 9997;
}

.menu-visible {
  transform: translateX(0);
  right: 0;
}
</style>
