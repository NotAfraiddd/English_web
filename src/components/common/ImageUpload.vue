<template>
  <div
    :class="[
      'personal-image text-left mt-5 flex items-center justify-center relative',
      avatar ? '' : 'gap-10',
    ]"
  >
    <div
      v-if="remove"
      @click="handleRemoveImage"
      class="icon-remove text-center bg-red-600 cursor-pointer absolute leading-5 h-5 w-5 text-white text-xs rounded-full"
    >
      X
    </div>
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
          :src="imageURL || AVATAR"
          class="personal-avatar w-full h-full"
          :class="avatar ? 'rounded-full' : ''"
          alt="avatar"
        />
        <figcaption
          :class="[
            'personal-figcaption absolute top-0 opacity-0 ',
            avatar ? 'rounded-full' : '',
            disabled ? 'cursor-not-allowed' : 'hover:opacity-100',
          ]"
        >
          <img
            class="w-32 h-32 m-0"
            src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
          />
        </figcaption>
      </figure>
    </label>
  </div>
</template>

<script>
import { AVATAR } from '../../constants/image';
export default {
  props: {
    srcImg: { type: String, default: '' },
    title: { type: String, default: '' },
    extendClass: { type: String, default: '' },
    avatar: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    remove: { type: Boolean, default: false },
  },
  watch: {
    srcImg(newValue) {
      this.imageURL = newValue;
    },
  },
  created() {
    this.AVATAR = AVATAR;
  },
  data() {
    return {
      imageURL: this.srcImg,
    };
  },
  methods: {
    handleRemoveImage() {
      this.imageURL = '';
    },
    handleImageChange(event) {
      const imageFile = event.target.files[0];
      if (imageFile) {
        const imageURL = URL.createObjectURL(imageFile);
        this.imageURL = imageURL;
      }
    },
  },
};
</script>

<style scoped>
.icon-remove {
  top: 2%;
  right: 36%;
  z-index: 1;
}
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
