<template>
  <div class="mr-5">
    <div class="flex justify-between">
      <ButtonBackUser title="Blog" :hide-back="true" />
      <select
        v-model="selectedStatus"
        class="bg-gray-50 border w-44 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose type of blog</option>
        <option value="0">Pending</option>
        <option value="1">Approved</option>
        <option value="2">Reject</option>
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
      :user="true"
      :avatar="true"
      :image="true"
      :react="true"
      :check-react="checkReact"
      @click-react="clickReact"
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
      <div class="text-xl font-semibold text-left">
        {{ listComment.length }} Comments
      </div>
      <div class="text-sm text-left">( Report spam or bad content )</div>
      <!-- chat -->
      <div class="mt-5 flex">
        <figure class="w-9 h-9 m-0">
          <Avatar
            :imgUrl="userInfor.avtURL"
            :name="userInfor.fullName || userInfor.email"
            class="w-9 h-9"
          />
        </figure>
        <div class="emoji-panel mx-2 mt-1 cursor-pointer">
          <div id="emoji-picker">
            <img :src="ICON_LAUGH" alt="" srcset="" />
          </div>
        </div>
        <div class="c-chat__emoji z-20"><Emoji /></div>
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
      <div v-for="item in listComment" :key="item.id" class="mr-3">
        <!-- comment first -->
        <div class="flex mt-2">
          <Avatar
            :imgUrl="item.avatar"
            :name="item.name || item.userID"
            class="w-9 h-9"
          />
          <div class="flex flex-col w-full relative">
            <div
              class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 comment-first relative"
            >
              <div class="font-semibold">{{ item.name || item.userID }}</div>
              <div class="text-left mb-1">{{ item.content }}</div>
              <div
                v-if="false"
                class="flex w-24 justify-between flex-wrap gap-2"
              >
                <div class="flex justify-center items-center cursor-pointer">
                  <div @click="handleClickReact(listComment, item, item.id)">
                    <img
                      :src="
                        checkListReactComment[item.id] ? HEART : HEART_DEFAULT
                      "
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
                  @click="replyComment(item, item.replyComments)"
                >
                  <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
                  <div class="h-5 w-5 leading-5 text-primary_black">
                    {{ item.replyComments.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between relative">
              <div class="text-sm text-left ml-5 mt-1">
                {{ item.created_at }}
              </div>
              <!-- menu option -->
              <MenuOption :id-prop="item.id" @report="handleReport(item)" />
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
import MenuOption from '../../../components/common/MenuOption.vue';
import {
  AVATAR,
  TITLE,
  CHAT,
  HEART,
  HEART_DEFAULT,
  ICON_LAUGH,
} from '../../../constants/image';
import moment from 'moment';
import { SOCKET } from '../../../constants';
import { mapMutations } from 'vuex';
import blogApi from '../../../apis/blog';
import Emoji from './Emoji.vue';
import blog from '../../../apis/blog';
import { notification } from 'ant-design-vue';
import Avatar from '../../../components/common/Avatar.vue';
export default {
  name: 'MemberListBlog',
  components: { ButtonBackUser, ListBlog, MenuOption, Emoji, Avatar },
  created() {
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.ICON_LAUGH = ICON_LAUGH;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.getAllPost();
  },
  watch: {
    showComment(newValue) {
      document.body.style.overflow = newValue ? 'hidden' : 'unset';
      this.listComment = [];
    },
    selectedStatus() {
      this.getAllPost();
    },
  },
  data() {
    return {
      isClickComment: false,
      currentComment: 1,
      totalComment: 0,
      IDBlog: null,
      selectedStatus: '',
      total: 0,
      current: 1,
      pageSize: 10,
      idLike: null,
      checkReact: [],
      checkListReactComment: [],
      checkListReactReplyComment: [],
      numNotify: 0,
      showComment: false,
      userInfor: null,
      idUserBlog: null,
      idCommentFirst: null,
      senderName: '',
      receiverName: '',
      userLogin: 3,
      contentChat: '',
      showAllComment: [],
      replyComments: [],
      listComment: [],
      listBlog: [],
    };
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    async handleReport(data) {
      if (data?.userID != this.userInfor.email) {
        await blogApi.reportComment({
          content: data.content,
          comment: {
            id: data.id,
          },
        });
        notification.success({
          message: 'You have just reported successfully',
          placement: 'topLeft',
        });
      } else {
        notification.warning({
          message: 'You cannot report your comment',
          placement: 'topLeft',
        });
      }
    },

    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getAllPost();
    },
    /**
     * get all blog by status
     */
    async getAllPost() {
      try {
        this.checkReact = [];
        this.listBlog = [];
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getAllPostByStatus({
          postStatus: this.selectedStatus ? +this.selectedStatus : null,
          index: this.current,
          pageSize: this.pageSize,
        });
        data?.content.forEach((item, index) => {
          const checkLike = item?.likes.some(
            (ele) => ele?.likedUser?.uid == this.userInfor.email,
          );
          const objectLike = item?.likes.find(
            (ele) => ele?.likedUser?.uid == this.userInfor.email,
          );
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
            like: checkLike ? true : false,
            idLike: objectLike != undefined ? objectLike.id : null,
          });
          if (checkLike) {
            this.checkReact[item?.id] = true;
          }
          this.total = data?.totalElements;
          this.pageSize = data?.size;
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * show all comment
     */
    handleShowAllComment(data) {
      this.showAllComment[data] = !this.showAllComment[data];
    },
    /**
     * show all comment
     */
    handleCloseAllComment(data) {
      this.showAllComment[data] = !this.showAllComment[data];
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
    async handleReactBlog(idBlog) {
      try {
        const data = await blogApi.reactBlog({
          likedUser: {
            uid: this.userInfor.email,
          },
          post: {
            id: idBlog,
          },
        });
        this.idLike = data?.id;
      } catch (error) {
        console.log(error);
      }
    },

    async handleUnReactBlog(idBlog, idLike) {
      try {
        await blogApi.unReactBlog({
          id: this.idLike || idLike,
          likedUser: {
            uid: this.userInfor.email,
          },
          post: {
            id: idBlog,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.getAllPost();
      }
    },

    clickReact(data) {
      if (data.like) this.handleReactBlog(data.data.id);
      else this.handleUnReactBlog(data.data.id, data.data.idLike);
      const isDuplicate = this.listBlog.some((p) => p.index === data.index);

      // join socket react
      const dataSocket = {
        room: data?.data?.userID,
        kind: SOCKET.REACT,
      };
      this.$socket.emit('joinRoom', dataSocket);
      // per user will be able to click once
      if (!isDuplicate) {
        let content = {
          id: data?.data?.userID,
          react: data.like,
          name: this.userInfor.fullName,
          avatar: this.userInfor.avtURL,
          admin: this.userInfor.role == 'ADMIN' ? true : false,
        };
        const react = {
          data: content,
          kind: SOCKET.REACT,
        };
        this.checkReact[data.data.id] = data.like;
        this.$socket.emit('sendSignal', react);
      }
    },

    async handleReactCommentBlog(idCommentBlog) {
      try {
        await blogApi.reactCommentBlog({
          likedUser: {
            uid: this.userInfor.email,
          },
          comment: {
            id: idCommentBlog,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async handleUnReactCommentBlog(idCommentBlog) {
      try {
        await blogApi.reactCommentBlog({
          likedUser: {
            uid: this.userInfor.email,
          },
          comment: {
            id: idCommentBlog,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    handleClickReact(arr, data, id) {
      const isDuplicate = arr.some((p) => p.id == id);
      const dataSocket = {
        room: this.idUserBlog,
        kind: SOCKET.REACT_COMMENT,
      };
      this.$socket.emit('joinRoom', dataSocket);
      if (isDuplicate) {
        if (!this.isClickComment) {
          this.isClickComment = true;
          this.handleReactCommentBlog(id);
          data.numReact++;
          let content = {
            id: this.idUserBlog,
            react: this.isClickComment,
            name: this.userInfor.fullName,
            avatar: this.userInfor.avtURL,
            admin: this.userInfor.role == 'ADMIN' ? true : false,
          };
          const react = {
            data: content,
            kind: SOCKET.REACT_COMMENT,
          };
          this.checkListReactComment[id] = true;
          this.$socket.emit('sendSignal', react);
        } else {
          this.isClickComment = false;
          data.numReact++;
          let content = {
            id: this.idUserBlog,
            react: this.isClickComment,
            name: this.userInfor.fullName,
            avatar: this.userInfor.avtURL,
            admin: this.userInfor.role == 'ADMIN' ? true : false,
          };
          const react = {
            data: content,
            kind: SOCKET.REACT_COMMENT,
          };
          this.checkListReactComment[id] = true;
          this.$socket.emit('sendSignal', react);
        }
      }
    },
    replyComment(data, secondComment) {
      this.replyComments = secondComment;
      this.receiverName = data.name;
      if (this.receiverName) {
        this.$nextTick(() => {
          this.setPaddingLeft();
        });
      }
    },
    handleClickReactReply(arr, data, id) {
      const isDuplicate = arr.some((p) => p.id == id);
      const dataSocket = {
        room: this.idUserBlog,
        kind: SOCKET.REACT_COMMENT_REPLY,
      };
      this.$socket.emit('joinRoom', dataSocket);
      if (isDuplicate) {
        data.numReact++;
        let content = {
          id: this.idUserBlog,
          react: data.numReact,
          name: this.userInfor.fullName,
          avatar: this.userInfor.avtURL,
          admin: this.userInfor.role == 'ADMIN' ? true : false,
        };
        const react = {
          data: content,
          kind: SOCKET.REACT_COMMENT_REPLY,
        };
        this.checkListReactReplyComment[id] = true;
        this.$socket.emit('sendSignal', react);
      }
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
    async handleComment() {
      await blogApi.comment({
        commentContent: this.contentChat,
        post: {
          id: this.IDBlog,
        },
        postedUser: {
          uid: this.userInfor.email,
        },
      });
    },
    async getCommentByIDBlog() {
      try {
        const data = await blogApi.getComment({
          post: {
            id: this.IDBlog,
          },
          index: this.current,
          itemsPerPage: 5,
        });
        data.content.forEach((item) => {
          const replyComments = item?.commentReplies.map((ele) => {
            return {
              id: ele?.id,
              userID: ele?.replyUser?.email,
              name: ele?.replyUser?.fullName,
              content: ele?.content,
              nameReply: ele?.mention?.fullName,
              numReact: 10,
              numComment: 2,
              created_at: moment(ele?.postedTime).format('DD/MM/YYYY HH:mm'),
            };
          });
          this.listComment.push({
            id: item?.id,
            userID: item?.postedUser?.email,
            name: item?.postedUser?.fullName,
            avatar: item?.postedUser?.avtURL,
            content: item?.commentContent,
            numReact: 0,
            numComment: 0,
            created_at: moment(item?.postedTime).format('DD/MM/YYYY HH:mm'),
            replyComments: replyComments,
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    sendChat(data) {
      const unblockDate = moment(this.userInfor.unblockDate);
      const currentDate = moment();
      //
      if (unblockDate.isBefore(currentDate)) {
        const chatContent = this.$refs.chatContent;
        if (data) {
          if (this.receiverName) {
            // join socket
            const dataSocket = {
              room: this.idUserBlog + `REPLY`,
              kind: SOCKET.REPLY_COMMENT,
            };
            this.$socket.emit('joinRoom', dataSocket);
            const commentDetail = {
              id: this.idUserBlog,
              userID: this.userInfor.uid,
              name: this.userInfor.fullName,
              avatar: this.userInfor.avtURL,
              nameReply: this.receiverName,
              content: this.contentChat,
              numReact: 0,
              numComment: 0,
              created_at: moment().format('DD/MM/YYYY HH:mm'),
              admin: this.userInfor.role == 'ADMIN' ? true : false,
            };
            const comment = {
              data: commentDetail,
              kind: SOCKET.REPLY_COMMENT,
            };
            this.$socket.emit('sendSignal', comment);
            this.replyComments.push(commentDetail);
          } else {
            const dataSocket = {
              room: this.idUserBlog,
              kind: SOCKET.COMMENT,
            };
            this.$socket.emit('joinRoom', dataSocket);
            const commentDetail = {
              id: this.idUserBlog,
              userID: this.userInfor.uid,
              name: this.userInfor.fullName,
              avatar: this.userInfor.avtURL,
              nameReply: this.receiverName,
              content: this.contentChat,
              numReact: 0,
              numComment: 0,
              replyComments: [],
              created_at: moment().format('DD/MM/YYYY HH:mm'),
              admin: this.userInfor.role == 'ADMIN' ? true : false,
            };
            const comment = {
              data: commentDetail,
              kind: SOCKET.COMMENT,
            };
            this.$socket.emit('sendSignal', comment);
            this.listComment.unshift(commentDetail);
            this.handleComment();
            this.comment++;
          }
          this.receiverName = '';
          this.contentChat = '';
          chatContent.style.paddingLeft = `0px`;
        }
      } else {
        const dateBlockDate = unblockDate
          .subtract(3, 'days')
          .format('HH:mm DD/MM/YYYY');
        notification.warn({
          placement: 'topLeft',
          message: `You are locked in for 3 days starting from ${dateBlockDate}`,
        });
      }
    },
    handleShowComment(data) {
      this.idUserBlog = data?.data.userID;
      this.IDBlog = data?.data.id;
      if (data.status) {
        this.showComment = true;
        this.getCommentByIDBlog();
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
