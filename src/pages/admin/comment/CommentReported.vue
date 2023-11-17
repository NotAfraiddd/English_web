<template>
  <ButtonBack title="Reported comments" @back="changeBack" :hide-back="true" />
  <div
    v-for="(item, index) in listReported"
    :key="index"
    class="flex text-base flex-1 justify-between items-center mt-3 border px-5 rounded-lg h-auto"
  >
    <div class="flex items-center py-2 total-width mr-3">
      <img :src="item.avatar" alt="" srcset="" class="h-10 w-10 rounded-full" />
      <div class="flex-1 flex items-start ml-3 flex-col">
        <div>{{ item.comment }} &nbsp;</div>
        <div class="font-semibold text-left">'{{ item.offense }}'</div>
      </div>
    </div>
    <div class="flex w-40 justify-between flex-wrap gap-2 group-button">
      <div
        @click="handleRejected(item)"
        class="text-text_red hover:text-red-600 cursor-pointer"
      >
        Rejected
      </div>
      <div
        @click="handleApproved(item)"
        class="text-text_green hover:text-green-600 cursor-pointer"
      >
        Approved
      </div>
    </div>
  </div>
  <div class="mt-5 flex justify-center">
    <a-pagination
      class="pagination"
      v-model:current="current"
      :showSizeChanger="false"
      v-model:page-size="pageSize"
      :total="500"
      @change="onShowSizeChange"
    />
  </div>
</template>

<script>
import ButtonBack from '../../../components/common/ButtonBack.vue';
import { ARROW_LEFT, AVATAR } from '../../../constants/image';
import { NOTIFY, SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';
export default {
  name: 'CommentReported',
  components: { ButtonBack },
  created() {
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
  },
  mounted() {
    // reject comment
    this.sockets.subscribe('rejectCommentReported', (data) => {
      if (data.kind == SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
        });
      }
    });
    const rejectContent = {
      room: this.idUserReportComment,
      kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
    };
    this.$socket.emit('joinRoom', rejectContent);
    // comment
    this.sockets.subscribe('commentReported', (data) => {
      if (data.kind == SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN) {
        this.numNotify++;
        this.setNotify({
          id: 1,
          numberNotifications: this.numNotify,
          content: data.data,
          kind: SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN,
        });
      }
    });
    const content = {
      room: this.idUserReportComment,
      kind: SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN,
    };
    this.$socket.emit('joinRoom', content);
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    handleRejected(data) {
      if (!data.status) {
        this.idUserReportComment = +data.userID;
        // join socket rejectcomment
        const dataSocket = {
          room: this.idUserReportComment,
          kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
        };
        this.$socket.emit('joinRoom', dataSocket);
        let content = {
          data: data,
          kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
        };
        this.$socket.emit('sendSignal', content);
        // remove item out list( call api)
        this.listReported = this.listReported.filter(
          (item) => item.userID !== this.idUserReportComment,
        );
      }
    },
    handleApproved(data) {
      if (!data.status) {
        this.idUserReportComment = +data.userID;
        // join socket react
        const dataSocket = {
          room: this.idUserReportComment,
          kind: SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN,
        };
        this.$socket.emit('joinRoom', dataSocket);
        let content = {
          data: data,
          kind: SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN,
        };
        this.$socket.emit('sendSignal', content);
        // remove item out list( call api)
        this.listReported = this.listReported.filter(
          (item) => item.userID !== this.idUserReportComment,
        );
      }
    },
    changeBack() {
      this.$router.push(`/admin`);
    },
  },
  data() {
    return {
      idUserReportComment: null,
      numNotify: 0,
      listReported: [
        {
          userID: 1,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense: 'stupid',
        },
        {
          userID: 2,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense: 'shut up !!! bitch',
        },
        {
          userID: 3,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense: 'stupid 2',
        },
        {
          userID: 4,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense: 'shut up !!! bitch',
        },
        {
          userID: 5,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense: 'stupid 3',
        },
        {
          userID: 6,
          avatar: AVATAR,
          status: false,
          comment: 'John was reported for calling a comment',
          offense:
            'shut up !!! bitch John was reported for calling a comment John was reported for calling a comment John was reported for calling a comment ch John was reported for calling a comment John was reported for calling a comment John was reported for calling a comment',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.total-width {
  width: 88%;
}
.group-button {
  @media screen and (max-width: 1000px) {
    width: 5rem;
  }
}

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
