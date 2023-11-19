<template>
  <div class="text-primary_black">
    <ButtonBack title="Course pending" @back="changeBack" :hide-back="true" />
    <div class="mt-5">
      <div
        v-for="(item, index) in listCourse"
        :key="index"
        @click="goToDetail(item)"
        class="flex text-base flex-1 justify-between items-center mt-3 border px-5 rounded-lg h-auto hover:opacity-80 cursor-pointer"
      >
        <div class="flex items-center py-2 total-width mr-3">
          <img :src="item.avatar" alt="" class="h-10 w-10 rounded-full" />
          <div class="flex-1 flex items-start ml-3 flex-col">
            <div class="font-semibold">{{ item.name }} &nbsp;</div>
            <div class="flex items-end">
              Course: &nbsp;
              <div class="">
                {{ item.nameCourse }}
              </div>
            </div>
            <div class="flex items-end">
              Level: &nbsp;
              <div class="">
                {{
                  item.level == LEVEL.BEGINNER
                    ? 'Beginner'
                    : item.level == LEVEL.INTERMEDIATE
                    ? 'Intermediate'
                    : 'Advanced'
                }}
              </div>
            </div>
            <div class="flex items-end">
              Type: &nbsp;
              <div class="">
                {{
                  item.type == TYPE_COURSE.LISTENING ? 'Listening' : 'Reading'
                }}
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

    <div class="mt-5 flex justify-center">
      <a-pagination
        class="pagination"
        v-model:current="current"
        :showSizeChanger="false"
        v-model:page-size="pageSize"
        :total="100"
        @change="onShowSizeChange"
      />
    </div>
  </div>
</template>
<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import { AVATAR } from '../../../constants/image';
import { LEVEL, SOCKET, TYPE_COURSE } from '../../../constants';
import { formatSpacerIntoHyphen } from '../../../constants/function';
import { mapMutations } from 'vuex';

export default {
  name: 'CourseListeningPending',
  components: { ButtonBack },
  created() {
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
    this.AVATAR = AVATAR;
    this.LEVEL = LEVEL;
    this.TYPE_COURSE = TYPE_COURSE;
  },
  watch: {},
  mounted() {
    // reject
    this.sockets.subscribe('rejectCoursePending', (data) => {
      if (data.kind == SOCKET.REJECTED_COURSE_PENDING) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REJECTED_COURSE_PENDING,
        });
      }
    });
    const contentReject = {
      room: this.userID,
      kind: SOCKET.REJECTED_COURSE_PENDING,
    };
    this.$socket.emit('joinRoom', contentReject);
    // accept
    this.sockets.subscribe('coursePending', (data) => {
      if (data.kind == SOCKET.NOTIFY_COURSE_PENDING) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.NOTIFY_COURSE_PENDING,
        });
      }
    });
    const content = {
      room: this.userID,
      kind: SOCKET.NOTIFY_COURSE_PENDING,
    };
    this.$socket.emit('joinRoom', content);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    handleReject(data) {
      const dataSocket = {
        room: this.userID,
        kind: SOCKET.REJECTED_COURSE_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let content = {
        data: data,
        kind: SOCKET.REJECTED_COURSE_PENDING,
      };
      this.$socket.emit('sendSignal', content);
    },
    handleAprroved(data) {
      const dataSocket = {
        room: this.userID,
        kind: SOCKET.NOTIFY_COURSE_PENDING,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let content = {
        data: data,
        kind: SOCKET.NOTIFY_COURSE_PENDING,
      };
      this.$socket.emit('sendSignal', content);
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    changeBack() {
      this.$router.push({ name: 'Dashboard' });
    },
    goToDetail(data) {
      const path = formatSpacerIntoHyphen(data.nameCourse);
      const type = data.type == TYPE_COURSE.LISTENING ? 'Listening' : 'Reading';
      this.$router.push({
        name: 'DetailCourseListeningPending',
        params: { name: path, type: type, id: data.id },
      });
    },
  },
  data() {
    return {
      userID: null,
      numNotify: 0,
      current: 6,
      pageSize: 3,
      listCourse: [
        {
          id: 1,
          userID: 1,
          avatar: AVATAR,
          name: 'Chi Bao',
          level: LEVEL.BEGINNER,
          nameCourse: 'English is so good',
          type: TYPE_COURSE.LISTENING,
        },
        {
          id: 2,
          userID: 2,
          avatar: AVATAR,
          name: 'Chi Bao',
          level: LEVEL.INTERMEDIATE,
          nameCourse: 'English is so good',
          type: TYPE_COURSE.READING,
        },
        {
          id: 3,
          userID: 3,
          avatar: AVATAR,
          name: 'Chi Bao',
          level: LEVEL.ADVANCED,
          nameCourse: 'English is so good',
          type: TYPE_COURSE.LISTENING,
        },
      ],
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