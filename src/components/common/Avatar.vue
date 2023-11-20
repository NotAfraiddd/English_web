<template lang="">
  <div
    class="base-avatar text-base flex justify-center items-center rounded-full"
    :class="externalClass"
  >
    <img v-if="imgUrl" :src="imgUrl" alt="base-avatar" class="img-fluid" />
    <span v-else>{{ firstCharName }}</span>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    externalClass: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    firstCharName() {
      return this.name?.slice(0, 1)?.toUpperCase();
    },
  },
};
</script>
<style lang="scss" scoped>
.base-avatar {
  overflow: hidden;
  box-shadow: 0 0px 30px rgba($color: #000000, $alpha: 0.1);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
