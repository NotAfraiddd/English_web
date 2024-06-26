<template>
  <div class="text-primary_black">
    <ButtonBack title="Course pending" @back="changeBack" :hide-back="true" />
    <div class="mt-5" v-if="listCourse.length != 0">
      <div
        v-for="(item, index) in listCourse"
        :key="index"
        @click="goToDetail(item)"
        class="flex text-base flex-1 justify-between items-center mt-3 border px-5 rounded-lg h-auto hover:opacity-80 cursor-pointer"
      >
        <div class="flex items-center py-2 total-width mr-3">
          <Avatar
            :imgUrl="item.avatar"
            :name="item.name || item.userID"
            externalClass="h-10 w-10 rounded-full"
          />
          <div class="flex-1 flex items-start ml-3 flex-col">
            <div class="font-semibold">
              {{ item.name || item.userID }} &nbsp;
            </div>
            <div class="flex items-end">
              Course: &nbsp;
              <div class="">
                {{ item.nameCourse }}
              </div>
            </div>
            <div class="flex items-end">
              Level: &nbsp;
              <div class="">
                {{ item.level }}
              </div>
            </div>
            <div class="flex items-end">
              Type: &nbsp;
              <div :class="item.type === 'Course' && 'text-text_green'">
                {{ item.type }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-40 justify-between flex-wrap gap-2 group-button">
          <div
            @click.stop="handleReject(item)"
            class="text-text_red hover:text-red-600 cursor-pointer"
          >
            Rejected
          </div>
          <div
            @click.stop="handleAprroved(item)"
            class="text-text_green hover:text-green-600 cursor-pointer"
          >
            Approved
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-5 font-semibold text-xl">No data</div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import { AVATAR } from '../../../constants/image';
import { LEVEL, SOCKET, TYPE_COURSE } from '../../../constants';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import Avatar from '../../../components/common/Avatar.vue';
import courseApi from '../../../apis/course';
import { mapMutations } from 'vuex';
import { notification } from 'ant-design-vue';

export default {
  name: 'CoursePending',
  components: { ButtonBack, Avatar },
  created() {
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.AVATAR = AVATAR;
    this.LEVEL = LEVEL;
    this.TYPE_COURSE = TYPE_COURSE;
    this.getAllCoursePending();
  },
  watch: {},
  methods: {
    ...mapMutations('course', ['setIDCourse', 'setNumberCourse']),
    ...mapMutations('notify', ['setNotify']),
    /**
     * get all course pending
     */
    async getAllCoursePending() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await courseApi.allCourse();
        data.forEach((item) => {
          let modifiedLevel =
            item?.courseLevel.charAt(0).toUpperCase() +
            item?.courseLevel.slice(1).toLowerCase();
          if (item.courseStatus == 'PENDING') {
            this.userID = item?.creatorUserid?.uid;
            this.listCourse.push({
              id: item?.id,
              userID: item?.creatorUserid?.uid,
              avatar: item?.creatorUserid?.avatar || '',
              name: item?.creatorUserid?.fullName || '',
              level: modifiedLevel,
              nameCourse: item?.name,
              type: 'Course',
              colorCode: item?.colorCode,
            });
          } else {
            if (item.courseLevel != 'PENDING') {
              if (item?.readingSectionList) {
                item?.readingSectionList.forEach((ele) => {
                  if (ele.sectionStatus == 'PENDING') {
                    this.listCourse.push({
                      id: item?.id + '-' + ele.id,
                      idSection: ele?.id,
                      userID: item?.creatorUserid?.uid,
                      avatar: item?.creatorUserid?.avatar || '',
                      name: item?.creatorUserid?.fullName || '',
                      level: modifiedLevel,
                      nameCourse: ele?.title,
                      type: 'Reading',
                    });
                  }
                });
              }
              if (item?.listeningSectionList) {
                item?.listeningSectionList.forEach((ele) => {
                  if (ele.sectionStatus == 'PENDING') {
                    this.listCourse.push({
                      id: item?.id + '-' + ele.id,
                      idSection: ele?.id,
                      userID: item?.creatorUserid?.uid,
                      avatar: item?.creatorUserid?.avatar || '',
                      name: item?.creatorUserid?.fullName || '',
                      level: modifiedLevel,
                      nameCourse: ele?.title,
                      type: 'Listening',
                    });
                  }
                });
              }
            }
          }
        });
        this.setNumberCourse(this.listCourse.length);
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * reject
     */
    async handleReject(data) {
      if (typeof data.id == 'number') {
        this.idCourse = data.id;
        try {
          this.emitter.emit('isShowLoading', true);
          const data = await courseApi.rejectedCourse({ id: this.idCourse });
          const dataSocket = {
            room: this.userID,
            kind: SOCKET.REJECTED_COURSE_PENDING,
          };
          this.$socket.emit('joinRoom', dataSocket);
          let content = {
            data: data,
            kind: SOCKET.REJECTED_COURSE_PENDING,
          };
          notification.success({ message: 'Reject course' });
          this.$socket.emit('sendSignal', content);
        } catch (error) {
          this.emitter.emit('isShowLoading', false);
          console.log(error);
        } finally {
          this.listCourse = [];
          await this.getAllCoursePending();
        }
      } else {
        let number = +data.id.split('-').pop();
        let dataReading = null;
        let dataListeing = null;
        try {
          if (data?.type == 'Reading') {
            dataReading = await courseApi.rejectedReadingSession({
              id: number,
            });
            notification.success({
              message: 'Rejected section reading successfully',
            });
          }
          if (data?.type == 'Listening') {
            dataListeing = await courseApi.rejectedListeningSession({
              id: number,
            });
            notification.success({
              message: 'Rejected section listening successfully',
            });
          }

          const dataSocket = {
            room: this.userID,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          this.$socket.emit('joinRoom', dataSocket);
          let content = {
            data: data?.type == 'Reading' ? dataReading : dataListeing,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          this.$socket.emit('sendSignal', content);
        } catch (error) {
          this.emitter.emit('isShowLoading', false);
          console.log(error);
        } finally {
          this.listCourse = [];
          await this.getAllCoursePending();
        }
      }
    },
    /**
     * approve
     */
    async handleAprroved(data) {
      if (typeof data.id == 'number') {
        this.idCourse = data.id;
        try {
          this.emitter.emit('isShowLoading', true);
          const data = await courseApi.approvedCourse({ id: this.idCourse });
          const dataSocket = {
            room: this.userID,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          this.$socket.emit('joinRoom', dataSocket);
          let content = {
            data: data,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          notification.success({ message: 'Approve course' });
          this.$socket.emit('sendSignal', content);
        } catch (error) {
          this.emitter.emit('isShowLoading', false);
          console.log(error);
        } finally {
          this.listCourse = [];
          await this.getAllCoursePending();
        }
      } else {
        let number = +data.id.split('-').pop();
        let dataReading = null;
        let dataListeing = null;
        try {
          if (data?.type == 'Reading') {
            dataReading = await courseApi.approvedReadingSession({
              id: number,
            });
            notification.success({
              message: 'Approved section reading successfully',
            });
          }
          if (data?.type == 'Listening') {
            dataListeing = await courseApi.approvedListeningSession({
              id: number,
            });
            notification.success({
              message: 'Approved section listening successfully',
            });
          }

          const dataSocket = {
            room: this.userID,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          this.$socket.emit('joinRoom', dataSocket);
          let content = {
            data: data?.type == 'Reading' ? dataReading : dataListeing,
            kind: SOCKET.NOTIFY_COURSE_PENDING,
          };
          this.$socket.emit('sendSignal', content);
        } catch (error) {
          this.emitter.emit('isShowLoading', false);
          console.log(error);
        } finally {
          this.listCourse = [];
          await this.getAllCoursePending();
        }
      }
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    changeBack() {
      this.$router.push({ name: 'Dashboard' });
    },
    goToDetail(data) {
      if (data.type != 'Course') {
        this.setIDCourse(data.id);
        localStorage.setItem('idCoursePending', data.id);
        if (data.type == 'Listening')
          this.$router.push({
            name: 'DetailCourseListeningPending',
            params: { id: data.idSection },
          });
        else {
          this.$router.push({
            name: 'DetailCourseReadingPending',
            params: { id: data.idSection },
          });
        }
      } else {
        notification.warn({ message: 'This is title of course, no section' });
      }
    },
  },
  data() {
    return {
      idCourse: null,
      userID: null,
      current: 6,
      pageSize: 3,
      listCourse: [],
    };
  },
};
</script>

<style lang="scss">
.ant-pagination-item:focus-visible a,
.ant-pagination-item-active a,
.ant-pagination-item:hover {
  border-color: rgba(81, 166, 221, 0.7);
  color: rgba(81, 166, 221, 0.7);
}
.ant-pagination-item,
.ant-pagination-prev .ant-pagination-item-link,
.ant-pagination-disabled .ant-pagination-item-link,
.ant-pagination-next .ant-pagination-item-link {
  border-color: #fff;
}
.ant-pagination-next .ant-pagination-item-link,
.ant-pagination-prev .ant-pagination-item-link {
  border: none;
}

.ant-pagination-item-active,
.ant-pagination-item:hover {
  border-radius: 50%;
  background-color: rgba(81, 166, 221, 0.7);
  a {
    color: #fff !important;
  }
}
</style>
