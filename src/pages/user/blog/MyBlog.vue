<template>
  <div class="mr-5">
    <div class="flex justify-between">
      <ButtonBackUser title="My Blog" :hide-back="true" @back="goToHome" />
      <select
        v-model="selectedStatus"
        class="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose type of blog</option>
        <option value="approved">Approved</option>
        <option value="rejected">Reject</option>
        <option value="pending">Pending</option>
      </select>
    </div>
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
      :user="true"
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
        :total="total"
        @change="onShowSizeChange"
      />
    </div>
  </div>
  <!-- comment -->
  <div>
    <div
      class="comment fixed bg-white pt-5 text-primary_black pl-5 overflow-y-auto"
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
          class="c-chat__input-chat text-base w-full mr-2 pr-3 border-b flex items-center relative"
          spellcheck="false"
          placeholder="Enter something..."
          ref="chatContent"
          v-model="contentChat"
          @keydown.enter.shift.ctrl.exact.prevent="dropLine"
          @keydown.enter.exact.prevent="handleSendChat"
          @keydown.delete="handleDeleteKey"
        />
        <div
          ref="receiverNameElement"
          class="absolute left-24 text-primary c-chat__input-name"
        >
          {{ receiverName }}
        </div>
      </div>
      <div v-for="(item, index) in listComment" :key="index" class="mr-3">
        <!-- comment first -->
        <div class="flex mt-2">
          <img :src="AVATAR" alt="" srcset="" class="rounded-full w-9 h-9" />
          <div class="flex flex-col w-full relative">
            <div
              class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 comment-first relative"
            >
              <div class="font-semibold">{{ item.name }}</div>
              <div class="text-left mb-1">{{ item.content }}</div>
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
            <div class="flex justify-between relative">
              <div class="text-sm text-left ml-5 mt-1">
                {{ item.created_at }}
              </div>
              <!-- menu option -->
              <MenuOption :id-prop="item.id" />
            </div>
          </div>
        </div>
        <!-- reply comment -->
        <div
          @click="handleShowAllComment"
          v-if="!showAllComment && item.replyComments"
          class="text-left ml-14 text-primary cursor-pointer"
        >
          Show {{ item.replyComments.length }} comments
        </div>
        <div
          v-if="showAllComment && item.replyComments"
          @click="handleShowAllComment"
          class="text-left ml-14 text-primary cursor-pointer"
        >
          Collapse {{ item.replyComments.length }} comments
        </div>
        <div v-if="showAllComment && item.replyComments">
          <div
            class="flex mt-2 ml-12"
            v-for="(i, ind) in item.replyComments"
            :key="ind"
          >
            <img :src="AVATAR" alt="" srcset="" class="rounded-full w-9 h-9" />
            <div class="flex flex-col w-full relative">
              <div
                class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 comment-first-2"
              >
                <div class="font-semibold">{{ i.name }}</div>
                <div class="text-left mb-1">
                  <b v-if="i.nameReply" class="text-primary">
                    {{ i.nameReply }}
                  </b>
                  {{ i.content }}
                </div>
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
                    @click="replyCommentReply(i, item.replyComments)"
                  >
                    <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
                    <div class="h-5 w-5 leading-5 text-primary_black">
                      {{ i.numComment }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="text-sm text-left ml-7 mt-1">
                  {{ i.created_at }}
                </div>
                <!-- menu option -->
                <MenuOption :id-prop="i.id" />
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
import blogApi from '../../../apis/blog';
import {
  AVATAR,
  TITLE,
  ICON_LAUGH,
  CHAT,
  HEART,
  HEART_DEFAULT,
} from '../../../constants/image';
import Emoji from './Emoji.vue';
import moment from 'moment';

export default {
  name: 'MyBlog',
  components: { ButtonBackUser, ListBlog, Emoji },
  created() {
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.ICON_LAUGH = ICON_LAUGH;
    this.AVATAR = AVATAR;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    if (this.userInfor) {
      this.getAllPost();
    }
  },
  watch: {
    showComment(newValue) {
      document.body.style.overflow = newValue ? 'hidden' : 'unset';
    },
  },
  data() {
    return {
      selectedStatus: '',
      userInfor: null,
      showComment: false,
      idUserBlog: null,
      idCommentFirst: null,
      senderName: '',
      receiverName: '',
      userLogin: 3,
      userNameLogin: 'Khang',
      showAllComment: false,
      contentChat: '',
      replyComments: [],
      current: 1,
      pageSize: 0,
      total: 0,
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
          created_at: '20/03/2023 10:43',
          replyComments: [
            {
              id: 1,
              userID: 2,
              name: 'Ngoc Huan',
              avatar: AVATAR,
              content: ' Sure !!!!!!!!!! 😕',
              nameReply: '',
              numReact: 10,
              numComment: 2,
              created_at: '20/03/2023 12:43',
            },
            {
              id: 2,
              userID: 1,
              name: 'Chi Bao',
              avatar: AVATAR,
              content: 'Great !!!',
              nameReply: '',
              numReact: 0,
              numComment: 2,
              created_at: '20/03/2023 14:43',
            },
          ],
        },
      ],
      listBlog: [],
    };
  },
  methods: {
    /**
     * get all blog
     */
    async getAllPost() {
      try {
        this.listBlog = [];
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getAllPostByAuthor({
          user: {
            uid: this.userInfor.email,
          },
          index: this.current,
        });
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
            status: item?.postStatus,
            numReact: item?.likes.length,
            numComment: item?.commentList.length,
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
    handleShowAllComment() {
      this.showAllComment = !this.showAllComment;
    },
    handleDeleteKey(event) {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (!this.contentChat.trim()) {
          this.receiverName = '';
          const chatContent = this.$refs.chatContent;
          if (chatContent) {
            chatContent.style.paddingLeft = '0px';
          }
        }
      }
    },
    goToHome() {
      this.$router.push({ name: 'HomeUser' });
    },
    setPaddingLeft() {
      const receiverNameElement = this.$refs.receiverNameElement;
      const chatContent = this.$refs.chatContent;
      if (receiverNameElement) {
        if (chatContent) {
          const nameLength = receiverNameElement.offsetWidth;
          chatContent.style.paddingLeft = `${nameLength + 16}px`;
        } else {
          this.receiverName = '';
          chatContent.style.paddingLeft = `0px`;
        }
      }
    },
    handleClickReact(data) {
      data.numReact += 1;
    },
    replyComment(data) {
      this.receiverName = data.name;
      if (this.receiverName) {
        this.$nextTick(() => {
          this.setPaddingLeft();
        });
      }
    },

    handleClickReactReply(data) {
      data.numReact += 1;
    },
    replyCommentReply(data, secondComment) {
      this.replyComments = secondComment;
      this.receiverName = data.name;
      if (this.receiverName) {
        this.$nextTick(() => {
          this.setPaddingLeft();
        });
      }
    },
    /** * Line up in chat input */
    dropLine() {
      this.$refs.chatContent.value += '\n';
    },
    handleSendChat(e) {
      !e.isComposing && this.sendChat(e.target.value);
    },
    sendChat(data) {
      const chatContent = this.$refs.chatContent;
      if (data) {
        if (this.receiverName) {
          const commentDetail = {
            userID: this.userLogin,
            name: this.userNameLogin,
            avatar: AVATAR,
            nameReply: this.receiverName,
            content: this.contentChat,
            numReact: 0,
            numComment: 0,
            created_at: moment().format('DD/MM/YYYY HH:mm'),
          };
          this.replyComments.push(commentDetail);
        } else {
          const commentDetail = {
            userID: this.userLogin,
            name: this.userNameLogin,
            avatar: AVATAR,
            nameReply: this.receiverName,
            content: this.contentChat,
            numReact: 0,
            numComment: 0,
            created_at: moment().format('DD/MM/YYYY HH:mm'),
          };
          this.listComment.push(commentDetail);
          this.listComment.reverse();
        }
        this.receiverName = '';
        this.contentChat = '';
        chatContent.style.paddingLeft = `0px`;
      }
    },
    handleShowComment(data) {
      this.idUserBlog = data.data.id;
      console.log('this.idUserBlog', this.idUserBlog);
      if (data.status) {
        this.showComment = true;
      }
    },
    handleCloseComment() {
      this.showComment = false;
    },
    goToDetail(data) {
      this.$router.push({
        name: 'DetailBlog',
        params: { username: data.userID, id: data.id },
      });
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getAllPost();
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
