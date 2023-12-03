<template lang="">
  <header
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
        :class="
          (!showBack && 'invisible') ||
          (this.$route.name == 'HomeUser' && 'invisible')
        "
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
            {{ formatNumber(totalUser) }}
          </span>
          members
        </span>
        <span class="text-primary_black">
          Members online
          <span class="text-base font-semibold text-primary_black">
            {{ formatNumber(totalOnline) }}
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
          v-if="inforComment.numberNotifications > 0"
          class="absolute header-notify text-xs bg-red-600 text-center text-white leading-6 h-6 w-6 rounded-full"
        >
          <p v-if="inforComment.numberNotifications > 99">+</p>
          {{ inforComment.numberNotifications }}
        </div>
        <div
          v-if="listNotify.length > 0"
          class="absolute header-notify text-xs bg-red-600 text-center text-white leading-6 h-6 w-6 rounded-full"
        >
          <p v-if="listNotify.length > 99">+</p>
          {{ listNotify.length }}
        </div>
      </div>
      <div
        v-if="showNotify"
        ref="notifyBox"
        class="absolute overflow-y-auto z-10 bg-white top-16 right-10 rounded-lg header-notify__list"
        :class="[!listNotify && 'header-notify__no-notify']"
      >
        <div class="flex items-center justify-between my-3 text-primary_black">
          <div class="text-base text-left ml-3 font-semibold">
            Notifications
          </div>
          <div class="mr-3 cursor-pointer hover:underline">
            Mark all as read
          </div>
        </div>
        <div v-if="listNotify.length != 0">
          <div
            v-for="(item, index) in listNotify"
            :key="index"
            class="flex items-center hover:bg-table_border cursor-pointer h-16 header-notify__item"
          >
            <div class="ml-3 mr-2">
              <Avatar :imgUrl="item.avatar" class="w-9 h-9 ml-3" />
            </div>
            <div
              class="w-4/5 text-left text-base textpr header-notify__item-content"
              :class="[item.seen && 'opacity-50']"
            >
              <strong>
                {{ !item.nameCourse ? item.fullName : item.nameCourse }}
              </strong>
              {{ item.content }}
            </div>
            <div v-if="!item.seen" class="mr-5">
              <div class="w-2 h-2 rounded-lg bg-blue-400" />
            </div>
          </div>
        </div>
        <div v-else class="mb-2">No notifications</div>
      </div>
      <div
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        class="relative flex items-center justify-between flex-grow cur-pointer"
        :class="{
          'list-menu': true,
          'custom-admin':
            userInfor.role == 'ADMIN' &&
            userInfor.level == checkLevel &&
            !checkRoute,
          'custom-user-advanced': userInfor.level == checkLevel && !checkRoute,
          'custom-user': userInfor.level != checkLevel && !checkRoute,
        }"
      >
        <div v-if="checkRoute == true" class="flex items-center cursor-pointer">
          <span class="name mx-3">
            {{ userInfor.fullName || userInfor.email }}
          </span>
          <Avatar
            :imgUrl="userInfor.avtURL"
            :name="userInfor.fullName || userInfor.email"
            class="w-9 h-9"
          />
        </div>
        <div v-else class="flex justify-center items-center cursor-pointer">
          <div
            @click="handleGoToMyCourse"
            class="name ml-2 w-24 hover:underline"
          >
            My course
          </div>
          <Avatar
            :imgUrl="userInfor.avtURL"
            :name="userInfor.fullName || userInfor.email"
            class="w-9 h-9"
          />
        </div>

        <img
          :src="isHovered ? ARROW_DOWN : ARROW_UP"
          :class="[
            'toggle-sidebar-icon relative cur-pointer h-3 arrow ml-3',
            isHovered && 'logo-xl-btn-collapse ml-2',
          ]"
        />

        <ul :class="['absolute m-0', isHovered && 'block']">
          <li class="item mt-4">
            <div class="flex pl-6 gap-3 mb-2">
              <Avatar
                :imgUrl="userInfor.avtURL"
                :name="userInfor.fullName || userInfor.email"
                class="w-12 h-12"
              />
              <div
                class="flex flex-col items-start hover:opacity-50"
                @click="handleGoProfile"
              >
                <div class="text-lg font-semibold text-primary_black">
                  {{ userInfor.fullName || userInfor.email }}
                </div>
                <div class="text-sm font-normal text-primary_black opacity-50">
                  {{ userInfor.email }}
                </div>
              </div>
            </div>
          </li>
          <li
            v-if="!checkRoute && userInfor.role == 'ADMIN'"
            @click="handleGoToAdmin"
            class="text-base item leading-9 h-9 text-left pl-6 relative"
          >
            Admin
          </li>
          <li
            v-if="checkRoute && userInfor.role == 'ADMIN'"
            @click="handleGoToUser"
            class="text-base item leading-9 h-9 text-left pl-6 relative"
          >
            User
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
          <li
            @click="handleLogout"
            class="text-base item leading-9 h-9 text-left pl-6"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import {
  ARROW_UP,
  ARROW_DOWN,
  AVATAR,
  BELL,
  LOCK,
  ARROW_LEFT,
  ADMIN,
} from '../../constants/image';
import Avatar from '../common/Avatar.vue';
import { formatNumber } from '../../constants/function';
import { notification } from 'ant-design-vue';
import authUserInstance from '../../apis/auth';
import { mapState, mapMutations } from 'vuex';
import userApi from '../../apis/user';
import { SOCKET } from '../../constants';

