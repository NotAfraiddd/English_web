<template>
  <div
    v-for="item in data"
    :key="item.id"
    class="flex h-auto hover:bg-table_header cursor-default text-base flex-1 justify-between items-start mt-3 border gap-2 py-3 px-5 rounded-lg"
  >
    <div
      class="flex gap-3 flex-col list-blog-contain"
      :class="image == true ? 'w-3/4' : 'w-full'"
    >
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
      <div v-if="groupbutton" class="flex w-40 justify-between flex-wrap gap-2">
        <div class="text-red-500 hover:text-red-600 cursor-pointer">
          Rejected
        </div>
        <div class="text-green-500 hover:text-green-600 cursor-pointer">
          Approved
        </div>
      </div>
      <div v-if="react" class="flex w-24 justify-between flex-wrap gap-2">
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
          @click="showComment(item)"
        >
          <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
          <div class="h-5 w-5 leading-5 text-primary_black">
            {{ item.numComment }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-end gap-3"
      :class="image == true ? 'w-1/5' : 'w-5'"
    >
      <div v-if="image">
        <img
          :src="item.imageTitle"
          alt=""
          srcset=""
          class="h-40 min-w-max rounded-md"
        />
      </div>
      <div v-if="icon">
        <div class="p-1 cursor-pointer w-8">
          <img :src="OPTION_ICON" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { OPTION_ICON, HEART, CHAT, HEART_DEFAULT } from '../../constants/image';
export default {
  name: 'BlogPending',
  created() {
    this.HEART = HEART;
    this.CHAT = CHAT;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.OPTION_ICON = OPTION_ICON;
  },
  emits: ['showComment'],
  props: {
    data: { type: Array, default: () => [] },
    icon: { type: Boolean, default: false },
    image: { type: Boolean, default: false },
    groupbutton: { type: Boolean, default: false },
    react: { type: Boolean, default: false },
  },
  methods: {
    handleClickReact(data) {
      data.numReact += 1;
    },
    showComment(data) {
      this.$emit('showComment', { item: data, status: true });
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
