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
  <div>
    <div
      class="comment fixed bg-white pt-5 text-primary_black pl-5"
      :class="{ 'menu-visible': showComment }"
    >
      <div class="text-xl font-semibold text-left">12 Comments</div>
      <div class="text-sm text-left">( Report spam or bad content )</div>
      <!-- chat -->
      <div class="mt-5 flex">
        <figure class="w-9 h-9 m-0">
          <img :src="AVATAR" alt="" srcset="" class="rounded-full" />
        </figure>
        <div class="emoji-panel mx-2 mt-1 cursor-pointer">
          <div id="emoji-picker">
            <img :src="ICON_LAUGH" alt="" srcset="" />
          </div>
        </div>
        <div class="c-chat__emoji"><Emoji /></div>
        <textarea
          class="c-chat__input-chat text-base w-full mr-2 px-3 border-b flex items-center"
          spellcheck="false"
          placeholder="Enter something..."
          ref="chatContent"
          v-model="contentChat"
          @keydown.enter.shift.ctrl.exact.prevent="dropLine"
          @keydown.enter.exact.prevent="handleSendChat"
          :data-receiver-name="receiverName"
        />
      </div>
      <div v-for="(item, index) in listComment" :key="index" class="mr-3">
        <!-- comment first -->
        <div class="flex mt-6">
          <img :src="AVATAR" alt="" srcset="" class="rounded-full w-9 h-9" />
          <div
            class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 w-full"
          >
            <div class="font-semibold">{{ item.name }}</div>
            <div class="text-left">{{ item.content }}</div>
            <div class="flex w-24 justify-between flex-wrap gap-2">
              <div class="flex justify-center items-center cursor-pointer">
                <div @click="handleClickReact(item)">
                  <img
                    :src="item.numReact > 0 ? HEART : HEART_DEFAULT"
                    alt=""
                    srcset=""
                    class="w-5 h-4"
                  />
                </div>
                <div class="h-5 w-5 leading-5 text-primary_black">
                  {{ item.numReact }}
                </div>
              </div>
              <div
                class="flex justify-center items-center cursor-pointer"
                @click="replyComment(item)"
              >
                <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
                <div class="h-5 w-5 leading-5 text-primary_black">
                  {{ item.numComment }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- reply comment -->
        <div
          class="flex mt-6 ml-12"
          v-for="i in item.replyComments"
          :key="i.id"
        >
          <img :src="AVATAR" alt="" srcset="" class="rounded-full w-9 h-9" />
          <div
            class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 w-full"
          >
            <div class="font-semibold">{{ i.name }}</div>
            <div class="text-left">{{ i.content }}</div>
            <div class="flex gap-4 justify-between flex-wrap">
              <div class="flex justify-center items-center cursor-pointer">
                <div @click="handleClickReactReply(i)">
                  <img
                    :src="i.numReact > 0 ? HEART : HEART_DEFAULT"
                    alt=""
                    srcset=""
                    class="w-5 h-4"
                  />
                </div>
                <div class="h-5 w-5 leading-5 text-primary_black">
                  {{ i.numReact }}
                </div>
              </div>
              <div
                class="flex justify-center items-center cursor-pointer"
                @click="replyCommentReply(i)"
              >
                <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overlay fixed"
      :class="{ 'overlay-visible': showComment }"
      @click="handleCloseComment"
    />
  </div>
</template>
<script>
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import ListBlog from '../../../components/common/ListBlog.vue';
import {
  AVATAR,
  TITLE,
  ICON_LAUGH,
  CHAT,
  HEART,
  HEART_DEFAULT,
} from '../../../constants/image';
import Emoji from './Emoji.vue';
export default {
  name: 'MyBlog',
  components: { ButtonBackUser, ListBlog, Emoji },
  created() {
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.ICON_LAUGH = ICON_LAUGH;
    this.AVATAR = AVATAR;
  },
  watch: {
    receiverName(newReceiverName) {
      const textarea = this.$refs.chatContent;
      textarea.setAttribute('data-receiver-name', newReceiverName);
    },
  },
  data() {
    return {
      showComment: false,
      idFirst: null,
      idReply: null,
      senderName: '',
      receiverName: '',
      userLogin: 10,
      contentChat: '',
      listComment: [
        {
          id: 1,
          userID: 1,
          name: 'Chi Bao',
          avatar: AVATAR,
          content:
            ' Great !!! Your post is good. I will try something like you wrote',
          numReact: 1,
          numComment: 2,
          replyComments: [
            {
              id: 1,
              userID: 2,
              name: 'Ngoc Huan',
              avatar: AVATAR,
              content: ' Sure 😕',
              numReact: 10,
            },
            {
              id: 2,
              userID: 1,
              name: 'Chi Bao',
              avatar: AVATAR,
              content: 'Great !!!',
              numReact: 0,
            },
          ],
        },
      ],
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
    handleClickReact(data) {
      data.numReact += 1;
      console.log('handleClickReact');
    },
    replyComment(data) {
      this.idReply = data.userID;
      if (this.userLogin != this.idFirst) {
        this.receiverName = data.name;
        // this.contentChat = this.receiverName + ' ' + this.contentChat;
        console.log('replyComment', data);
      }
    },

    handleClickReactReply(data) {
      data.numReact += 1;
      console.log('handleClickReact');
    },
    replyCommentReply(data) {
      this.idReply = data.userID;
      console.log(this.idFirst, this.idReply);
      console.log('data reply', data);
    },
    /** * Line up in chat input */
    dropLine() {
      this.$refs.chatContent.value += '\n';
    },
    handleSendChat(e) {
      !e.isComposing && this.sendChat(e.target.value);
    },
    sendChat(data) {
      console.log(data);
    },
    handleShowComment(data) {
      this.idFirst = data.data.id;
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
@import './Blog.scss';
</style>
