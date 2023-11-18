<template>
  <div class="flex">
    <div class="w-3/5">
      <ButtonBack title="Course Grammar" :hide-back="true" @back="onBack" />
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
      <ListCourse :data="listGrammar" @clicked="goToDetailCourse" />
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
  name: 'Grammar',
  components: { ButtonBack, ListCourse },
  created() {
    this.MOUNTAIN_CLIMB = MOUNTAIN_CLIMB;
    this.EXAMPLE = EXAMPLE;
    this.CANCEL = CANCEL;
    this.CHECKED = CHECKED;
    this.LISTENING = LISTENING;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
  },
  methods: {
    goToDetailCourse(data) {
      const path = formatSpacerIntoHyphen(data.item.title);
      this.$router.push({
        name: 'MemberDetailCourseGrammar',
        params: { course: path.toLowerCase() },
      });
    },
  },
  data() {
    return {
      listGrammar: [
        {
          id: 1,
          title: 'Message to new friend',
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
