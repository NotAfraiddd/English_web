<template>
  <div class="text-primary_black">
    <div class="flex justify-between flex-wrap gap-4 mb-10">
      <Notify :data="report" @clicked="changeUI" />
      <Notify :data="blog" @clicked="changeUI" />
    </div>
    <BaseTable
      :columns="columns"
      :data="data"
      extend-class="flex justify-center"
    />
  </div>
</template>

<script>
import BaseTable from "../../../components/common/BaseTable.vue";
import Notify from "../../../components/common/Notify.vue";
import { ARROW_LEFT, AVATAR } from "../../../constants/image";
import { NOTIFY, SCREEN } from "../../../constants/index";
export default {
  name: "Dashboard",
  components: { BaseTable, Notify },
  created() {
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
    this.SCREEN = SCREEN;
  },
  mounted() {
    if (this.screenUI == SCREEN.comment) {
      const containWidthElement = this.$refs.containWidth;
      console.log(containWidthElement);
    }
  },
  methods: {
    changeUI(data) {
      if (data == NOTIFY.comment)
        this.$router.push({ name: "CommentReported" });
      else if (data == NOTIFY.blog) this.$router.push({ name: "BlogPending" });
      else this.screenUI = SCREEN.dashboard;
    },
    changeBack() {
      this.screenUI = SCREEN.dashboard;
    },
  },
  data() {
    return {
      isHover: false,
      screenUI: SCREEN.dashboard,
      report: {
        id: NOTIFY.comment,
        subtitle: "Report",
        title: "Report comment",
      },
      blog: {
        id: NOTIFY.blog,
        subtitle: "Blog",
        title: "Blog pending approval",
      },
      listReported: [
        {
          comment: "John was reported for calling a comment",
          offense: "stupid",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "shut up !!! bitch",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "stupid",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "shut up !!! bitch",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "stupid",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "shut up !!! bitch",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "stupid",
        },
        {
          comment: "John was reported for calling a comment",
          offense: "shut up !!! bitch",
        },
      ],
      data: [
        {
          title: "Current level member",
          basic: 20,
          intermediate: 1,
          advanced: 15,
        },
        {
          title: "Blog",
          basic: 1,
          intermediate: 2,
          advanced: 3,
        },
        {
          title: "Online",
          basic: 1,
          intermediate: 2,
          advanced: 3,
        },
      ],
      columns: [
        {
          headerClass:
            "text-center border border-table_border h-20 w-60 bg-table_header",
          columnClass: "text-center border border-table_border h-20 w-60",
          title: "",
          key: "title",
        },
        {
          headerClass:
            "text-center border border-table_border h-20 w-60 bg-table_header",
          columnClass: "text-center border border-table_border h-20 w-60",
          title: "Basic Level",
          key: "basic",
        },
        {
          headerClass:
            "text-center  border border-table_border h-20 w-60 bg-table_header",
          columnClass: "text-center h-20 w-60 border border-table_border",
          title: "Intermediate Level",
          key: "intermediate",
        },
        {
          headerClass:
            "text-center border border-table_border h-20 w-60 bg-table_header",
          columnClass: "text-center h-20 w-60 border border-table_border",
          title: "Advanced Level",
          key: "advanced",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>