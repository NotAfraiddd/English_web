<template>
  <div>
    <div
      class="profile-background border-gray-100 border-t-0 border ml-2 mr-10"
      :style="{ backgroundImage: 'url(' + BACKGROUND + ')' }"
    />
    <div class="personal-image text-left mt-5 flex items-center">
      <figure class="personal-figure absolute w-32 h-32 my-0 mr-0 ml-7">
        <img
          :src="AVATAR"
          class="personal-avatar w-32 h-32 rounded-full"
          alt="avatar"
        />
      </figure>
      <div class="absolute left-80 font-semibold text-xl mt-3">
        Nguyen Huynh Chi Bao
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
  BACKGROUND,
} from '../../../constants/image';
export default {
  name: 'Profile',
  components: {},
  created() {
    this.BACKGROUND = BACKGROUND;
    this.AVATAR = AVATAR;
  },
  data() {
    return {
      BACKGROUND: BACKGROUND,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &-background {
    height: 350px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.personal-image input[type='file'] {
  display: none;
}
.personal-figure {
  top: 365px;
  left: 150px;
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
</style>
