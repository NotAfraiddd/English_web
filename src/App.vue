<template>
  <router-view />
  <notifications position="top right" />
</template>
<script>
import { mapState } from 'vuex';
import { HOME_ICON } from './constants/image';

export default {
  created() {
    this.HOME_ICON = HOME_ICON;
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('notify', ['inforComment']),
  },
  watch: {
    inforComment(newVal, oldVal) {
      if (newVal.numberNotifications > 0)
        if (newVal.numberNotifications == 1)
          this.$notify({
            title: 'Notification',
            text: `You have ${newVal.numberNotifications} new notification`,
          });
        else
          this.$notify({
            title: 'Notification',
            text: `You have ${newVal.numberNotifications} new notifications`,
          });
    },
  },
};
</script>
<style lang="scss">
.vue-notification {
  font-size: 16px !important;
  padding: 10px 20px !important;
  color: #615a5a !important;
  background: #fff !important;
  border: 1px solid #d4e8fd !important;
  position: absolute;
  top: 50px;
  right: 10px;
  width: 300px;
}
body {
  ::selection {
    background-color: #f05123;
  }
}
#app {
  font-family: 'Jost', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
