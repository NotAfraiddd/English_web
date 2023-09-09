<template>
  <GroupBack title="Reported comments" @back="changeBack" :hide-back="true" />
  <div
    v-for="(item, index) in listReported"
    :key="index"
    class="flex text-base flex-1 justify-between items-center mt-3 border px-5 rounded-lg h-auto"
  >
    <div class="flex items-center py-2 total-width mr-3">
      <img :src="AVATAR" alt="" srcset="" class="h-10 w-10 rounded-full" />
      <div class="flex-1 flex items-start ml-3 flex-col">
        <div>{{ item.comment }} &nbsp;</div>
        <div class="font-semibold text-left">'{{ item.offense }}'</div>
      </div>
    </div>
    <div class="flex w-40 justify-between flex-wrap gap-2 group-button">
      <div class="text-red-500 hover:text-red-600 cursor-pointer">Rejected</div>
      <div class="text-green-500 hover:text-green-600 cursor-pointer">
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
import GroupBack from '../../../components/common/GroupBack.vue';
import { ARROW_LEFT, AVATAR } from '../../../constants/image';
import { NOTIFY } from '../../../constants/index';
export default {
  name: 'CommentReported',
  components: { GroupBack },
  created() {
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
  },
  methods: {
    changeBack() {
      this.$router.push(`/admin`);
    },
  },
  data() {
    return {
      listReported: [
        {
          comment: 'John was reported for calling a comment',
          offense: 'stupid',
        },
        {
          comment: 'John was reported for calling a comment',
          offense: 'shut up !!! bitch',
        },
        {
          comment: 'John was reported for calling a comment',
          offense: 'stupid',
        },
        {
          comment: 'John was reported for calling a comment',
          offense: 'shut up !!! bitch',
        },
        {
          comment: 'John was reported for calling a comment',
          offense: 'stupid',
        },
        {
          comment: 'John was reported for calling a comment',
          offense:
            'shut up !!! bitch John was reported for calling a comment John was reported for calling a comment John was reported for calling a comment',
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