export default {
  created() {
    this.ADMIN = ADMIN;
    this.ARROW_LEFT = ARROW_LEFT;
    this.BELL = BELL;
    this.ARROW_UP = ARROW_UP;
    this.ARROW_DOWN = ARROW_DOWN;
    this.LOCK = LOCK;
    this.AVATAR = AVATAR;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.formatNumber = formatNumber;
    this.getTotalUser();
    window.addEventListener('scroll', this.handleScroll);
    this.getNotify();
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
    user(newVal, oldVal) {
      localStorage.setItem('user', JSON.stringify(newVal));
    },
    searchInputProp(newValue) {
      this.searchInput = newValue;
    },
    inforComment(newVal, oldVal) {
      if (newVal.kind == SOCKET.COMMENT)
        this.listNotify.push({
          id: newVal.content.id,
          avatar: newVal.content.avatar,
          nameCourse: null,
          content: `mentioned you in a comment.`,
          seen: false,
          fullName: newVal.content.name,
        });
      else if (newVal.kind == SOCKET.REPLY_COMMENT) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: newVal.content.avatar,
          nameCourse: null,
          content: `replied to your comment on your post.`,
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.REACT) {
        if (newVal.content.react)
          this.listNotify.push({
            id: newVal.content.id,
            avatar: newVal.content.avatar,
            nameCourse: null,
            content: `reacts your blog.`,
            seen: false,
            fullName: newVal.content.name,
          });
        else
          this.listNotify.push({
            id: newVal.content.id,
            avatar: newVal.content.avatar,
            nameCourse: null,
            content: `unreacts your blog.`,
            seen: false,
            fullName: newVal.content.name,
          });
      } else if (newVal.kind == SOCKET.REACT_COMMENT) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: newVal.content.avatar,
          nameCourse: null,
          content: `reacts your comment.`,
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.REACT_COMMENT_REPLY) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: newVal.content.avatar,
          nameCourse: null,
          content: `reacts to your comment on your post.`,
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN,
          nameCourse: null,
          content: 'Admin have approved reported comment of you.',
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.NOTIFY_BLOG_PENDING) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN,
          nameCourse: newVal.content.title,
          content: 'admin have approved blog of you.',
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.NOTIFY_COURSE_PENDING) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN, // avatar admin
          nameCourse: `${newVal.content.name || ''}`,
          content: 'has been approved by admin',
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN,
          nameCourse: `${newVal.content.name || ''}`,
          content: 'has been rejected by admin',
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.REJECTED_BLOG_PENDING) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN,
          nameCourse: `${newVal.content.name || ''}`,
          content: 'has been rejected by admin',
          seen: false,
          fullName: newVal.content.name,
        });
      } else if (newVal.kind == SOCKET.REJECTED_COURSE_PENDING) {
        this.listNotify.push({
          id: newVal.content.id,
          avatar: ADMIN,
          nameCourse: `${newVal.content.name || ''}`,
          content: 'has been rejected by admin',
          seen: false,
          fullName: newVal.content.name,
        });
      }
    },
  },
  computed: {
    ...mapState('notify', ['inforComment']),
    ...mapState('member', ['user']),
    ...mapState('auth', ['email', 'password']),
    checkRoute() {
      if (
        this.isMatchedRoute('Dashboard') ||
        this.isMatchedRoute('BlogPending') ||
        this.isMatchedRoute('DetailBlogPending') ||
        this.isMatchedRoute('CoursePending') ||
        this.isMatchedRoute('Course') ||
        this.isMatchedRoute('CreateCourse') ||
        this.isMatchedRoute('Member') ||
        this.isMatchedRoute('CourseListening') ||
        this.isMatchedRoute('CourseReading') ||
        this.isMatchedRoute('DetailCourseListening') ||
        this.isMatchedRoute('DetailCourseReading') ||
        this.isMatchedRoute('DetailCourseListeningPending') ||
        this.isMatchedRoute('CreateCourseListening') ||
        this.isMatchedRoute('CreateCourseReading') ||
        this.isMatchedRoute('AdminDetail') ||
        this.isMatchedRoute('MemberDetail') ||
        this.isMatchedRoute('Test') ||
        this.isMatchedRoute('TestLevelListening') ||
        this.isMatchedRoute('TestLevelReadingUpdate') ||
        this.isMatchedRoute('TestLevelListeningUpdate') ||
        this.isMatchedRoute('TestLevelReading') ||
        this.isMatchedRoute('CommentReported')
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      checkLevel: 'ADVANCED',
      userInfor: null,
      totalOnline: 0,
      totalUser: 0,
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
      listNotify: [],
    };
  },
  methods: {
    ...mapMutations('auth', ['setEmail', 'setPassword']),
    handleGoToCreateCourse() {
      this.$router.push({ name: 'CreateCourseForAdvancedListening' });
    },
    handleGoToUser() {
      this.$router.push({ name: 'HomeUser' });
    },
    handleGoToAdmin() {
      this.$router.push({ name: 'Dashboard' });
    },
    async getNotify() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await userApi.getNotifyList({
          user: { uid: this.userInfor.email },
          index: 1,
        });
        data?.content?.forEach((item) => {
          this.listNotify.push({
            id: item?.id,
            avatar: item?.commentAvt,
            content: item?.content,
            seen: item?.readStatus,
            fullName: item?.readStatus,
          });
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
      }
    },

    async getTotalUser() {
      try {
        this.emitter.emit('isShowLoading', true);
        this.totalUser = await userApi.getTotalUser();
        this.totalOnline = await userApi.getTotalUserOnline();
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * logout
     */
    async handleLogout() {
      try {
        this.emitter.emit('isShowLoading', true);
        const email = localStorage.getItem('email');
        await authUserInstance.logout({
          userName: email,
        });
        this.emitter.emit('isShowLoading', false);
        localStorage.removeItem('email');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('error');
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Lỗi logout:', error);
        this.emitter.emit('isShowLoading', false);
      }
    },

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
      const path = `@${this.userInfor.email}`;
      if (this.checkRoute == true) {
        this.$router.push({ name: 'AdminDetail', params: { id: path } });
      } else {
        this.$router.push({ name: 'Profile', params: { id: path } });
      }
    },
    handleGoToMyCourse() {
      this.$router.push({ name: 'ListCourse' });
    },
    handleGoToSetting() {
      const path = `@${this.userInfor.email}`;
      this.$router.push({ name: 'SettingProfile', params: { id: path } });
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
