<template>
  <div
    v-for="item in data"
    :key="item.id"
    class="flex h-auto hover:bg-table_header cursor-default text-base flex-1 justify-between items-start mt-3 border gap-2 py-3 px-5 rounded-lg"
  >
    <div class="flex gap-3 flex-col w-3/4 list-blog-contain">
      <div class="flex gap-3">
        <img :src="item.avatar" alt="" srcset="" class="h-8 w-8 rounded-full" />
        <div class="font-semibold my-auto">{{ item.author }}</div>
      </div>
      <div class="flex flex-col items-start">
        <div class="font-semibold text-xl text-primary_black text-left">
          {{ item.title }}
        </div>
        <div class="text-base text-primary_black text-left">
          {{ item.content }}
        </div>
      </div>
      <div class="flex w-40 justify-between flex-wrap gap-2">
        <div class="text-red-500 hover:text-red-600 cursor-pointer">
          Rejected
        </div>
        <div class="text-green-500 hover:text-green-600 cursor-pointer">
          Approved
        </div>
      </div>
    </div>
    <div class="w-1/5 flex justify-end gap-3">
      <img
        :src="item.imageTitle"
        alt=""
        srcset=""
        class="h-40 min-w-max rounded-md"
      />
      <div v-if="icon">
        <img :src="OPTION_ICON" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
import { OPTION_ICON } from '../../constants/image';
export default {
  name: 'BlogPending',
  created() {
    this.OPTION_ICON = OPTION_ICON;
  },
  props: {
    data: { type: Array, default: () => [] },
    icon: { type: Boolean, default: false },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.list-blog-contain {
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
}
</style>
