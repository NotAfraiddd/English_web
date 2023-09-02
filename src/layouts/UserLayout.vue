<template>
  <div class="user-layout">
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  components: {},
};
</script>

<style lang="scss" scoped>
.user-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
    padding: 0px 20px;
  }
}
</style>
