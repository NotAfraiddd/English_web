<template>
  <ButtonBack title="Members" @back="changeBack" />
  <div class="text-primary_black mt-5">
    <BaseTable
      :columns="columns"
      :data="listMember"
      extend-class="flex justify-center flex-col"
    >
      <template #user="{ record }">
        <div
          @click="goToDetail(record.id)"
          class="flex items-center gap-3 hover:underline cursor-pointer hover:opacity-70"
        >
          <img
            :src="record.user.avatar || AVATAR"
            alt=""
            srcset=""
            class="w-10 h-10 rounded-full object-cover"
          />
          <div class="text-base text-overflow">{{ record.user.name }}</div>
        </div>
      </template>
      <template #level="{ record }">
        <div v-if="record.level == 0" class="text-base">Pending</div>
        <div v-else-if="record.level == 1" class="text-base">Beginner</div>
        <div v-else-if="record.level == 2" class="text-base">Intermediate</div>
        <div v-else class="text-base">Advanced</div>
      </template>
      <template #blog="{ record }">
        <div
          v-if="record.blog == 'PENDING' || record.blog == 'BEGINNER'"
          @click="handleEdit(record.blog)"
          class="text-base text-text_green cursor-pointer hover:opacity-70"
        >
          Unlocked
        </div>
        <div
          v-if="record.blog == 'ADVANCED' || record.blog == 'INTERMEDIATE'"
          @click="handleEdit(record.blog)"
          class="text-base text-text_red cursor-pointer hover:opacity-70"
        >
          Locked
        </div>
      </template>
    </BaseTable>
    <a-pagination
      class="pagination flex justify-center"
      v-model:current="current"
      :showSizeChanger="false"
      v-model:page-size="pageSize"
      :total="total"
      @change="onShowSizeChange"
    />
  </div>
  <!-- Modal edit status blog -->
  <ConfirmModal
    :showModal="modalEdit"
    @closeModal="closeModalEdit"
    @save="closeModalEdit"
    :showFooter="false"
    :widthCustom="500"
  >
    <template #icon>
      <img :src="LOCK_COLOR" alt="" srcset="" class="h-10 mb-4" />
    </template>
    <template #content>
      <div
        v-if="statusBlog == 1"
        class="text-lg flex text-center text-primary_black"
      >
        Do you want
        <p class="font-semibold text-text_green">&nbsp;unlocked&nbsp;</p>
        ?
      </div>
      <div v-else class="text-lg flex text-center text-primary_black">
        Do you want
        <p class="font-semibold text-text_red">&nbsp;locked&nbsp;</p>
        ?
      </div>
    </template>
    <template #select>
      <div class="flex gap-10">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="cancelUpdateStatusBlog"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="acceptUpdateStatusBlog"
        >
          <span class="text-base text-white">OK</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>

<script>
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import BaseTable from '../../../components/common/BaseTable.vue';
import {
  ARROW_LEFT,
  AVATAR,
  LOCK_COLOR,
  GARBAGE,
} from '../../../constants/image';
import { NOTIFY, SCREEN } from '../../../constants/index';
import { RENDER_TYPE } from '../../../constants/table';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import userApi from '../../../apis/user';
import moment from 'moment';

export default {
  name: 'Member',
  components: { BaseTable, ConfirmModal, ButtonBack },
  created() {
    this.GARBAGE = GARBAGE;
    this.LOCK_COLOR = LOCK_COLOR;
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
    this.SCREEN = SCREEN;
    this.getAllUser();
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.getAllUser();
    },
    async getAllUser() {
      const data = await userApi.getAllUser(1);
      data?.content.forEach((item) => {
        this.listMember.push({
          id: item.uid,
          user: {
            avatar: item?.avtURL,
            name: item?.fullName || item?.email,
          },
          gender: item?.gender ? 1 : 0,
          registration_date: moment(item?.registrationDate).format(
            'DD/MM/YYYY',
          ),
          level:
            item?.level == 'PENDING'
              ? 0
              : item?.level == 'BEGINNER'
              ? 1
              : item?.level == 'ADVANCED'
              ? 3
              : 2,
          blog: item?.level,
        });
      });
      this.total = data?.totalElements;
    },
    goToDetail(dataID) {
      this.$router.push({ name: 'AdminDetail', params: { id: dataID } });
    },
    // modal edit
    handleEdit(data) {
      this.statusBlog = data;
      this.modalEdit = true;
    },
    closeModalEdit() {
      this.modalEdit = false;
    },
    cancelUpdateStatusBlog() {
      this.modalEdit = false;
    },
    acceptUpdateStatusBlog() {
      this.modalEdit = false;
    },
  },
  data() {
    return {
      total: 0,
      current: 1,
      modalDelete: false,
      modalDeleteId: null,
      statusBlog: null,
      modalEdit: false,
      memberAPI: [],
      listMember: [],
      columns: [
        {
          headerClass:
            'text-center text-base h-20 w-60 bg-table_header border-b-0',
          columnClass: 'text-center text-base h-20 w-60',
          title: 'User',
          renderType: RENDER_TYPE.slot,
          slotName: 'user',
        },
        {
          headerClass:
            'text-center text-base h-20 w-60 bg-table_header border-b-0',
          columnClass: 'text-center text-base h-20 w-60',
          title: 'Gender',
          key: 'gender',
          render(record) {
            return record.gender == 0 ? 'Female' : 'Male';
          },
        },
        {
          headerClass:
            'text-center text-base h-20 w-60 bg-table_header border-b-0',
          columnClass: 'text-center text-base h-20 w-6',
          title: 'Registration Date',
          key: 'registration_date',
        },
        {
          headerClass:
            'text-center text-base h-20 w-60 bg-table_header border-b-0',
          columnClass: 'text-center text-base h-20 w-6',
          title: 'Level',
          renderType: RENDER_TYPE.slot,
          slotName: 'level',
        },
        {
          headerClass:
            'text-center text-base h-20 w-60 bg-table_header border-b-0',
          columnClass: 'text-center text-base h-20 w-6',
          title: 'Blog',
          renderType: RENDER_TYPE.slot,
          slotName: 'blog',
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
.text-overflow {
  flex: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
