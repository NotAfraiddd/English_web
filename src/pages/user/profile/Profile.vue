<template>
  <div>
    <div
      class="profile-background border-gray-100 border-t-0 border ml-2 mr-10"
      :style="{ backgroundImage: 'url(' + BACKGROUND + ')' }"
    />
    <div class="relative">
      <figure class="personal-figure absolute w-32 h-32 my-0 mr-0 ml-7">
        <img
          :src="AVATAR"
          class="personal-avatar w-32 h-32 rounded-full"
          alt="avatar"
        />
      </figure>
      <div class="absolute left-56 font-semibold text-xl mt-3">
        {{ fullName }}
      </div>
    </div>
    <div class="mt-20 text-left flex mr-10">
      <div class="w-2/5 profile-introduce px-5 py-3 flex flex-col">
        <div class="font-semibold">Introduce</div>
        <div class="mx-auto">{{ bio }}</div>
        <div class="border-t border-primary_line my-2" />
        <div class="flex items-center gap-3">
          <img :src="USERS" alt="" srcset="" class="w-7 h-7" />
          <div class="leading-6">
            Member of
            <b>CircleZ</b>
            from {{ registrationDate }}
          </div>
        </div>
        <div
          v-if="socialMediaConnection"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_FACEBOOK" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a
              href="https://www.facebook.com/profile.php?id=100007821972265"
              target="_blank"
              class="hover:text-primary"
            >
              https://www.facebook.com/profile.php?id=100007821972265
            </a>
          </div>
        </div>
        <div
          v-if="socialMediaConnection"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_INSTAGRAM" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a
              href="https://www.instagram.com/nh.chibao/"
              target="_blank"
              class="hover:text-primary"
            >
              https://www.instagram.com/nh.chibao/
            </a>
          </div>
        </div>
        <div
          v-if="socialMediaConnection"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_LINKEDIN" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a
              href="https://www.linkedin.com/in/bao-nguyen-465722257/"
              target="_blank"
              class="hover:text-primary"
            >
              https://www.linkedin.com/in/bao-nguyen-465722257/
            </a>
          </div>
        </div>
      </div>
      <div class="ml-10 profile-course w-3/5 px-5 py-3 flex flex-col">
        <div class="font-semibold">Course(s) attended</div>
        <div
          v-for="(item, index) in listCourses"
          :key="index"
          class="flex mt-4 flex-col"
        >
          <div class="flex">
            <div class="w-1/2">
              <div
                class="text-white rounded-2xl flex flex-col items-center h-36 justify-center hover:opacity-50 cursor-pointer p-2"
                :style="{ background: item.color }"
              >
                <div class="text-2xl font-semibold text-center">
                  {{ item.title }}
                </div>
                <div
                  class="text-base text-center text-subtitle overflow-hidden"
                >
                  {{ item.subtitle }}
                </div>
              </div>
            </div>
            <div class="w-1/2 ml-4">
              <div class="text-xl font-semibold">{{ item.title }}</div>
              <div class="text-base">{{ item.content }}</div>
            </div>
          </div>
          <div class="profile-spacer mt-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '../../../apis/user';
import {
  AVATAR,
  BACKGROUND,
  USERS,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_LINKEDIN,
} from '../../../constants/image';
import moment from 'moment';

export default {
  name: 'Profile',
  components: {},
  created() {
    this.USERS = USERS;
    this.SOCIAL_FACEBOOK = SOCIAL_FACEBOOK;
    this.SOCIAL_INSTAGRAM = SOCIAL_INSTAGRAM;
    this.SOCIAL_LINKEDIN = SOCIAL_LINKEDIN;
    this.BACKGROUND = BACKGROUND;
    this.AVATAR = AVATAR;
    this.getDetail();
  },
  data() {
    return {
      BACKGROUND: BACKGROUND,
      fullName: null,
      bio: null,
      registrationDate: null,
      listCourses: [
        {
          id: 1,
          title: 'Basic Level',
          subtitle: 'English for individuals with basic knowledge.',
          name: 'Basic English Course',
          content:
            'In this course, we will learn basic vocabulary, simple reading and listening lessons.',
          color: '#0068FF',
        },
        {
          id: 2,
          title: 'Intermediate Level',
          subtitle: 'English for individuals with intermediate knowledge.',
          name: 'Intermediate English Course',
          content:
            'In this course, we will learn basic vocabulary, simple reading and listening lessons.',
          color: '#AA53EE',
        },
        {
          id: 3,
          title: 'Advanced Level',
          subtitle: 'English for individuals with advanced knowledge.',
          name: 'Advanced English Course',
          content:
            'In this course, we will learn basic vocabulary, simple reading and listening lessons.',
          courseFinished: '3/10',
          color: '#87CF2A',
        },
        {
          id: 4,
          title: 'Grammar',
          subtitle: 'English for individuals with basic knowledge.',
          content:
            'In this course, we will learn basic vocabulary, simple reading and listening lessons.',
          name: 'Grammar English Course',
          color: '#7C89CE',
        },
      ],
      socialMediaConnection: null,
    };
  },
  methods: {
    async getDetail() {
      const email = localStorage.getItem('email');
      const res = await userApi.getUser(email);
      this.fullName = res?.fullName;
      this.bio = res?.bio;
      this.registrationDate = moment(res?.registrationDate).format(
        'DD/MM/YYYY',
      );
      this.socialMediaConnection = res?.socialMediaConnection;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-subtitle {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.profile {
  &-background {
    height: 350px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  &-introduce {
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    height: fit-content;
  }
  &-course {
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  }
}

.personal-figure {
  top: -65px;
  left: 50px;
}
.personal-avatar {
  box-sizing: border-box;
  border: 3px solid #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out 0.3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.profile-spacer {
  width: 100%;
  height: 1px;
  background-color: rgba(153, 153, 153, 0.6);
}
</style>
