<template>
  <div>
    <div
      class="profile-background border-gray-100 border-t-0 border ml-2 mr-10"
      :style="{ backgroundImage: 'url(' + BACKGROUND + ')' }"
    />
    <div class="relative">
      <figure class="personal-figure absolute w-32 h-32 my-0 mr-0 ml-7">
        <Avatar
          :imgUrl="avatar"
          :name="fullName"
          class="w-32 h-32 object-cover bg-white"
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
          v-if="inputFaceBook"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_FACEBOOK" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a :href="inputFaceBook" target="_blank" class="hover:text-primary">
              {{ inputFaceBook }}
            </a>
          </div>
        </div>
        <div
          v-if="inputInstagram"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_INSTAGRAM" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a
              :href="inputInstagram"
              target="_blank"
              class="hover:text-primary"
            >
              {{ inputInstagram }}
            </a>
          </div>
        </div>
        <div
          v-if="inputLinkedin"
          class="flex items-center gap-3 mt-3 break-all"
        >
          <img :src="SOCIAL_LINKEDIN" alt="" srcset="" class="w-6 h-6" />
          <div class="leading-6 text-primary_blue cursor-pointer">
            <a :href="inputLinkedin" target="_blank" class="hover:text-primary">
              {{ inputLinkedin }}
            </a>
          </div>
        </div>
      </div>
      <div class="ml-10 profile-course w-3/5 px-5 py-3 flex flex-col">
        <div class="font-semibold">Course(s) recommended by admin</div>
        <div
          v-for="(item, index) in listCourses"
          :key="index"
          @click="clickChooseCourse(item)"
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
  <ConfirmModal
    :showModal="modalChooseCourse"
    @closeModal="closeModalChoose"
    @save="closeModalChoose"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #icon>
      <img :src="LEARN" alt="" srcset="" />
    </template>
    <template #content>
      <div class="text-primary_black my-5 flex gap-1">
        Do you want to choose
        <div class="font-semibold">Listening</div>
        or
        <div class="font-semibold">Reading</div>
        ?
      </div>
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToListening"
        >
          <span class="text-base text-primary">Listening</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="goToReading"
        >
          <span class="text-base text-white">Reading</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>

<script>
import courseApi from '../../../apis/course';
import userApi from '../../../apis/user';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import Avatar from '../../../components/common/Avatar.vue';
import { formatSpacerIntoHyphen } from '../../../constants/function';
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
  components: { Avatar, ConfirmModal },
  created() {
    this.USERS = USERS;
    this.SOCIAL_FACEBOOK = SOCIAL_FACEBOOK;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.SOCIAL_INSTAGRAM = SOCIAL_INSTAGRAM;
    this.SOCIAL_LINKEDIN = SOCIAL_LINKEDIN;
    this.BACKGROUND = BACKGROUND;
    this.AVATAR = AVATAR;
    this.getDetail();
    this.getAllCourse();
  },
  data() {
    return {
      title: null,
      modalChooseCourse: false,
      BACKGROUND: BACKGROUND,
      fullName: null,
      bio: null,
      registrationDate: null,
      avatar: null,
      listCourses: [],
      inputFaceBook: null,
      inputInstagram: null,
      inputLinkedin: null,
    };
  },
  methods: {
    clickChooseCourse(data) {
      this.title = data?.name;
      this.modalChooseCourse = true;
    },
    closeModalChoose() {
      this.modalChooseCourse = false;
    },
    goToListening() {
      const path = formatSpacerIntoHyphen(this.title).toLowerCase();
      this.$router.push({
        name: 'ListCourseListening',
        params: { name: path },
      });
    },
    goToReading() {
      const path = formatSpacerIntoHyphen(this.title).toLowerCase();
      this.$router.push({ name: 'ListCourseReading', params: { name: path } });
    },
    /**
     * get all course
     */
    async getAllCourse() {
      this.listCourses = [];
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await courseApi.allCourse();
        data.forEach((item) => {
          if (item?.courseLevel != 'PENDING') {
            if (item.courseStatus == 'APPROVED') {
              let modifiedLevel =
                item?.courseLevel.charAt(0).toUpperCase() +
                item?.courseLevel.slice(1).toLowerCase();
              this.listCourses.push({
                id: item?.id,
                title: modifiedLevel + ' Level',
                level: modifiedLevel,
                subtitle: item?.description,
                percentages: [{ percentage: 0 }],
                name: item?.name,
                courseFinished: 0,
                color: item?.colorCode,
                status: item.courseStatus == 'PENDING' ? true : false,
              });
            }
          }
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        this.emitter.emit('isShowLoading', false);
        console.log(error);
      }
    },
    async getDetail() {
      const email = localStorage.getItem('email');
      const res = await userApi.getUser(email);
      this.fullName = res?.fullName || res?.email;
      this.bio = res?.bio;
      this.registrationDate = moment(res?.registrationDate).format(
        'DD/MM/YYYY',
      );
      this.avatar = res?.avtURL;
      this.inputFaceBook = res?.facebookURL;
      this.inputInstagram = res?.instagramURL;
      this.inputLinkedin = res?.linkedinURL;
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
