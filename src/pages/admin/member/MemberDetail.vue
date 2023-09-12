<template>
  <ButtonBack title="Information Member" @back="changeBack" />
  <div
    class="text-primary_black mt-5 border-t border-primary_line flex items-center"
  >
    <div class="mt-4 flex items-start mr-28 gap-5">
      <div class="flex flex-col mt-5 items-start w-64">
        <div class="text-base text-primary_black font-semibold">Avatar</div>
        <div class="text-base text-primary_black">
          Accepting files: JPG, PNG or GIF.
        </div>
      </div>
      <ImageUpload :src-img="avatar" :avatar="true" :disabled="!editAvatar" />
      <div />
    </div>
    <!-- Edit -->
    <ButtonEdit
      @cancel="handleCancelAvatar"
      @edit="handleEditAvatar"
      @update="handleUpdateAvatar"
    />
  </div>
  <div class="text-primary_black mt-5 flex items-center">
    <div class="mt-4 flex items-start flex-col">
      <div class="text-base text-primary_black font-semibold member-name">
        Full Name
      </div>
      <input
        v-model="inputFullname"
        type="text"
        class="border-b form-control w-96"
        spellcheck="false"
        :disabled="editFullname"
      />
    </div>
    <!-- Edit -->
    <ButtonEdit
      @cancel="handleCancelFullName"
      @edit="handleEditFullName"
      @update="handleUpdateFullName"
    />
  </div>
</template>

<script>
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  GARBAGE,
} from '../../../constants/image';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import ButtonEdit from '../../../components/common/ButtonEdit.vue';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'MemberDetail',
  components: { ButtonBack, ImageUpload, ButtonEdit },
  created() {
    this.GARBAGE = GARBAGE;
    this.LOCK_COLOR = LOCK_COLOR;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
  },
  methods: {
    ...mapMutations('member', ['setSave']),
    handleEditAvatar(data) {
      this.editAvatar = data;
    },
    handleUpdateAvatar(data) {
      this.editAvatar = data;
    },
    handleCancelAvatar(data) {
      this.editAvatar = data;
      this.avatar = '';
    },
    handleEditFullName(data) {
      this.editFullname = data;
    },
    handleUpdateFullName(data) {
      this.editFullname = data;
    },
    handleCancelFullName(data) {
      this.editFullname = data;
    },
  },
  data() {
    return {
      avatar: AVATAR,
      editAvatar: false,
      editFullname: false,
      inputFullname: null,
    };
  },
};
</script>

<style lang="scss" scoped>
input.form-control {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
}
</style>
