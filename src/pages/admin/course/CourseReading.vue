<template>
  <div>
    <ButtonBack title="Course Reading" :hide-back="true" @back="onBack" />
    <ListCourse :data="listReading" @clicked="goToDetailCourse" />
    <div
      @click="goToCreateCourse"
      class="flex flex-col mt-5 h-auto cursor-pointer text-base flex-1 justify-between items-center border-dashed border-4 border-primary_black_opacity-600 gap-1 py-2 px-5 rounded-lg"
    >
      <div
        class="bg-text_back w-7 h-7 rounded-full text-xl font-semibold text-gray-400"
      >
        +
      </div>
      <div class="text-primary_black font-semibold">Add new course</div>
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import { EXAMPLE } from '../../../constants/image';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import courseApi from '../../../apis/course';
import { notification } from 'ant-design-vue';
import { mapMutations } from 'vuex';
export default {
  name: 'CourseReading',
  components: { ButtonBack, ListCourse },
  created() {
    this.EXAMPLE = EXAMPLE;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    this.idCourse = JSON.parse(localStorage.getItem('IDCourse'));
    this.getAllReading();
  },
  methods: {
    /**
     * get all session
     * @param {*} dataID
     */
    async getAllReading() {
      try {
        this.emitter.emit('isShowLoading', true);
        const arrAPI = await courseApi.getAllReadingSession({
          id: this.idCourse,
        });

        this.listReading = [];

        if (
          this.userInfor.role == 'ADMIN' ||
          this.userInfor.level == 'ADVANCED'
        ) {
          arrAPI.forEach((item) => {
            console.log(item);
            this.listReading.push({
              id: item?.id,
              title: item?.title,
              subTitle: item?.description,
              image: item?.imgURL || EXAMPLE,
              status: item?.sectionStatus == 'PENDING' ? true : false,
            });
          });
        } else {
          arrAPI.forEach((item) => {
            console.log(item);
            if (item?.sectionStatus == 'APPROVED') {
              this.listReading.push({
                id: item?.id,
                title: item?.description,
                subTitle: item?.textContent,
                image: item?.imgURL || EXAMPLE,
                status: false,
              });
            }
          });
        }
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    onBack() {
      this.$router.push({ name: 'Course' });
    },
    goToCreateCourse() {
      this.$router.push({ name: 'CreateCourseReading' });
    },
    goToDetailCourse(data) {
      if (!data?.item.status) {
        this.path = formatSpacerIntoHyphen(data.item.title);
        this.$router.push({
          name: 'DetailCourseReading',
          params: { name: this.path.toLowerCase() },
        });
      } else {
        notification.warning({ message: 'Session awaiting approval' });
      }
    },
  },
  data() {
    return {
      listReading: [],
      path: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
