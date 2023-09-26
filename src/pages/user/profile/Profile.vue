<template>
  <div>Profile</div>
</template>
<script>
import { LEARN } from '../../../constants/image';
export default {
  name: 'HomeUser',
  components: {},
  created() {
    this.LEARN = LEARN;
  },
  data() {
    return {
      modalChooseCourse: false,
    };
  },
  methods: {
    closeModalChoose() {
      this.modalChooseCourse = false;
    },
    getData(data) {
      if (data.status) {
        this.modalChooseCourse = data.status;
      }
    },
    goToListening() {},
    goToReading() {},
  },
};
</script>

<style lang="scss" scoped></style>
