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
    <div
      class="grid grid-cols-5 md:grid-cols-2 sm:grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 detail-blog-grid"
    >
      <div
        v-for="(item, index) in 8"
        :key="index"
        class="flex flex-col 2xl:w-96 detail-blog-item cursor-pointer hover:opacity-90"
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
import {
  AVATAR,
  TITLE,
  HEART,
  HEART_DEFAULT,
  CHAT,
  LISTENING,
} from '../../../constants/image';

export default {
  name: 'DetailBlog',
  components: {},
  created() {
    this.LISTENING = LISTENING;
    this.CHAT = CHAT;
    this.HEART = HEART;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
    this.removeBackslashes();
  },
  data() {
    return {
      showComment: false,
      react: 1,
      comment: 1,
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
    goToDetail(data) {
      // this.$router.push({ name: 'DetailBlogPending', params: { id: dataID } });
    },
    removeBackslashes() {
      this.content = this.content.replace(/\\"/g, '"');
    },
    handleClickReact() {
      this.react++;
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
.detail-blog {
  &-grid {
    @media screen and (max-width: 639px) {
      grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
      column-gap: 8px !important;
    }
  }
  &-item {
    width: 18rem;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
}
.profile-background {
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
}

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
