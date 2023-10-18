<template>
  <div class="mr-5">
    <div class="flex gap-3 items-center">
      <img :src="AVATAR" alt="" srcset="" class="h-10 w-10 rounded-full" />
      <div class="flex flex-col items-start">
        <div class="font-semibold text-base">Chi Bao</div>
        <div class="text-xs">Date: 20/09/2023 10:26</div>
      </div>
    </div>
    <div class="mt-5 text-left" v-html="content" />
    <!-- react -->
    <div class="flex w-24 justify-between flex-wrap gap-2 mt-5">
      <div class="flex justify-center items-center cursor-pointer">
        <div @click="handleClickReact">
          <img
            :src="react > 0 ? HEART : HEART_DEFAULT"
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
    <div class="grid grid-cols-5 detail-blog-grid">
      <div
        v-for="(item, index) in 8"
        :key="index"
        class="flex flex-col 2xl:w-80 detail-blog-item cursor-pointer hover:opacity-90"
      >
        <div
          class="profile-background mt-5 hover:opacity-50"
          :style="{ backgroundImage: 'url(' + LISTENING + ')' }"
        />
        <div class="font-semibold">
          Effective Methods for Improving English Language Skills.
        </div>
      </div>
    </div>
  </div>
  <!-- comment -->
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
} from '../../../constants/image';
import Emoji from './Emoji.vue';
import moment from 'moment';
import MenuOption from '../../../components/common/MenuOption.vue';

export default {
  name: 'DetailBlog',
  components: { Emoji, MenuOption },
  created() {
    this.ICON_LAUGH = ICON_LAUGH;
    this.LISTENING = LISTENING;
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
    this.removeBackslashes();
    this.idUserBlog = this.$route.params.id;
  },
  data() {
    return {
      showComment: false,
      idUserBlog: null,
      idCommentFirst: null,
      react: 1,
      comment: 1,
      contentChat: '',
      idReply: null,
      senderName: '',
      receiverName: '',
      userLogin: 3,
      userNameLogin: 'Khang',
      showAllComment: false,
      replyComments: [],
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
      content: `<div>When you picture mountain climbers scaling Mount Everest, what probably comes to mind are teams of climbers with Sherpa guides leading them to the summit, equipped with oxygen masks, supplies and tents. And in most cases you'd be right, as 97 per cent of climbers use oxygen to ascend to Everest's summit at 8,850 metres above sea level. The thin air at high altitudes makes most people breathless at 3,500 metres, and the vast majority of climbers use oxygen past 7,000 metres. A typical climbing group will have 8–15 people in it, with an almost equal number of guides, and they'll spend weeks to get to the top after reaching Base Camp.
But ultra-distance and mountain runner Kilian Jornet Burgada ascended the mountain in May 2017 alone, without an oxygen mask or fixed ropes for climbing.
Oh, and he did it in 26 hours.
With food poisoning.
And then, five days later, he did it again, this time in only 17 hours.
Born in 1987, Kilian has been training for Everest his whole life. And that really does mean his whole life, as he grew up 2,000 metres above sea level in the Pyrenees in the ski resort of Lles de Cerdanya in Catalonia, north-eastern Spain. While other children his age were learning to walk, Kilian was on skis. At one and a half years old he did a five-hour hike with his mother, entirely under his own steam. He left his peers even further behind when he climbed his first mountain and competed in his first cross-country ski race at age three. By age seven, he had scaled a 4,000er and, at ten, he did a 42-day crossing of the Pyrenees.
He was 13 when he says he started to take it 'seriously' and trained with the Ski Mountaineering Technical Centre (CTEMC) in Catalonia, entering competitions and working with a coach. At 18, he took over his own ski-mountaineering and trail-running training, with a schedule that only allows a couple of weeks of rest a year. He does as many as 1,140 hours of endurance training a year, plus strength training and technical workouts as well as specific training in the week before a race. For his record-breaking ascent and descent of the Matterhorn, he prepared by climbing the mountain ten times until he knew every detail of it, even including where the sun would be shining at every part of the day.
Sleeping only seven hours a night, Kilian Jornet seems almost superhuman. His resting heartbeat is extremely low at 33 beats per minute, compared with the average man's 60 per minute or an athlete's 40 per minute. He breathes more efficiently than average people too, taking in more oxygen per breath, and he has a much faster recovery time after exercise as his body quickly breaks down lactic acid – the acid in muscles that causes pain after exercise.
All this is thanks to his childhood in the mountains and to genetics, but it is his mental strength that sets him apart. He often sets himself challenges to see how long he can endure difficult conditions in order to truly understand what his body and mind can cope with. For example, he almost gave himself kidney failure after only drinking 3.5 litres of water on a 100km run in temperatures of around 40°C.
It would take a book to list all the races and awards he's won and the mountains he's climbed. And even here, Kilian’s achievements exceed the average person as, somehow, he finds time to record his career on his blog and has written three books, Run or Die, The Invisible Border and Summits of My Life.</div>`,
      detailBlog: {},
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
      ],
    };
  },

  methods: {
    handleShowAllComment() {
      this.showAllComment = !this.showAllComment;
    },
    goToDetail(data) {
      // this.$router.push({ name: 'DetailBlogPending', params: { id: dataID } });
    },
    removeBackslashes() {
      this.content = this.content.replace(/\\"/g, '"');
    },
    handleClickReact() {
      this.react++;
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
    handleClickReactReply(data) {
      data.numReact += 1;
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
    replyComment(data) {
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
    handleShowComment() {
      this.showComment = true;
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
