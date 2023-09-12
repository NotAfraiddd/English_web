<template>
  <div class="text-primary_black relative">
    <ButtonBack title="Blog detail" @back="changeBack" :hide-back="true" />
    <div class="flex mt-5">
      <Avatar :imgUrl="AVATAR" class="w-10 border" />
      <div class="flex flex-col ml-4 items-start">
        <div class="text-sm">20/03/2023 10:23</div>
        <div class="text-base font-semibold">Nguyen Huynh Chí Bảo</div>
      </div>
    </div>
    <div class="mt-4 p-5" v-html="content" />
    <div class="flex gap-5 absolute right-0">
      <div class="text-text_red text-base h-10 leading-10 w-24 cursor-pointer">
        Rejected
      </div>
      <div
        class="text-white bg-text_green h-10 leading-10 w-24 text-base font-medium rounded-lg border-table_header border cursor-pointer"
      >
        Approved
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import Avatar from '../../../components/common/Avatar.vue';
import { AVATAR } from '../../../constants/image';

export default {
  name: 'DetailBlogPending',
  created() {
    this.AVATAR = AVATAR;
  },
  components: { ButtonBack, Avatar },
  methods: {
    changeBack() {
      this.$router.push({ name: 'BlogPending' });
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
