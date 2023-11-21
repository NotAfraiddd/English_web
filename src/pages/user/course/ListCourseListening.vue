<template>
  <div class="flex">
    <div class="w-3/5">
      <ButtonBack title="Course Listening" :hide-back="true" @back="onBack" />
      <div
        class="profile-background mt-5"
        :style="{ backgroundImage: 'url(' + LISTENING + ')' }"
      />
      <div class="text-left mt-5">
        <div>
          Here you can find activities to practise your listening skills.
          Listening will help you to improve your understanding of the language
          and your pronunciation.
        </div>
        <div class="mt-5">
          The self-study lessons in this section are written and organised by
          English level based on the Common European Framework of Reference for
          languages (CEFR). There are recordings of different situations and
          interactive exercises that practise the listening skills you need to
          do well in your studies, to get ahead at work and to communicate in
          English in your free time. The speakers you will hear are of different
          nationalities and the recordings are designed to show how English is
          being used in the world today.
        </div>
      </div>
      <ListCourse :data="listListening" @clicked="goToDetailCourse" />
    </div>
    <div
      class="sticky top-24 w-2/5 mx-3 mt-14 contain-list__reading border-8 border-table_border bg-white"
    >
      <!-- Reading -->
      <div class="relative mt-3 ml-3">
        <div
          @click="showListCourseReading"
          class="px-2 text-lg text-left font-semibold cursor-pointer hover:underline"
        >
          Reading ( 1/5 )
        </div>
        <div
          ref="course"
          :class="[
            'detail-course absolute text-left ml-3',
            { open: courseReading },
          ]"
        >
          <div
            v-for="(item, key) in listDetailReading"
            :key="key"
            class="flex gap-2 items-center cursor-pointer"
          >
            <div class="hover:underline break-words w-3/4 text-overflow">
              - {{ item.title }}
            </div>
            <img
              :src="item.status == 0 ? CANCEL : CHECKED"
              alt=""
              class="w-4 h-4 checked"
            />
          </div>
        </div>
      </div>
      <!-- Listening -->
      <div class="relative ml-3" ref="listening">
        <div
          @click="showListCourseListening"
          class="px-2 text-lg text-left font-semibold cursor-pointer hover:underline"
        >
          Listening ( 1/5 )
        </div>
        <div
          ref="courseListening"
          :class="[
            'detail-course-listening absolute text-left ml-3',
            { open: courseListening },
          ]"
        >
          <div
            v-for="(item, key) in listDetailListening"
            :key="key"
            class="flex gap-2 items-center cursor-pointer"
          >
            <div class="hover:underline break-words w-3/4 text-overflow">
              - {{ item.title }}
            </div>
            <img
              :src="item.status == 0 ? CANCEL : CHECKED"
              alt=""
              class="w-4 h-4 checked"
            />
          </div>
        </div>
      </div>
      <div ref="text" class="flex ml-5 gap-1 flex-wrap">
        Create post
        <div
          v-if="createPost == 0"
          class="font-semibold cursor-pointer hover:underline"
        >
          ( No )
        </div>
        <div v-else class="font-semibold cursor-pointer hover:underline">
          ( Yes )
        </div>
        Click
        <div class="text-primary cursor-pointer hover:underline">here</div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import {
  EXAMPLE,
  MOUNTAIN_CLIMB,
  CANCEL,
  CHECKED,
  LISTENING,
} from '../../../constants/image';
import { formatSpacerIntoHyphen } from '../../../constants/function';

