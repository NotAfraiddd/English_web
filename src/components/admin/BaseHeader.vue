<template lang="">
  <div class="h-20 flex justify-between items-center header w-full">
    <div class="flex items-center content-header-left space-x-2">
      <div class="flex flex-col items-start w-40">
        <span class="text-primary_black">
          Total
          <span class="text-base font-semibold text-primary_black">
            {{ formatNumber(10000) }}
          </span>
          members
        </span>
        <span class="text-primary_black">
          Members online
          <span class="text-base font-semibold text-primary_black">
            {{ formatNumber(150) }}
          </span>
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between content-header-right mr-8">
      <div class="relative">
        <img :src="BELL" alt="" srcset="" class="mr-2 cursor-pointer h-5" />
        <div
          class="absolute header-notify text-xs bg-red-600 text-center text-white leading-6 h-6 w-6 rounded-full"
        >
          +99
        </div>
      </div>
      <div
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        class="list-menu relative flex items-center justify-between flex-grow cur-pointer"
      >
        <div
          v-if="
            isMatchedRoute('Dashboard') ||
            isMatchedRoute('BlogPending') ||
            isMatchedRoute('CommentReported')
          "
          class="flex items-center"
        >
          <span class="name ml-2 w-48">Nguyen Huynh Chi Bao</span>
          <Avatar :imgUrl="AVATAR" class="w-9" />
        </div>
        <span v-else class="name ml-2 w-24">My course</span>

        <img
          :src="isHovered ? ARROW_DOWN : ARROW_UP"
          :class="[
            'toggle-sidebar-icon relative cur-pointer h-3 arrow ml-2',
            isHovered && 'logo-xl-btn-collapse ml-2',
          ]"
        />

        <ul :class="['absolute m-0', isHovered && 'block']">
          <li class="item mt-4">
            <div class="flex pl-6 gap-3 mb-2">
              <img
                :src="AVATAR"
                alt=""
                srcset=""
                class="w-12 h-12 rounded-full"
              />
              <div class="flex flex-col items-start">
                <div class="text-lg font-semibold text-primary_black">
                  Nguyen Huynh Chi Bao
                </div>
                <div class="text-sm font-normal text-primary_black opacity-50">
                  nguyenhuynhchibao@gmail.com
                </div>
              </div>
            </div>
          </li>
          <li class="text-base item leading-9 h-9 text-left pl-6 relative">
            Blogging
          </li>
          <div class="absolute w-5 h-5 right-6 header-lock">
            <img :src="LOCK" alt="" srcset="" class="w-full h-full" />
          </div>
          <li class="text-base item leading-9 h-9 text-left pl-6">
            My article
          </li>
          <div class="spacer flex flex-growth-1 bg-gray-300 mx-6 my-1" />
          <li class="text-base item leading-9 h-9 text-left pl-6">Setting</li>
          <li class="text-base item leading-9 h-9 text-left pl-6">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ARROW_UP,
  ARROW_DOWN,
  AVATAR,
  BELL,
  LOCK,
} from "../../constants/image";
import Avatar from "../common/Avatar.vue";
import { formatNumber } from "../../constants/function";
export default {
  created() {
    this.BELL = BELL;
    this.ARROW_UP = ARROW_UP;
    this.ARROW_DOWN = ARROW_DOWN;
    this.LOCK = LOCK;
    this.AVATAR = AVATAR;
    this.formatNumber = formatNumber;
  },
  components: {
    Avatar,
  },
  data() {
    return {
      isHovered: false,
      titleInvite: 1,
      data: [
        {
          id: 1,
          subData: [
            {
              id: 1,
              subTitle: 1,
            },
            {
              id: 2,
              subTitle: 2,
            },
            {
              id: 3,
              subTitle: 3,
            },
            {
              id: 4,
              subTitle: 4,
            },
          ],
        },
      ],
    };
  },
  methods: {
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.matched.some(({ name }) => {
        return name == routeName;
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/baseheader.scss";
</style>