<template>
  <ButtonBack title="Reported comments" @back="changeBack" :hide-back="true" />
  <div
    v-for="(item, index) in listReported"
    :key="index"
    class="flex text-base flex-1 justify-between items-center mt-3 border px-5 rounded-lg h-auto"
  >
    <div class="flex items-center py-2 total-width mr-3">
      <Avatar
        :imgUrl="item.avatar"
        :name="item.userName || item.fullName"
        class="w-9 h-9"
      />
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
</template>

<script>
import blog from '../../../apis/blog';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import { ARROW_LEFT, AVATAR, ADMIN } from '../../../constants/image';
import { NOTIFY, SOCKET } from '../../../constants/index';
import { mapMutations } from 'vuex';
import authUser from '../../../apis/auth';
import Avatar from '../../../components/common/Avatar.vue';
export default {
  name: 'CommentReported',
  components: { ButtonBack, Avatar },
  created() {
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    if (this.userInfor) {
      this.getAllReport();
    }
  },
  methods: {
    ...mapMutations('notify', ['setNotify']),
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.getAllReport();
    },
    async getAllReport() {
      this.listReported = [];
      const dataReport = await blog.getAllReportComment(this.current);
      dataReport.content.forEach((item) => {
        if (item?.reportStatus == 'PENDING')
          this.listReported.push({
            userID: item?.postedUser,
            avatar: item?.comment?.postedUser?.avtURL,
            comment: 'Someone have just been reported with content',
            offense: item.content,
            userName: item?.comment?.postedUser?.email,
            fullName: item?.comment?.postedUser?.fullName,
            idComment: item?.id,
          });
      });
    },

    async handleRejected(data) {
      console.log(data);
      this.idUserReportComment = +data.userID;
      // join socket rejectcomment
      const dataSocket = {
        room: this.idUserReportComment,
        kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
      };
      this.$socket.emit('joinRoom', dataSocket);
      let content = {
        data: data,
        name: this.userInfor.fullName,
        avatar: this.userInfor.avtURL,
        admin: this.userInfor.role == 'ADMIN' ? true : false,
        kind: SOCKET.REJECTED_COMMENT_REPORTED_FROM_ADMIN,
      };
      this.$socket.emit('sendSignal', content);
      // remove item out list( call api)
      try {
        await authUser.unBlockUser({
          userName: data?.userName,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.getAllReport();
      }
    },
    async handleApproved(data) {
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
          name: this.userInfor.fullName,
          avatar: this.userInfor.avtURL,
          admin: this.userInfor.role == 'ADMIN' ? true : false,
          kind: SOCKET.NOTIFY_COMMENT_REPORTED_FROM_ADMIN,
        };
        this.$socket.emit('sendSignal', content);
        // remove item out list( call api)
        try {
          await authUser.blockUser({
            id: data?.idComment,
          });
        } catch (error) {
          console.log(error);
        } finally {
          this.getAllReport();
        }
      }
    },
    changeBack() {
      this.$router.push(`/admin`);
    },
  },
  data() {
    return {
      current: 1,
      pageSize: 0,
      idUserReportComment: null,
      userInfor: null,
      numNotify: 0,
      listReported: [],
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
