<template>
  <ButtonBack title="Information Member" :hide-back="true" @back="onBack" />
  <div class="contain__member mx-auto border-t border-primary_line mt-5">
    <div class="text-primary_black mt-5">
      <div
        class="member-detail__width flex items-center mx-auto justify-center"
      >
        <div class="mt-4 flex items-start w-96 contain__member-contain">
          <div class="flex flex-col mt-5 items-start w-64">
            <div class="text-base text-primary_black font-semibold">Avatar</div>
            <div class="text-base text-primary_black">
              Accepting files: JPG, PNG or GIF.
            </div>
          </div>
          <ImageUpload
            :cancel="cancelAvatar"
            :src-img="avatar"
            :avatar="true"
            :disabled="!editAvatar"
            @update="getAvatar"
            extend-class="w-28 h-28"
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
          <div class="text-base text-primary_black font-semibold member-name">
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
          <div class="text-base text-primary_black font-semibold member-name">
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

    <!-- gender -->
    <div class="mx-auto member-detail__width">
      <div
        class="text-primary_black mt-5 flex items-center justify-center button-radio"
      >
        <div class="flex w-96 items-center justify-start gap-5">
          <div class="text-base text-primary_black font-semibold member-name">
            Gender
          </div>
          <!-- Edit -->
          <InputGender
            :disabled="!editGender"
            :radio-prop="inputGender"
            @update="updateGender"
          />
        </div>

        <ButtonEdit
          @cancel="handleCancelGender"
          @edit="handleEditGender"
          @update="handleUpdateGender"
        />
      </div>
    </div>

    <!-- blog -->
    <div class="mx-auto member-detail__width">
      <div
        class="text-primary_black mt-5 flex items-center justify-center button-radio"
      >
        <div class="flex w-96 items-center justify-start gap-5">
          <div class="text-base text-primary_black font-semibold member-name">
            Status blog
          </div>
          <!-- Edit -->
          <InputBlog
            :disabled="!editBlog"
            :radio-prop="inputBlog"
            @update="updateBlog"
          />
        </div>

        <ButtonEdit
          @cancel="handleCancelBlog"
          @edit="handleEditBlog"
          @update="handleUpdateBlog"
        />
      </div>
    </div>
    <!-- level -->
    <div class="mx-auto member-detail__width">
      <div
        class="text-primary_black mt-5 flex items-center justify-center button-radio"
      >
        <div class="flex w-96 items-center justify-start gap-5">
          <div class="text-base text-primary_black font-semibold member-name">
            Level
          </div>
          <!-- Edit -->
          <InputLevel
            external-class="w-full"
            :disabled="!editLevel"
            :selectedValueProp="inputLevel"
            @update="updateLevel"
          />
        </div>

        <ButtonEdit
          @cancel="handleCancelLevel"
          @edit="handleEditLevel"
          @update="handleUpdateLevel"
          extend-class="invisible"
        />
      </div>
    </div>
    <!-- date -->
    <div class="text-primary_black mt-5">
      <div
        class="member-detail__width flex items-center mx-auto justify-center"
      >
        <div class="mt-4 flex items-start flex-col contain__member-contain">
          <div class="text-base text-primary_black font-semibold member-name">
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
          extend-class="invisible"
        />
      </div>
    </div>
    <!-- email -->
    <div class="text-primary_black mt-5">
      <div
        class="member-detail__width flex items-center mx-auto justify-center"
      >
        <div class="mt-4 flex items-start flex-col contain__member-contain">
          <div class="text-base text-primary_black font-semibold member-name">
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
          extend-class="invisible"
          @cancel="handleCancelEmail"
          @edit="handleEditEmail"
          @update="handleUpdateEmail"
        />
      </div>
    </div>
  </div>
  <div
    class="mt-10 cursor-pointer rounded-lg bg-green-500 w-24 h-8 leading-8 hover:opacity-50 ml-auto my-5"
    @click="handleUpdateProfile"
  >
    <span class="text-base text-white">Update</span>
  </div>
</template>

<script>
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  GARBAGE,
} from '../../../constants/image';
import ButtonBack from '../../../components/common/ButtonBackUser.vue';
import InputCalendar from '../../../components/common/InputCalendar.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import ButtonEdit from '../../../components/common/ButtonEdit.vue';
import InputGender from '../../../components/common/InputGender.vue';
import InputBlog from '../../../components/common/InputBlog.vue';
import InputLevel from '../../../components/common/InputLevel.vue';
import userApi from '../../../apis/user';
import fileApi from '../../../apis/file';
import { mapState, mapMutations } from 'vuex';
import { notification } from 'ant-design-vue';
export default {
  name: 'MemberDetail',
  components: {
    ButtonBack,
    ImageUpload,
    ButtonEdit,
    InputCalendar,
    InputGender,
    InputBlog,
    InputLevel,
  },
  created() {
    this.GARBAGE = GARBAGE;
    this.LOCK_COLOR = LOCK_COLOR;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.emailID = this.$route.params.id;
    if (this.emailID) {
      this.getDetail();
    }
  },
  computed: {
    ...mapState('course', ['file']),
  },
  methods: {
    ...mapMutations('member', ['setUser']),
    async handleUpdateProfile() {
      try {
        this.emitter.emit('isShowLoading', true);
        if (this.file) {
          let formData = new FormData();
          formData.append('file', this.file);
          this.avatar = await fileApi.updateImg(formData);
        }
        await userApi.updateUser({
          uid: this.emailID,
          fullName: this.inputFullname,
          bio: this.inputBio,
          avtURL: this.avatar,
          email: this.inputEmail,
          registrationDate: this.inputDate,
          gender: this.inputGender != 1 ? true : false,
          level: this.inputLevel,
          socialMediaConnection: null,
          role: 'ADMIN',
        });
        notification.success({ message: 'Update profile success' });
        await this.getDetail();
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.error(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get detail user
     */
    async getDetail() {
      const res = await userApi.getUser(this.emailID);
      // this.setUser(res);
      this.inputFullname = res?.fullName;
      this.inputBio = res?.bio;
      this.avatar = res?.avtURL || AVATAR;
      this.inputEmail = res?.email;
      this.inputDate = res?.registrationDate;
      res.gender ? (this.inputGender = 0) : (this.inputGender = 1);
      this.socialMediaConnection = res?.socialMediaConnection;
      if (res.level == 'PENDING') this.inputLevel = 0;
      else if (res.level == 'BASIC') this.inputLevel = 1;
      else if (res.level == 'INTERMEDIATE') this.inputLevel = 2;
      else if (res.level == 'ADVANCED') this.inputLevel = 3;
    },
    onBack() {
      this.$router.push({ name: 'Member' });
    },
    getAvatar(data) {
      this.avatar = data;
    },
    // AVATAR
    handleEditAvatar(data) {
      this.cancelAvatar = false;
      this.editAvatar = data;
    },
    handleUpdateAvatar(data) {
      this.editAvatar = data;
    },
    handleCancelAvatar(data) {
      this.cancelAvatar = true;
      this.editAvatar = data;
    },
    // name
    handleEditFullName(data) {
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
      this.inputDate = newValue;
    },
    handleEditDate(data) {
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
    // blog
    updateBlog(e) {
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
  },
  data() {
    return {
      emailID: null,
      cancelAvatar: false,
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
      inputBlog: 1,
      inputBlogOriginal: null,
      editBlog: false,
      inputLevel: 2,
      inputLevelOriginal: null,
      editLevel: false,
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
</style>
