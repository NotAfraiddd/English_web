<template>
  <div class="mr-5">
    <ButtonBackUser
      title="Detail Blog"
      @back="changeBack"
      extend-class="mb-5"
      :hide-back="true"
    />
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <img
          :src="detailBlog.avatar"
          alt=""
          srcset=""
          class="h-10 w-10 rounded-full object-cover"
        />
        <div class="flex flex-col items-start">
          <div class="font-semibold text-base">{{ detailBlog.name }}</div>
          <div class="text-xs">Date: {{ detailBlog.created_at }}</div>
        </div>
        <div
          class="text-base text-red-500 mt-auto"
          v-if="detailBlog.status == 'DELETED'"
        >
          ( Reject )
        </div>
        <div
          class="text-base text-yellow-500 mt-auto"
          v-if="detailBlog.status == 'PENDING'"
        >
          ( Pending )
        </div>
      </div>
      <div
        @click="handlUpdateBlog"
        class="my-auto text-yellow-400 cursor-pointer hover:underline"
      >
        Edit
      </div>
    </div>

    <div class="mt-4 text-left text-xl font-semibold">
      {{ detailBlog.title }}
    </div>
    <div class="mt-5 text-left" v-html="detailBlog.content" />
    <!-- react -->
    <div
      v-if="detailBlog.status == 'APPROVED'"
      class="flex w-24 justify-between flex-wrap gap-2 mt-5"
    >
      <div class="flex justify-center items-center cursor-pointer">
        <div @click="clickReact">
          <img
            :src="checkReact || checkUserReact ? HEART : HEART_DEFAULT"
            alt=""
            srcset=""
            class="w-5 h-4"
          />
        </div>
        <div class="h-5 w-5 leading-5 text-primary_black">{{ react }}</div>
      </div>
      <div
        class="flex justify-center items-center cursor-pointer"
        @click="handleShowComment"
      >
        <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
        <div class="h-5 w-5 leading-5 text-primary_black">{{ comment }}</div>
      </div>
    </div>
    <div class="border border-primary my-4" />
    <div class="text-lg font-semibold text-left">Other related blogs</div>
    <div class="grid grid-cols-5 detail-blog-grid gap-4 mr-4">
      <div
        v-for="item in listOtherBlog"
        :key="item.id"
        class="flex flex-col detail-blog-item cursor-pointer hover:opacity-90"
      >
        <div
          class="profile-background mt-5 hover:opacity-50"
          :style="{ backgroundImage: 'url(' + item.background + ')' }"
        />
        <div class="font-semibold my-3 item-title">{{ item.title }}</div>
        <div class="flex">
          <img :src="item.avatar" alt="" class="w-5 h-5 rounded-full" />
          <div class="ml-3 flex justify-between items-center gap-2">
            <div class="text-sm font-semibold">{{ item.name }}</div>
            ·
            <div class="text-sm text-primary_grey_time">
              {{ updateCurrentTime(item.created_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- comment -->
  <div
    class="comment fixed bg-white pt-5 text-primary_black pl-5 overflow-y-auto"
    :class="{ 'menu-visible': showComment }"
  >
    <div class="text-xl font-semibold text-left">{{ comment }} Comments</div>
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
    <div v-for="(item, index) in listComment" :key="item.id" class="mr-3">
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
            <MenuOption :id-prop="item.id" @report="handleReportFirst(item)" />
          </div>
        </div>
      </div>
      <!-- reply comment -->
      <div
        @click="handleShowAllComment(index)"
        v-if="
          !showAllComment[index] &&
          item.replyComments &&
          item.replyComments.length >= 1
        "
        class="text-left ml-14 text-primary cursor-pointer"
      >
        Show {{ item.replyComments.length }} comments
      </div>
      <!-- Collapse comment -->
      <div
        v-if="
          showAllComment[index] &&
          item.replyComments &&
          item.replyComments.length >= 1
        "
        @click="handleCloseAllComment(index)"
        class="text-left ml-14 text-primary cursor-pointer"
      >
        Collapse {{ item.replyComments.length }} comments
      </div>
      <div v-if="showAllComment[index] && item.replyComments">
        <div
          class="flex mt-2 ml-12"
          v-for="(i, ind) in item.replyComments"
          :key="ind"
        >
          <img :src="AVATAR" alt="" srcset="" class="rounded-full w-9 h-9" />
          <div class="flex flex-col w-full relative">
            <div
              class="flex flex-col items-start ml-5 bg-primary_comment rounded-xl px-5 py-3 comment-first-2 mb-1"
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
                  <div
                    @click="handleClickReactReply(item.replyComments, i, i.id)"
                  >
                    <img
                      :src="
                        checkListReactReplyComment[i.id] ? HEART : HEART_DEFAULT
                      "
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
              <MenuOption :id-prop="i.id" @report="handleReportSecond(i)" />
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
</template>
<script>
import {
  AVATAR,
  TITLE,
  HEART,
  HEART_DEFAULT,
  ICON_LAUGH,
  CHAT,
  LISTENING,
  GROUP_STUDENT_1,
  GROUP_STUDENT_2,
  GROUP_STUDENT_3,
  GROUP_STUDENT_4,
} from '../../../constants/image';
import Emoji from './Emoji.vue';
import moment from 'moment';
import MenuOption from '../../../components/common/MenuOption.vue';
import { mapMutations } from 'vuex';
import { SOCKET } from '../../../constants';
import blogApi from '../../../apis/blog';
import { v4 as uuidv4 } from 'uuid';
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
export default {
  name: 'DetailBlog',
  components: { Emoji, MenuOption, ButtonBackUser },
  created() {
    this.GROUP_STUDENT_1 = GROUP_STUDENT_1;
    this.GROUP_STUDENT_2 = GROUP_STUDENT_2;
    this.GROUP_STUDENT_3 = GROUP_STUDENT_3;
    this.GROUP_STUDENT_4 = GROUP_STUDENT_4;
    this.ICON_LAUGH = ICON_LAUGH;
    this.LISTENING = LISTENING;
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
    this.idUserBlog = this.$route.params.username;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idBlog = +this.$route.params.id;
    this.getDetailBlogByID(this.idBlog);
  },
  watch: {
    showComment(newValue) {
      document.body.style.overflow = newValue ? 'hidden' : 'unset';
    },
  },
  data() {
    return {
      idLike: null,
      listReacts: [],
      checkUserReact: false,
      current: 1,
      idBlog: null,
      userInfor: null,
      detailBlog: {
        avatar: null,
        name: null,
        content: null,
        created_at: null,
        thumbnailURL: null,
        title: null,
        status: null,
      },
      checkReact: false,
      checkListReactComment: [],
      checkListReactReplyComment: [],
      idUserShowComment: 0,
      delayMinutes: null,
      showComment: false,
      idUserBlog: null,
      idCommentFirst: null,
      react: 0,
      comment: 0,
      contentChat: '',
      idReply: null,
      senderName: '',
      receiverName: '',
      userLogin: 3,
      userNameLogin: 'Khang',
      showAllComment: [],
      replyComments: [],
      listComment: [],

      listBlog: [],
      listOtherBlog: [
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Chi Bao',
          background: LISTENING,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-07 16:10:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Chi Bao',
          background: GROUP_STUDENT_1,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-07 15:19:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Chi Bao',
          background: GROUP_STUDENT_2,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-07 01:13:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Chi Huan',
          background: GROUP_STUDENT_3,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-02 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Ngoc Bao',
          background: GROUP_STUDENT_4,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-03 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Ngoc Huan',
          background: GROUP_STUDENT_1,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-04 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Huan Huan',
          background: LISTENING,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-05 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Trong Dat',
          background: GROUP_STUDENT_2,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-06 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Tao Thao',
          background: LISTENING,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-07 01:08:00',
        },
        {
          id: uuidv4(),
          avatar: AVATAR,
          name: 'Huan Huan',
          background: GROUP_STUDENT_3,
          title: 'Effective Methods for Improving English Language Skills.',
          created_at: '2023-11-02 01:08:00',
        },
      ],
      numNotify: 0,
    };
  },
  mounted() {
    // set render history time
    this.updateCurrentTime();
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    async getCommentByIDBlog() {
      try {
        const data = await blogApi.getComment({
          post: {
            id: this.idBlog,
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
    async handleComment() {
      await blogApi.comment({
        commentContent: this.contentChat,
        post: {
          id: this.idBlog,
        },
        postedUser: {
          uid: this.userInfor.email,
        },
      });
    },

    async handleReplyComment() {
      await blogApi.replyComment({
        content: this.contentChat,
        mention: {
          uid: this.idReply,
        },
        comment: { id: this.idCommentFirst },
        replyUser: {
          uid: this.userInfor.email,
        },
      });
    },
    handlUpdateBlog() {
      this.$router.push({
        name: 'UpdateBlog',
        params: { username: this.idUserBlog, id: this.idBlog },
      });
    },
    changeBack() {
      this.$router.push({ name: 'MyBlog' });
    },
    async getDetailBlogByID(dataID) {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getDetailBlog({ id: dataID });
        this.detailBlog.avatar = data?.author?.avtURL;
        this.detailBlog.name = data?.author?.fullName;
        this.detailBlog.content = data?.content;
        this.detailBlog.created_at = moment(data?.createDate).format(
          'DD/MM/YYYY HH:mm',
        );
        this.detailBlog.thumbnailURL = data?.thumbnailURL;
        this.detailBlog.title = data?.title;
        this.detailBlog.status = data?.postStatus;
        data.likes.forEach((ele) => {
          if (ele.likedUser.email == this.userInfor.email) {
            this.checkUserReact = true;
          }
        });
        this.listReacts = data?.likes;
        this.comment = data?.commentList.length;
        this.react = data?.likes.length;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    handleReportFirst(data) {
      console.log(data);
    },
    handleReportSecond(data) {
      console.log(data);
    },
    /**
     * set time to show history time of blog
     */
    updateCurrentTime(data) {
      const currentTime = moment();
      const inputTimeMoment = moment(data, 'YYYY-MM-DD HH:mm:ss');
      const delayInSeconds = currentTime.diff(inputTimeMoment, 'seconds');
      let timeSeconds = delayInSeconds;
      if (timeSeconds < 60) return timeSeconds + ` seconds ago`;
      else if (timeSeconds < 60 * 60 && timeSeconds >= 60) {
        if (timeSeconds < 60 * 2)
          return Math.floor(timeSeconds / 60) + ` min ago`;
        else return Math.floor(timeSeconds / 60) + ` mins ago`;
      } else if (timeSeconds < 60 * 60 * 24 && timeSeconds >= 60 * 60) {
        if (timeSeconds < 60 * 60 * 2)
          return Math.floor(timeSeconds / 3600) + ` hour ago`;
        else return Math.floor(timeSeconds / 3600) + ` hours ago`;
      } else if (timeSeconds < 86400 * 24 && timeSeconds >= 86400) {
        if (timeSeconds < 86400 * 2)
          return Math.floor(timeSeconds / 86400) + ` day ago`;
        else if (86400 * 2 <= timeSeconds && timeSeconds <= 86400 * 8) {
          return Math.floor(timeSeconds / 86400) + ` days ago`;
        } else return inputTimeMoment.format('YYYY-MM-DD');
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
    /**
     * handle click react
     */
    clickReact() {
      // join socket react
      const dataSocket = {
        room: this.idUserBlog,
        kind: SOCKET.REACT,
      };
      this.$socket.emit('joinRoom', dataSocket);
      const checkLike = this.listReacts.find(
        (item) => this.userInfor.email == item?.likedUser.email,
      );
      if (checkLike) {
        this.handleUnReactBlog(this.idBlog, checkLike.id || this.idLike);
      } else {
        this.handleReactBlog(this.idBlog);
      }
      // per user will be able to click once
      let content = {
        id: this.userInfor.email,
        react: this.checkUserReact,
        name: this.userInfor.fullName,
        avatar: this.userInfor.avtURL,
        admin: this.userInfor.role == 'ADMIN' ? true : false,
      };
      const react = {
        data: content,
        kind: SOCKET.REACT,
      };
      this.$socket.emit('sendSignal', react);
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
        this.idLike = data.id;
        this.checkUserReact = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.getDetailBlogByID(idBlog);
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
        this.checkUserReact = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.getDetailBlogByID(idBlog);
      }
    },
    /**
     * handle click react
     */
    handleClickReact(arr, data, id) {
      const isDuplicate = arr.some((p) => p.id == id);
      const dataSocket = {
        room: +this.idUserBlog,
        kind: SOCKET.REACT_COMMENT,
      };
      this.$socket.emit('joinRoom', dataSocket);
      if (isDuplicate) {
        data.numReact++;
        let content = {
          react: data.numReact,
          name: this.userNameLogin,
          avatar: AVATAR,
        };
        const react = {
          data: content,
          kind: SOCKET.REACT_COMMENT,
        };
        this.checkListReactComment[id] = true;
        this.$socket.emit('sendSignal', react);
      }
    },
    /**
     * handle click react of reply comment
     */
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
    /**
     * check index to return true or false
     * @param {*} arr
     * @param {*} position
     */
    checkPositionReact(arr, position) {
      return arr.some(
        (p) => p.index === position.index && p.subIndex === position.subIndex,
      );
    },
    /**
     * logic delete when user reply
     */
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
    /**
     * set padding left
     */
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
    replyComment(data, secondComment) {
      console.log(data);
      this.idCommentFirst = data?.id;
      this.idReply = data?.userID;
      this.replyComments = secondComment;
      this.receiverName = data.name;
      if (this.receiverName) {
        this.$nextTick(() => {
          this.setPaddingLeft();
        });
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
    dropLine() {
      this.$refs.chatContent.value += '\n';
    },
    handleSendChat(e) {
      !e.isComposing && this.sendChat(e.target.value);
    },
    sendChat(data) {
      //
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
          this.handleReplyComment();
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
          this.comment++;
          this.handleComment();
        }
        this.receiverName = '';
        this.contentChat = '';
        chatContent.style.paddingLeft = `0px`;
      }
    },
    handleShowComment() {
      this.showComment = true;
      this.getCommentByIDBlog();
    },
    handleCloseComment() {
      this.showComment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Blog.scss';
</style>
