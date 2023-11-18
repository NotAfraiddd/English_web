<template>
  <div class="flex">
    <ul class="w-1/3">
      <div class="text-2xl font-semibold text-left mt-2 mb-4">Setting</div>
      <template v-for="(menu, index) in panelMenu" :key="index">
        <li
          :class="[
            'panel-menu hover:bg-table_header rounded-xl flex items-center cursor-pointer pl-4 mt-2',
            { active: isActive(menu.id) },
          ]"
          @click="onMenuClick(menu)"
        >
          <img class="h-7 w-7" :src="menu.icon" alt="navIcon" />
          <div
            class="mb-0 h-10 leading-10 text-base ml-4 font-semibold text-overflow text-left"
          >
            {{ menu.message }}
          </div>
        </li>
      </template>
    </ul>
    <div v-if="activeKey == 1" class="w-full mx-5">
      <ButtonBack
        title="Personal information"
        :hide-back="true"
        @back="onBack"
      />
      <div class="contain__member mx-auto border-t border-primary_line mt-5">
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start w-96 contain__member-contain">
              <div class="flex flex-col mt-5 items-start w-64">
                <div class="text-base text-primary_black font-semibold">
                  Avatar
                </div>
                <div class="text-base text-primary_black text-left h-">
                  Accepting files: JPG, PNG or GIF.
                </div>
              </div>
              <ImageUpload
                extend-class="h-32 w-32"
                :src-img="avatar"
                :avatar="true"
                :disabled="!editAvatar"
              />
              <div />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelAvatar"
              @edit="handleEditAvatar"
              @update="handleUpdateAvatar"
            />
          </div>
        </div>
        <!-- name -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Full Name
              </div>
              <input
                v-model="inputFullname"
                type="text"
                class="border-b form-control w-96"
                :class="!editFullname ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editFullname"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelFullName"
              @edit="handleEditFullName"
              @update="handleUpdateFullName"
            />
          </div>
        </div>
        <!-- bio -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Bio
              </div>
              <input
                v-model="inputBio"
                type="text"
                class="border-b form-control w-96"
                :class="!editBio ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editBio"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelBio"
              @edit="handleEditBio"
              @update="handleUpdateBio"
            />
          </div>
        </div>
        <!-- email -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Email
              </div>
              <input
                v-model="inputEmail"
                type="text"
                class="border-b form-control w-96"
                :class="!editEmail ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editEmail"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelEmail"
              @edit="handleEditEmail"
              @update="handleUpdateEmail"
            />
          </div>
        </div>
        <!-- date -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Registration Date
              </div>
              <InputCalendar
                @update="updateCalendar"
                :calendarProp="inputDate"
                :disabled="!editDate"
                external-class="w-96 border-t-0 border-r-0 border-l-0 border-b"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelDate"
              @edit="handleEditDate"
              @update="handleUpdateDate"
            />
          </div>
        </div>
        <!-- gender -->
        <div class="mx-auto member-detail__width">
          <div
            class="text-primary_black mt-5 flex items-center justify-center button-radio"
          >
            <div class="flex w-96 items-center justify-start gap-5">
              <div
                class="flex items-start flex-col contain__member-contain gap-4 mt-4"
              >
                <div class="text-base text-primary_black font-semibold">
                  Gender
                </div>
                <!-- Edit -->
                <InputGender
                  :disabled="!editGender"
                  :radio-prop="inputGender"
                  @update="updateGender"
                />
              </div>
            </div>

            <ButtonEdit
              @cancel="handleCancelGender"
              @edit="handleEditGender"
              @update="handleUpdateGender"
            />
          </div>
        </div>
        <!-- level -->
        <div class="mx-auto member-detail__width">
          <div
            class="text-primary_black mt-5 flex items-center justify-center button-radio"
          >
            <div class="flex w-96 items-center justify-start gap-5">
              <div
                class="flex items-start flex-col contain__member-contain gap-4 mt-4"
              >
                <div class="font-semibold">Level</div>
                <InputLevel
                  external-class="w-full"
                  :disabled="!editLevel"
                  :selectedValueProp="inputLevel"
                  @update="updateLevel"
                />
              </div>
            </div>
            <ButtonEdit
              extend-class="invisible"
              @cancel="handleCancelLevel"
              @edit="handleEditLevel"
              @update="handleUpdateLevel"
            />
          </div>
        </div>
        <!-- blog -->
        <div class="mx-auto member-detail__width">
          <div
            class="text-primary_black mt-5 flex items-center justify-center button-radio"
          >
            <div class="flex w-96 items-center justify-start gap-5">
              <div
                class="flex items-start flex-col contain__member-contain gap-4 mt-4"
              >
                <div class="font-semibold">Blog</div>
                <InputBlog
                  :disabled="!editBlog"
                  :radio-prop="inputBlog"
                  @update="updateBlog"
                />
              </div>
            </div>

            <ButtonEdit
              extend-class="invisible"
              @cancel="handleCancelBlog"
              @edit="handleEditBlog"
              @update="handleUpdateBlog"
            />
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer rounded-lg bg-green-500 w-24 h-8 leading-8 hover:opacity-50 ml-auto my-5"
        @click="handleUpdateProfile"
      >
        <span class="text-base text-white">Update</span>
      </div>
    </div>
    <div v-else class="w-full mx-5">
      <ButtonBack title="Social network" :hide-back="true" @back="onBack" />
      <div class="contain__member mx-auto border-t border-primary_line mt-5">
        <!-- facebook -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Facebook
              </div>
              <input
                v-model="inputFaceBook"
                type="text"
                class="border-b form-control w-96"
                :class="!editFacebook ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editFacebook"
                placeholder="Eg.   https://www.facebook.com/"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelFacebook"
              @edit="handleEditFacebook"
              @update="handleUpdateFacebook"
            />
          </div>
        </div>
        <!-- instagram -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Instagram
              </div>
              <input
                v-model="inputInstagram"
                type="text"
                class="border-b form-control w-96"
                :class="!editInstagram ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editInstagram"
                placeholder="Eg.   https://www.instagram.com/"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelInstagram"
              @edit="handleEditInstagram"
              @update="handleUpdateInstagram"
            />
          </div>
        </div>
        <!-- linkedin -->
        <div class="text-primary_black mt-5">
          <div
            class="member-detail__width flex items-center mx-auto justify-center"
          >
            <div class="mt-4 flex items-start flex-col contain__member-contain">
              <div
                class="text-base text-primary_black font-semibold member-name"
              >
                Linkedin
              </div>
              <input
                v-model="inputLinkedin"
                type="text"
                class="border-b form-control w-96"
                :class="!editLinkedin ? 'cursor-not-allowed' : ''"
                spellcheck="false"
                :disabled="!editLinkedin"
                placeholder="Eg.   https://www.linkedin.com/"
              />
            </div>
            <!-- Edit -->
            <ButtonEdit
              @cancel="handleCancelLinkedin"
              @edit="handleEditLinkedin"
              @update="handleUpdateLinkedin"
            />
          </div>
        </div>
      </div>
      <div
        class="cursor-pointer rounded-lg bg-green-500 w-24 h-8 leading-8 hover:opacity-50 ml-auto mt-5"
        @click="handleUpdateSocialNetwork"
      >
        <span class="text-base text-white">Update</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  GARBAGE,
  USER,
  SOCIAL,
} from '../../../constants/image';
import ButtonBack from '../../../components/common/ButtonBackUser.vue';
import InputCalendar from '../../../components/common/InputCalendar.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import ButtonEdit from '../../../components/common/ButtonEdit.vue';
import InputGender from '../../../components/common/InputGender.vue';
import InputLevel from '../../../components/common/InputLevel.vue';
import InputBlog from '../../../components/common/InputBlog.vue';
import { notification } from 'ant-design-vue';
import userApi from '../../../apis/user';

