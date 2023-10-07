<template>
  <div>
    <div class="flex gap-3 items-center">
      <img :src="AVATAR" alt="" srcset="" class="h-10 w-10 rounded-full" />
      <div class="flex flex-col items-start">
        <div class="font-semibold text-base">Chi Bao</div>
        <div class="text-xs">Date: 20/09/2023 10:26</div>
      </div>
    </div>
    <div class="mt-5" />
  </div>
</template>
<script>
import { AVATAR, TITLE } from '../../../constants/image';

export default {
  name: 'DetailBlog',
  components: {},
  created() {
    this.AVATAR = AVATAR;
    this.TITLE = TITLE;
  },
  data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped></style>
