<template>
  <div class="admin-layout">
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.admin-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ct-button-blue,
  .ct-button-gray {
    font-weight: bold;
  }
}
</style>
