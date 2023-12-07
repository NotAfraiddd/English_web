<template>
  <div
    :class="[
      'personal-image text-left mt-5 flex items-center justify-center relative',
      avatar ? '' : 'gap-10',
    ]"
  >
    <div class="text-base text-primary_black font-semibold">{{ title }}</div>
    <label class="label">
      <input
        type="file"
        ref="imageInput"
        accept="image/png, image/gif, image/jpeg"
        :disabled="disabled"
        @change="handleImageChange"
      />
      <figure
        class="personal-figure relative my-0 mr-0 ml-7"
        :class="extendClass"
      >
        <img
          :src="!checkCancel ? imageURL : AVATAR"
          class="personal-avatar w-full h-full object-cover"
          :class="avatar ? 'rounded-full' : ''"
          alt="avatar"
        />
      </figure>
    </label>
    <div
      v-if="remove"
      @click.stop="handleRemoveImage"
      :class="extendClassIcon"
      class="text-center bg-red-600 cursor-pointer absolute leading-5 h-5 w-5 text-white text-xs rounded-full"
    >
      X
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { AVATAR } from '../../constants/image';
export default {
  props: {
    srcImg: { type: String, default: '' },
    title: { type: String, default: '' },
    extendClass: { type: String, default: '' },
    extendClassIcon: { type: String, default: '' },
    avatar: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    remove: { type: Boolean, default: false },
    cancel: { type: Boolean, default: false },
  },
  watch: {
    cancel(newValue) {
      this.checkCancel = newValue;
      if (this.checkCancel == true) {
        this.$refs.imageInput.value = '';
      } else {
        this.imageURL = '' || AVATAR;
      }
    },
    srcImg(newValue) {
      this.imageURL = newValue || AVATAR;
    },
  },
  created() {
    this.AVATAR = AVATAR;
  },
  data() {
    return {
      imageURL: this.srcImg,
      checkCancel: false,
    };
  },
  methods: {
    ...mapMutations('course', ['setFileImage']),
    handleRemoveImage() {
      this.imageURL = AVATAR;
    },
    handleImageChange(event) {
      const imageFile = event.target.files[0];
      this.setFileImage(imageFile);
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result;
          this.$emit('update', base64Image, imageFile);
        };
        reader.readAsDataURL(imageFile);
        event.target.value = '';
      }
    },
  },
};
</script>

<style scoped>
.personal-image input[type='file'] {
  display: none;
}
.personal-avatar {
  box-sizing: border-box;
  border: 2px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out 0.3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.personal-figcaption {
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0);
  transition: all ease-in-out 0.3s;
}
.personal-figcaption:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.personal-figcaption > img {
  position: absolute;
  top: 35% !important;
  transform: translateX(125px) !important;
}
</style>