export default {
  name: 'ListCourseListening',
  components: { ButtonBack, ListCourse },
  created() {
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.EXAMPLE = EXAMPLE;
    this.CANCEL = CANCEL;
    this.CHECKED = CHECKED;
    this.LISTENING = LISTENING;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    if (this.isMatchedRoute('ListCourseListening')) {
      this.$nextTick(() => {
        this.courseListening = true;
        this.checkHeightListening();
      });
    }
  },
  methods: {
    onBack() {
      this.$router.push({ name: 'HomeUser' });
    },
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
    goToDetailCourse(data) {
      const path = formatSpacerIntoHyphen(data.item.title);
      this.$router.push({
        name: 'MemberDetailCourseListening',
        params: { course: path.toLowerCase() },
      });
    },
    showListCourseReading() {
      this.courseReading = true;
      this.checkHeightReading();
      this.courseListening = false;
      this.checkHeightListening();
    },
    showListCourseListening() {
      this.courseListening = true;
      this.checkHeightListening();
      this.courseReading = false;
      this.checkHeightReading();
    },
    checkHeightReading() {
      const heightReading = this.$refs.course;
      const marginTopReading = this.$refs.listening;
      if (heightReading) {
        const scrollHeight = heightReading.scrollHeight;
        if (this.courseReading == true) {
          heightReading.style.height = `${scrollHeight}px`;
          heightReading.style.opacity = '1';
          heightReading.style.transform = 'translateY(0)';
          marginTopReading.style.marginTop = `${scrollHeight}px`;
          marginTopReading.style.transition = 'margin-top 0.65s ease';
          this.courseListening = false;
        } else {
          heightReading.style.height = `0px`;
          marginTopReading.style.transition = 'margin-top 0.65s ease';
          marginTopReading.style.marginTop = `0px`;
        }
      }
    },
    checkHeightListening() {
      const heightListening = this.$refs.courseListening;
      const marginTopText = this.$refs.text;
      if (heightListening) {
        const scrollHeight = heightListening.scrollHeight;
        if (this.courseListening == true) {
          this.courseReading = false;
          heightListening.style.height = `${scrollHeight}px`;
          heightListening.style.opacity = '1';
          heightListening.style.transform = 'translateY(0)';
          marginTopText.style.marginTop = `${scrollHeight}px`;
          marginTopText.style.transition = 'margin-top 0.65s ease';
        } else {
          heightListening.style.height = `0px`;
          marginTopText.style.transition = 'margin-top 0.65s ease';
          marginTopText.style.marginTop = `0px`;
        }
      }
    },
  },
  data() {
    return {
      createPost: 0,
      courseReading: false,
      courseListening: false,
      listListening: [
        {
          id: 1,
          title:
            'Message to new friendMessage to new friendMessage to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
        {
          id: 2,
          title: 'Message to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
        {
          id: 3,
          title: 'Message to new friend',
          subTitle:
            'Read a direct message on social media to practise and improve your reading skills.',
          image: EXAMPLE,
        },
      ],
      listDetailReading: [
        {
          id: 1,
          title:
            'Message to new friend Message to new friend Message to new friend',
          status: 0,
        },
        { id: 2, title: 'Message to new friend', status: 1 },
        { id: 3, title: 'Message to new friend', status: 0 },
        { id: 4, title: 'Message to new friend', status: 1 },
        { id: 5, title: 'Message to new friend', status: 0 },
      ],
      listDetailListening: [
        { id: 1, title: 'Listening', status: 0 },
        { id: 2, title: 'Listening', status: 1 },
        { id: 3, title: 'Listening', status: 0 },
        { id: 4, title: 'Listening', status: 1 },
        { id: 5, title: 'Listening', status: 0 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.text-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.profile-background {
  height: 450px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.contain-list {
  &__reading {
    height: fit-content;
    padding-bottom: 8px;
  }
}
.detail-course {
  z-index: 1;
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 30px;
  width: 100%;
  border-radius: 12px;
}

.detail-course-listening {
  z-index: 1;
  overflow: hidden;
  left: 0;
  height: 0;
  transition: height 0.65s ease, opacity 0.65s ease;
  top: 30px;
  width: 100%;
  border-radius: 12px;
}

.checked:hover {
  transform: translateY(-2px);
}
</style>
