<template>
  <div
    v-for="item in data"
    :key="item.id"
    :class="extendClass"
    @click="goToDetail(item.id)"
    class="flex h-auto cursor-pointer text-base flex-1 justify-between items-start mt-3 border gap-2 py-3 px-5 rounded-lg"
  >
    <div
      class="flex max-h-40 flex-col list-blog-contain w-full h-40 justify-between"
    >
      <div v-if="user" class="flex gap-3 items-center">
        <img :src="item.avatar" alt="" srcset="" class="h-8 w-8 rounded-full" />
        <div class="flex flex-col items-start">
          <div class="font-semibold text-base">{{ item.author }}</div>
          <div class="text-xs">{{ item.date }}</div>
        </div>
      </div>
      <div class="flex flex-col items-start gap-1 hover:opacity-70">
        <div class="font-semibold text-xl text-primary_black text-left">
          {{ item.title }}
        </div>
        <div
          class="text-base text-primary_black text-left overflow-hidden"
          :class="!user ? 'text-sub-content' : 'text-sub-content-3'"
        >
          {{ item.content }}
        </div>
      </div>
      <div v-if="button" class="flex w-40 justify-between flex-wrap gap-3">
        <div class="text-text_red hover:text-red-600 cursor-pointer">
          Rejected
        </div>
        <div class="text-text_green hover:text-green-600 cursor-pointer">
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
      :class="image == true ? 'w-1/4' : 'w-5'"
    >
      <div v-if="image" class="w-48">
        <div
          class="profile-background rounded-md"
          :style="{ backgroundImage: 'url(' + item.imageTitle + ')' }"
        />
      </div>
      <div v-if="icon">
        <div
          :class="[
            'relative cursor-pointer w-8 pb-2',
            showOption != null && 'icon-option',
          ]"
          @mouseenter="showOptions(item.id)"
          @mouseout="showOptions"
        >
          <img :src="OPTION_ICON" alt="" srcset="" />
        </div>
        <div
          :class="[
            'w-52 rounded-lg absolute menu-option right-14 bg-white z-10 border',
            showOption == item.id ? 'block' : 'hidden',
          ]"
        >
          <div v-for="(item, index) in options" :key="index">
            <div class="h-7 leading-7 hover:bg-table_border cursor-pointer">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { OPTION_ICON, HEART, CHAT, HEART_DEFAULT } from '../../constants/image';
export default {
  name: 'ListBlog',
  created() {
    this.HEART = HEART;
    this.CHAT = CHAT;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.OPTION_ICON = OPTION_ICON;
  },
  emits: ['showComment', 'changePath'],
  props: {
    data: { type: Array, default: () => [] },
    icon: { type: Boolean, default: false },
    image: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    react: { type: Boolean, default: false },
    user: { type: Boolean, default: false },
    extendClass: { type: String, default: '' },
  },
  methods: {
    handleClickReact(data) {
      data.numReact += 1;
    },
    goToDetail(data) {
      this.$emit('changePath', data);
    },
    showComment(data) {
      this.$emit('showComment', { item: data, status: true });
    },
    showOptions(data) {
      this.showOption = data;
    },
    closeOptions() {
      this.showOption = null;
    },
  },
  data() {
    return {
      showOption: null,
      options: [
        { id: 1, title: 'Delete' },
        { id: 2, title: 'Edit' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-option {
  height: fit-content;
  padding: 8px 0;
}

.icon-option {
  transform: translateY(3px);
  transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 20px;
    right: 8px;
  }
  &:hover {
    transform: translateY(0);
  }
}

.text-sub-content {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.text-sub-content-3 {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.profile-background {
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
}
</style>
