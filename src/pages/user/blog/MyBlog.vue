<template>
  <div class="mr-5">
    <ButtonBackUser title="My Blog" :hide-back="true" />
    <div v-if="listBlog.length == 0">
      <div class="mt-2 text-left">No courses yet</div>
      <div class="mt-2 justify-start flex gap-1">
        You can write
        <div
          @click="handleGoToCreateBlog"
          class="text-green-500 hover:underline cursor-pointer"
        >
          new articles
        </div>
        or
        <div
          @click="handleGoToListBlog"
          class="text-green-500 hover:underline cursor-pointer"
        >
          read other articles
        </div>
      </div>
    </div>
    <ListBlog
      v-else
      :data="listBlog"
      :avatar="true"
      :image="true"
      :react="true"
      @changePath="goToDetail"
      @showComment="handleShowComment"
    />
    <div v-if="listBlog.length != 0" class="mt-5 flex justify-center">
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
  <!-- comment -->
  <div class="comment fixed bg-white" :class="{ 'menu-visible': showComment }">
    Nội dung của comment
  </div>
  <div
    class="overlay fixed"
    :class="{ 'overlay-visible': showComment }"
    @click="handleCloseComment"
  />
</template>
<script>
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import { AVATAR, TITLE } from '../../../constants/image';
export default {
  name: 'MyBlog',
  components: { ButtonBackUser, ListBlog },
  created() {
    this.AVATAR = AVATAR;
  },
  data() {
    return {
      showComment: false,
      listBlog: [
        {
          id: 1,
          author: 'Chi Bao',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 0,
          numComment: 2,
          title: 'Effective Methods for Improving English Language Skills.',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill. When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 2,
          author: 'Ngoc Huan',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 1,
          numComment: 2,
          title: 'Hello',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
        {
          id: 3,
          author: 'Bao Huan',
          avatar: AVATAR,
          imageTitle: TITLE,
          numReact: 1,
          numComment: 2,
          title:
            'Effective Methods for Improving English Language Skills.adbjabskbdk',
          content:
            "When we think about improving a language, we usually come up with four types of skills we need, which are speaking, listening, reading and writing skills. Let's look at methods to improve each skill.",
        },
      ],
    };
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
    goToDetail(dataID) {
      // this.$router.push({ name: 'DetailBlogPending', params: { id: dataID } });
      console.log(dataID);
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    handleGoToCreateBlog() {
      this.$router.push({ name: 'CreateBlog' });
    },
    handleGoToListBlog() {
      this.$router.push({ name: 'MemberListBlog' });
    },
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

.input-type-course {
  width: calc(100% - 128px);
}

.item-course {
  width: 20rem;
  @media screen and (max-width: 725px) {
    width: 98%;
    margin: 0 auto;
  }
}
</style>
