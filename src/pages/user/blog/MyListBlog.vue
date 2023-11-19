<template>
  <div class="mr-5">
    <ButtonBackUser title="Blog" :hide-back="true" />
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
        :total="500"
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
              <MenuOption :id-prop="item.id" />
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
                    <div
                      @click="
                        handleClickReactReply(item.replyComments, i, i.id)
                      "
                    >
                      <img
                        :src="
                          checkListReactReplyComment[i.id]
                            ? HEART
                            : HEART_DEFAULT
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
import { v4 as uuidv4 } from 'uuid';
import { SOCKET } from '../../../constants';
import { mapMutations } from 'vuex';

export default {
  name: 'MemberListBlog',
  components: { ButtonBackUser, ListBlog, MenuOption },
  created() {
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.ICON_LAUGH = ICON_LAUGH;
  },
  watch: {
    showComment(newValue) {
      document.body.style.overflow = newValue ? 'hidden' : 'unset';
    },
  },
  data() {
    return {
      checkReact: [],
      checkListReactComment: [],
      checkListReactReplyComment: [],
      numNotify: 0,
      showComment: false,
      idUserBlog: null,
      idCommentFirst: null,
      senderName: '',
      receiverName: '',
      userLogin: 3,
      userNameLogin: 'Khang',
      contentChat: '',
      showAllComment: [],
      replyComments: [],
      listComment: [
        {
          id: uuidv4(),
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
      listBlog: [
        {
          id: 1,
          author: 'Chi Bao',
          date: '16/09/2023 10:23',
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
          date: '16/09/2023 10:23',
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
          date: '16/09/2023 10:23',
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
  mounted() {
    // listeing socket
    this.sockets.subscribe('signal', (data) => {
      if (data.kind == SOCKET.COMMENT) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.COMMENT,
        });
      }
    });
    const data = {
      room: +this.idUserBlog,
      kind: SOCKET.COMMENT,
    };
    this.$socket.emit('joinRoom', data);
    // ------------------ reply comment ------------------
    this.sockets.subscribe('reply', (data) => {
      if (data.kind == SOCKET.REPLY_COMMENT) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REPLY_COMMENT,
        });
      }
    });
    const dataReply = {
      room: +this.idUserBlog + `REPLY`,
      kind: SOCKET.REPLY_COMMENT,
    };
    this.$socket.emit('joinRoom', dataReply);
    // ------------------ react ------------------
    this.sockets.subscribe('react', (data) => {
      if (data.kind == SOCKET.REACT) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT,
        });
      }
    });
    const dataReact = {
      room: +this.idUserBlog,
      kind: SOCKET.REACT,
    };
    this.$socket.emit('joinRoom', dataReact);
    // ------------------ react comment ------------------
    this.sockets.subscribe('reactComment', (data) => {
      if (data.kind == SOCKET.REACT_COMMENT) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT_COMMENT,
        });
      }
    });
    const dataReactComment = {
      room: +this.idUserBlog,
      kind: SOCKET.REACT_COMMENT,
    };
    this.$socket.emit('joinRoom', dataReactComment);
    // ------------------ react reply comment ------------------
    this.sockets.subscribe('reactCommentReply', (data) => {
      if (data.kind == SOCKET.REACT_COMMENT_REPLY) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REACT_COMMENT_REPLY,
        });
      }
    });
    const dataReactCommentReply = {
      room: +this.idUserBlog,
      kind: SOCKET.REACT_COMMENT_REPLY,
    };
    this.$socket.emit('joinRoom', dataReactCommentReply);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
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
    clickReact(data) {
      const isDuplicate = this.listBlog.some((p) => p.index === data.index);
      // join socket react
      const dataSocket = {
        room: +this.idUserBlog,
        kind: SOCKET.REACT,
      };
      this.$socket.emit('joinRoom', dataSocket);
      // per user will be able to click once
      if (!isDuplicate) {
        let content = {
          react: data.numReact,
          name: this.userNameLogin,
          avatar: AVATAR,
        };
        const react = {
          data: content,
          kind: SOCKET.REACT,
        };
        this.checkReact[data.index] = true;
        this.$socket.emit('sendSignal', react);
      }
    },

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
        room: +this.idUserBlog,
        kind: SOCKET.REACT_COMMENT_REPLY,
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
    sendChat(data) {
      //
      const chatContent = this.$refs.chatContent;
      if (data) {
        if (this.receiverName) {
          // join socket
          const dataSocket = {
            room: +this.idUserBlog + `REPLY`,
            kind: SOCKET.REPLY_COMMENT,
          };
          this.$socket.emit('joinRoom', dataSocket);
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
          const comment = {
            data: commentDetail,
            kind: SOCKET.REPLY_COMMENT,
          };
          this.$socket.emit('sendSignal', comment);
          this.replyComments.push(commentDetail);
          console.log(this.replyComments);
        } else {
          const dataSocket = {
            room: +this.idUserBlog,
            kind: SOCKET.COMMENT,
          };
          this.$socket.emit('joinRoom', dataSocket);
          const commentDetail = {
            id: uuidv4(),
            userID: this.userLogin,
            name: this.userNameLogin,
            avatar: AVATAR,
            nameReply: this.receiverName,
            content: this.contentChat,
            numReact: 0,
            numComment: 0,
            replyComments: [],
            created_at: moment().format('DD/MM/YYYY HH:mm'),
          };
          const comment = {
            data: commentDetail,
            kind: SOCKET.COMMENT,
          };
          this.$socket.emit('sendSignal', comment);
          this.listComment.unshift(commentDetail);
          // this.listComment.push(commentDetail);
          // this.listComment.reverse();
          this.comment++;
        }
        this.receiverName = '';
        this.contentChat = '';
        chatContent.style.paddingLeft = `0px`;
      }
    },
    handleShowComment(data) {
      this.idUserBlog = data.data.id;
      if (data.status) {
        this.showComment = true;
      }
    },
    handleCloseComment() {
      this.showComment = false;
    },
    goToDetail(dataID) {
      this.$router.push({ name: 'DetailBlog', params: { id: dataID } });
    },
  },
};
</script>

<style lang="scss">
@import './Blog.scss';
</style>