export default {
  name: 'SettingProfile',
  components: {
    ButtonBack,
    ImageUpload,
    ButtonEdit,
    InputCalendar,
    InputGender,
    InputLevel,
    InputBlog,
  },
  created() {
    this.SOCIAL = SOCIAL;
    this.USER = USER;
    this.GARBAGE = GARBAGE;
    this.LOCK_COLOR = LOCK_COLOR;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.getDetail();
  },
  methods: {
    /**
     * get detail user
     */
    async getDetail() {
      this.emailLocalStorage = localStorage.getItem('email');
      const res = await userApi.getUser(this.emailLocalStorage);
      this.inputFullname = res?.fullName;
      this.inputBio = res?.bio;
      this.avatar = res?.avtURL;
      this.inputEmail = res?.email;
      this.inputDate = res?.registrationDate;
      res.gender ? (this.inputGender = 0) : (this.inputGender = 1);
      this.socialMediaConnection = res?.socialMediaConnection;
      if (res.level == 'PENDING') this.inputLevel = 0;
      else if (res.level == 'BASIC') this.inputLevel = 1;
      else if (res.level == 'INTERMIDATE') this.inputLevel = 2;
      else if (res.level == 'ADVANCED') this.inputLevel = 3;
    },
    async handleUpdateProfile() {
      try {
        this.emitter.emit('isShowLoading', true);
        await userApi.updateUser({
          uid: this.emailLocalStorage,
          fullName: this.inputFullname,
          bio: this.inputBio,
          avtURL: null,
          email: this.inputEmail,
          registrationDate: this.inputDate,
          gender: true,
          level: 'PENDING',
          role: 'USER',
          accountStatus: 'ONLINE',
          socialMediaConnection: null,
        });
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    handleUpdateSocialNetwork() {
      notification.success({ message: 'Success!' });
    },
    isActive(data) {
      const active = data === this.activeKey;
      return active ? 'active' : '';
    },
    onMenuClick(data) {
      this.activeKey = data.id;
    },
    onBack() {
      this.$router.push({ name: 'HomeUser' });
    },
    // AVATAR
    handleEditAvatar(data) {
      this.avatarOriginal = this.avatar;
      this.editAvatar = data;
    },
    handleUpdateAvatar(data) {
      this.avatarOriginal = this.avatar;
      this.editAvatar = data;
    },
    handleCancelAvatar(data) {
      this.avatar = this.avatarOriginal;
      this.editAvatar = data;
    },
    // name
    handleEditFullName(data) {
      this.inputFullnameOriginal = this.inputFullname;
      this.editFullname = data;
    },
    handleUpdateFullName(data) {
      this.inputFullnameOriginal = this.inputFullname;
      this.editFullname = data;
    },
    handleCancelFullName(data) {
      this.inputFullname = this.inputFullnameOriginal;
      this.editFullname = data;
    },
    // bio
    handleEditBio(data) {
      this.inputBioOriginal = this.inputBio;
      this.editBio = data;
    },
    handleUpdateBio(data) {
      this.inputBioOriginal = this.inputBio;
      this.editBio = data;
    },
    handleCancelBio(data) {
      this.inputBio = this.inputBioOriginal;
      this.editBio = data;
    },
    // email
    handleEditEmail(data) {
      this.inputEmailOriginal = this.inputEmail;
      this.editEmail = data;
    },
    handleUpdateEmail(data) {
      this.inputEmailOriginal = this.inputEmail;
      this.editEmail = data;
    },
    handleCancelEmail(data) {
      this.inputEmail = this.inputEmailOriginal;
      this.editEmail = data;
    },
    // Date
    updateCalendar(newValue) {
      this.inputDateOriginal = this.inputDate;
      this.inputDate = newValue;
    },
    handleEditDate(data) {
      this.inputDateOriginal = this.inputDate;
      this.editDate = data;
    },
    handleUpdateDate(data) {
      this.inputDateOriginal = this.inputDate;
      this.editDate = data;
    },
    handleCancelDate(data) {
      this.inputDate = this.inputDateOriginal;
      this.editDate = data;
    },

    // level
    updateLevel(e) {
      this.inputLevel = e;
    },
    handleEditLevel(data) {
      this.inputLevelOriginal = this.inputLevel;
      this.editLevel = data;
    },
    handleUpdateLevel(data) {
      this.inputLevelOriginal = this.inputLevel;
      this.editLevel = data;
    },
    handleCancelLevel(data) {
      this.inputLevel = this.inputLevelOriginal;
      this.editLevel = data;
    },
    // gender
    updateGender(e) {
      this.inputGender = e;
    },
    handleEditGender(data) {
      this.inputGenderOriginal = this.inputGender;
      this.editGender = data;
    },
    handleUpdateGender(data) {
      this.inputGenderOriginal = this.inputGender;
      this.editGender = data;
    },
    handleCancelGender(data) {
      this.inputGender = this.inputGenderOriginal;
      this.editGender = data;
    },
    // blog
    updateBlog(e) {
      console.log(e);
      this.inputBlog = e;
    },
    handleEditBlog(data) {
      this.inputBlogOriginal = this.inputBlog;
      this.editBlog = data;
    },
    handleUpdateBlog(data) {
      this.inputBlogOriginal = this.inputBlog;
      this.editBlog = data;
    },
    handleCancelBlog(data) {
      this.inputBlog = this.inputBlogOriginal;
      this.editBlog = data;
    },

    // facebook
    handleEditFacebook(data) {
      this.editFacebook = data;
    },
    handleUpdateFacebook(data) {
      this.inputFacebookOriginal = this.inputFacebook;
      this.editFacebook = data;
    },
    handleCancelFacebook(data) {
      this.inputFacebook = this.inputFacebookOriginal;
      this.editFacebook = data;
    },
    // instagram
    handleEditInstagram(data) {
      this.editInstagram = data;
    },
    handleUpdateInstagram(data) {
      this.inputInstagramOriginal = this.inputInstagram;
      this.editInstagram = data;
    },
    handleCancelInstagram(data) {
      this.inputInstagram = this.inputInstagramOriginal;
      this.editInstagram = data;
    },
    // linkedin
    handleEditLinkedin(data) {
      this.editLinkedin = data;
    },
    handleUpdateLinkedin(data) {
      this.inputLinkedinOriginal = this.inputLinkedin;
      this.editLinkedin = data;
    },
    handleCancelLinkedin(data) {
      this.inputLinkedin = this.inputLinkedinOriginal;
      this.editLinkedin = data;
    },
  },
  data() {
    return {
      emailLocalStorage: null,
      activeKey: 1,
      panelMenu: [
        { id: 1, icon: USER, message: 'Account Settings', checked: false },
        { id: 2, icon: SOCIAL, message: 'Social network', checked: false },
      ],
      avatar: AVATAR,
      avatarOriginal: null,
      editAvatar: false,
      inputFullname: null,
      inputFullnameOriginal: null,
      editFullname: false,
      inputBio: null,
      inputBioOriginal: null,
      editBio: false,
      inputEmail: null,
      inputEmailOriginal: null,
      editEmail: false,
      inputDate: null,
      inputDateOriginal: null,
      editDate: false,
      inputGender: 0,
      inputGenderOriginal: null,
      editGender: false,
      inputBlogOriginal: null,
      editBlog: false,
      inputBlog: 0,
      inputLevel: 2,
      inputLevelOriginal: null,
      editLevel: false,
      inputInstagram: null,
      inputInstagramOriginal: null,
      editInstagram: false,
      inputFacebook: null,
      inputFacebookOriginal: null,
      editFacebook: false,
      inputLinkedin: null,
      inputLinkedinOriginal: null,
      editLinkedin: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.contain__member {
  &-contain {
    margin-right: 5rem;
    @media screen and (max-width: 782px) {
      margin-right: 0;
      width: 384px !important;
    }
  }
}
input.form-control {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
}
.member-detail {
  &__width {
    width: 100%;
    @media screen and (max-width: 782px) {
      flex-wrap: wrap;
      width: 95%;
      gap: 12px;
    }
  }
}

.form-control:disabled,
.form-control[readonly] {
  background-color: transparent;
}

.button-radio {
  gap: 5rem;
  @media screen and (max-width: 782px) {
    gap: 12px;
    flex-wrap: wrap;
  }
}
.panel-menu.active {
  background-color: rgba(236, 236, 236, 1);
}

.text-overflow {
  flex: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
