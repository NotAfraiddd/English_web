<template>
  <div class="text-primary_black">
    <div class="flex justify-around flex-wrap gap-4 mb-10">
      <Notify :data="report" :num-notify="numReport" @clicked="changeUI" />
      <Notify :data="blog" :num-notify="numBlog" @clicked="changeUI" />
      <Notify :data="course" :num-notify="numCourse" @clicked="changeUI" />
    </div>
    <BaseTable
      :columns="columns"
      :data="dataInformation"
      extend-class="flex justify-center"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import courseApi from '../../../apis/course';
import userApi from '../../../apis/user';
import blogApi from '../../../apis/blog';
import BaseTable from '../../../components/common/BaseTable.vue';
import Notify from '../../../components/common/Notify.vue';
import { ARROW_LEFT, AVATAR } from '../../../constants/image';
import { NOTIFY, SCREEN } from '../../../constants/index';
export default {
  name: 'Dashboard',
  components: { BaseTable, Notify },
  created() {
    this.AVATAR = AVATAR;
    this.ARROW_LEFT = ARROW_LEFT;
    this.NOTIFY = NOTIFY;
    this.SCREEN = SCREEN;
    this.getAllCoursePending();
    this.getAllPost();
    this.getUserByLevel();
    this.getBlogByLevel();
    this.getOnlineByLevel();
  },
  mounted() {
    if (this.screenUI == SCREEN.comment) {
      const containWidthElement = this.$refs.containWidth;
    }
  },
  computed: {
    ...mapState('course', ['numCourse']),
    ...mapState('blog', ['numBlog']),
  },
  methods: {
    ...mapMutations('course', ['setNumberCourse']),
    ...mapMutations('blog', ['setNumBlog']),
    /**
     * get all user by level
     */
    async getUserByLevel() {
      try {
        this.emitter.emit('isShowLoading', true);
        this.userLevel.basic = await userApi.getTotalUserByLevel(1);
        this.userLevel.intermediate = await userApi.getTotalUserByLevel(2);
        this.userLevel.advanced = await userApi.getTotalUserByLevel(3);
        this.dataInformation[0].basic = this.userLevel.basic;
        this.dataInformation[0].intermediate = this.userLevel.intermediate;
        this.dataInformation[0].advanced = this.userLevel.advanced;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get all blog by level
     */
    async getBlogByLevel() {
      try {
        this.emitter.emit('isShowLoading', true);
        this.blogLevel.basic = await userApi.getTotalBlogByLevel(1);
        this.blogLevel.intermediate = await userApi.getTotalBlogByLevel(2);
        this.blogLevel.advanced = await userApi.getTotalBlogByLevel(3);
        this.dataInformation[1].basic = this.blogLevel.basic;
        this.dataInformation[1].intermediate = this.blogLevel.intermediate;
        this.dataInformation[1].advanced = this.blogLevel.advanced;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get all blog by level
     */
    async getOnlineByLevel() {
      try {
        this.emitter.emit('isShowLoading', true);
        this.onlineLevel.basic = await userApi.getTotalOnlineByLevel(1);
        this.onlineLevel.intermediate = await userApi.getTotalOnlineByLevel(2);
        this.onlineLevel.advanced = await userApi.getTotalOnlineByLevel(3);
        this.dataInformation[2].basic = this.onlineLevel.basic;
        this.dataInformation[2].intermediate = this.onlineLevel.intermediate;
        this.dataInformation[2].advanced = this.onlineLevel.advanced;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get all blog
     */
    async getAllPost() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getAllPostByStatus({
          postStatus: 0,
          index: 1,
          pageSize: 10,
        });
        this.setNumBlog(data?.totalElements);
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    /**
     * get all course pending
     */
    async getAllCoursePending() {
      try {
        const data = await courseApi.allCourse();
        let course = [];
        data.forEach((item) => {
          if (item.courseStatus == 'PENDING') {
            course.push(item);
          } else {
            if (item?.courseLevel != 'PENDING') {
              if (item?.readingSectionList.length != 0) {
                item?.readingSectionList.forEach((ele) => {
                  if (ele?.sectionStatus == 'PENDING') course.push(ele);
                });
              }
              if (item?.listeningSectionList.length != 0) {
                item?.listeningSectionList.forEach((ele) => {
                  if (ele?.sectionStatus == 'PENDING') course.push(ele);
                });
              }
            }
          }
        });
        this.setNumberCourse(course.length);
      } catch (error) {
        console.log(error);
      }
    },
    changeUI(data) {
      if (data == NOTIFY.comment)
        this.$router.push({ name: 'CommentReported' });
      else if (data == NOTIFY.blog) this.$router.push({ name: 'BlogPending' });
      else if (data == NOTIFY.course)
        this.$router.push({ name: 'CoursePending' });
      else this.screenUI = SCREEN.dashboard;
    },
    changeBack() {
      this.screenUI = SCREEN.dashboard;
    },
  },
  data() {
    return {
      userLevel: {
        basic: 0,
        intermediate: 0,
        advanced: 0,
      },
      blogLevel: {
        basic: 0,
        intermediate: 0,
        advanced: 0,
      },
      onlineLevel: {
        basic: 0,
        intermediate: 0,
        advanced: 0,
      },
      isHover: false,
      screenUI: SCREEN.dashboard,
      numReport: 0,
      report: {
        id: NOTIFY.comment,
        subtitle: 'Report',
        title: 'Report comment',
      },
      blog: {
        id: NOTIFY.blog,
        subtitle: 'Blog',
        title: 'Blog pending',
      },
      course: {
        id: NOTIFY.course,
        subtitle: 'Course',
        title: 'Course pending',
      },
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
      ],
      dataInformation: [
        {
          title: 'Total member',
          basic: 20,
          intermediate: 1,
          advanced: 15,
        },
        {
          title: 'Total blog',
          basic: 1,
          intermediate: 2,
          advanced: 3,
        },
        {
          title: 'Total online',
          basic: 0,
          intermediate: 0,
          advanced: 0,
        },
      ],
      columns: [
        {
          headerClass:
            'text-center border border-table_border h-20 w-60 bg-table_header',
          columnClass: 'text-center border border-table_border h-20 w-60',
          title: '',
          key: 'title',
        },
        {
          headerClass:
            'text-center border border-table_border h-20 w-60 bg-table_header',
          columnClass: 'text-center border border-table_border h-20 w-60',
          title: 'Basic Level',
          key: 'basic',
        },
        {
          headerClass:
            'text-center  border border-table_border h-20 w-60 bg-table_header',
          columnClass: 'text-center h-20 w-60 border border-table_border',
          title: 'Intermediate Level',
          key: 'intermediate',
        },
        {
          headerClass:
            'text-center border border-table_border h-20 w-60 bg-table_header',
          columnClass: 'text-center h-20 w-60 border border-table_border',
          title: 'Advanced Level',
          key: 'advanced',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
