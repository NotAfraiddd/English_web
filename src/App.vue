<template>
  <router-view />
</template>
<script>
import { HEART } from './constants/image';
export default {
  name: 'UserLayout',
  created() {
    this.HEART = HEART;
  },
  data() {
    return {
      numberNotifications: 0,
    };
  },
  mounted() {
    this.$notification.open({
      message: 'Notification',
      description: 'You have a new notification',
      style: {
        width: '400px',
      },
    });
  },
};
</script>
<style lang="scss">
.ant-notification-notice-message {
  font-weight: 600;
  font-size: 18px !important;
}
.ant-notification-notice-description {
  font-size: 16px !important;
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
