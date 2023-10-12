<template lang="">
  <div
    :class="[
      'h-20 flex justify-between items-center w-full bg-white z-10 sticky top-0',
      !checkRoute ? 'border-b-0 border-l-0' : 'border-b border-l header',
    ]"
  >
    <div
      v-if="!checkRoute"
      class="content-header-left h-20 flex items-center"
      :class="[!checkRoute && 'content-header-left__user']"
    >
      <div
        class="flex justify-center items-center cursor-pointer"
        :class="!showBack && 'invisible'"
        @click="changeBack"
        @mouseenter="hoverBack"
        @mouseleave="resetHover"
      >
        <img :src="ARROW_LEFT" alt="" srcset="" class="icon-back mr-3" />
        <div class="text-xl text-text_back">Back</div>
      </div>
    </div>
    <div
      v-else
      class="content-header-left h-20 flex items-center"
      :class="[!checkRoute && 'content-header-left__user']"
    >
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
    <input
      v-if="hideSearch"
      v-model="searchInput"
      class="h-10 rounded-lg pl-2 flex items-center w-80 border form-control"
      placeholder="Search somethings..."
    />

    <div
      class="flex items-center justify-between content-header-right mr-8 right-0 h-20"
    >
      <div class="h-6 w-6 bell-notify relative" @click="handleShowNotify">
        <img :src="BELL" alt="" srcset="" class="mr-2 cursor-pointer h-full" />
        <div
          class="absolute header-notify text-xs bg-red-600 text-center text-white leading-6 h-6 w-6 rounded-full"
        >
          +99
        </div>
      </div>
      <div
        v-if="showNotify"
        ref="notifyBox"
        class="absolute overflow-y-auto z-10 bg-white top-16 right-10 rounded-lg header-notify__list"
        :class="[!listNotify && 'header-notify__no-notify']"
      >
        <div class="text-base mt-3 text-left ml-3 font-semibold">
          Notifications
        </div>
        <div
          v-for="(item, index) in listNotify"
          :key="index"
          class="flex items-center hover:bg-table_border cursor-pointer h-16 header-notify__item"
          :class="!item.seen ? '' : ' bg-table_border'"
        >
          <div class="ml-3 mr-2">
            <Avatar :imgUrl="item.avatar" class="w-9 ml-3" />
          </div>
          <div
            class="w-4/5 text-left text-base textpr header-notify__item-content"
          >
            {{ item.content }}
          </div>
          <div v-if="item.seen" class="mr-5">
            <div class="w-2 h-2 rounded-lg bg-blue-400" />
          </div>
        </div>
      </div>
      <div
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        class="relative flex items-center justify-between flex-grow cur-pointer"
        :class="checkRoute ? 'list-menu custom-hover-effect' : 'list-menu'"
      >
        <div v-if="checkRoute == true" class="flex items-center cursor-pointer">
          <span class="name ml-5 w-48">Nguyen Huynh Chi Bao</span>
          <Avatar :imgUrl="AVATAR" class="w-9" />
        </div>
        <div v-else class="flex justify-center items-center cursor-pointer">
          <div
            @click="handleGoToMyCourse"
            class="name ml-2 w-24 hover:underline"
          >
            My course
          </div>
          <Avatar :imgUrl="AVATAR" class="w-9" />
        </div>

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
              <div
                class="flex flex-col items-start hover:opacity-50"
                @click="handleGoProfile"
              >
                <div class="text-lg font-semibold text-primary_black">
                  Nguyen Huynh Chi Bao
                </div>
                <div class="text-sm font-normal text-primary_black opacity-50">
                  nguyenhuynhchibao@gmail.com
                </div>
              </div>
            </div>
          </li>
          <li
            v-if="!checkRoute"
            @click="handleGoToBlog"
            class="text-base item leading-9 h-9 text-left pl-6 relative"
          >
            Blogging
          </li>
          <div v-if="statusBlog" class="absolute w-5 h-5 right-6 header-lock">
            <img :src="LOCK" alt="" srcset="" class="w-full h-full" />
          </div>
          <li
            v-if="!checkRoute"
            @click="handleGoToMyBlog"
            class="text-base item leading-9 h-9 text-left pl-6"
          >
            My article
          </li>
          <div class="spacer flex flex-growth-1 bg-gray-300 mx-6 my-1" />
          <li
            v-if="!checkRoute"
            @click="handleGoToSetting"
            class="text-base item leading-9 h-9 text-left pl-6"
          >
            Setting
          </li>
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
  ARROW_LEFT,
} from '../../constants/image';
import Avatar from '../common/Avatar.vue';
import { formatNumber } from '../../constants/function';
import { notification } from 'ant-design-vue';
export default {
  created() {
    this.ARROW_LEFT = ARROW_LEFT;
    this.BELL = BELL;
    this.ARROW_UP = ARROW_UP;
    this.ARROW_DOWN = ARROW_DOWN;
    this.LOCK = LOCK;
    this.AVATAR = AVATAR;
    this.formatNumber = formatNumber;
    window.addEventListener('scroll', this.handleScroll);
  },
  emits: ['back'],
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  props: {
    hideMember: { type: Boolean, default: true },
    hideSearch: { type: Boolean, default: false },
    searchInputProp: { type: String, default: null },
  },
  components: {
    Avatar,
  },
  watch: {
    searchInputProp(newValue) {
      this.searchInput = newValue;
    },
  },
  computed: {
    checkRoute() {
      if (
        this.isMatchedRoute('Dashboard') ||
        this.isMatchedRoute('BlogPending') ||
        this.isMatchedRoute('Course') ||
        this.isMatchedRoute('CreateCourse') ||
        this.isMatchedRoute('Member') ||
        this.isMatchedRoute('CourseReading') ||
        this.isMatchedRoute('DetailCourseListening') ||
        this.isMatchedRoute('CreateCourseListening') ||
        this.isMatchedRoute('DetailCourseReading') ||
        this.isMatchedRoute('CreateCourseReading') ||
        this.isMatchedRoute('AdminDetail') ||
        this.isMatchedRoute('MemberDetail') ||
        this.isMatchedRoute('CommentReported')
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      statusBlog: false,
      searchInput: this.searchInputProp,
      isHovered: false,
      isHoverBack: false,
      showNotify: false,
      titleInvite: 1,
      showBack: false,
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
      listNotify: [
        {
          id: 1,
          avatar: AVATAR,
          content:
            'Your comment is reported by someone Your comment is reported by someone Your comment is reported by someone Your comment is reported',
          seen: false,
          fullName: 'Ngoc Huan',
        },
        {
          id: 2,
          avatar: AVATAR,
          content:
            'Your comment is reported by someone Your comment is reported by someone Your comment is reported by someone Your comment is reported',
          seen: true,
          fullName: 'Chi Bao',
        },
      ],
    };
  },
  methods: {
    handleShowNotify() {
      if (!this.showNotify) {
        this.showNotify = true;
        setTimeout(() => {
          document.addEventListener('click', this.handleDocumentClick);
        }, 0);
      }
    },
    handleDocumentClick(event) {
      const notifyBox = this.$refs.notifyBox;
      const target = event.target;
      if (notifyBox && !notifyBox.contains(target)) {
        this.showNotify = false;
        document.removeEventListener('click', this.handleDocumentClick);
      }
    },
    changeBack() {
      this.$emit('back');
    },
    hoverBack() {
      this.isHoverBack = true;
      const imageArrow = document.querySelector('.icon-back');
      if (this.isHoverBack) {
        imageArrow.style.transform = 'translateX(-5px) ';
      }
    },
    resetHover() {
      this.isHoverBack = false;
      const imageArrow = document.querySelector('.icon-back');
      if (!this.isHoverBack) {
        imageArrow.style.transform = 'translateX(0px)';
      }
    },
    handleScroll() {
      if (window.scrollY >= 10) {
        this.showBack = true;
      } else {
        this.showBack = false;
      }
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
    handleGoProfile() {
      if (this.checkRoute == true) {
        this.$router.push({ name: 'AdminDetail', params: { id: 1 } });
      } else {
        this.$router.push({ name: 'Profile', params: { id: 1 } });
      }
    },
    handleGoToMyCourse() {
      this.$router.push({ name: 'ListCourse' });
    },
    handleGoToSetting() {
      this.$router.push({ name: 'SettingProfile', params: { id: 1 } });
    },
    handleGoToBlog() {
      if (!this.statusBlog) {
        this.$router.push({ name: 'CreateBlog' });
      } else {
        notification.warning({ message: 'Blogging function is not open yet' });
      }
    },
    handleGoToMyBlog() {
      this.$router.push({ name: 'MyBlog' });
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/styles/baseheader.scss';
</style>
