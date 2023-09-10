<template>
  <div>
    <div
      class="comment fixed bg-white"
      :class="{ 'menu-visible': showComment }"
    >
      Nội dung của comment
    </div>
    <div
      class="overlay fixed"
      :class="{ 'overlay-visible': showComment }"
      @click="handleCloseComment"
    />
    <ButtonBack title="Course" :hideBack="false" />
    <BaseSearch :search="inputSearch" @update="updateValue" />
    <ListCourse :data="listCourses" />
    <div
      @click="goToCreateCourse"
      class="flex flex-col h-auto cursor-pointer text-base flex-1 justify-between items-center mt-3 border-dashed border-4 border-primary_black_opacity-600 gap-1 py-2 px-5 rounded-lg"
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
import BaseSearch from '../../../components/common/BaseSearch.vue';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListCourse from '../../../components/common/ListCourse.vue';
import jscolor from '@eastdesire/jscolor';
import { NOTIFY } from '../../../constants';
import { AVATAR, TITLE } from '../../../constants/image';
BaseSearch;
export default {
  name: 'Course',
  components: { BaseSearch, ListCourse, ButtonBack },
  created() {
    this.TITLE = TITLE;
    this.AVATAR = AVATAR;
    this.NOTIFY = NOTIFY;
    this.handleEditColor();
  },

  methods: {
    goToCreateCourse() {
      this.$router.push({ name: 'CreateCourse' });
    },
    handleShowComment(data) {
      if (data.status) {
        this.showComment = true;
      }
    },
    /**
     * @description show colorPicker and resolve value color when user choose any color
     * @returns {void}
     */
    handleEditColor() {
      this.colorTemp = this.color;
      // NOTE: Waitting DOM is updated before we access into DOM
      this.$nextTick(() => {
        this.colorPickerTemp = new jscolor(this.$refs.colorPicker, {
          width: 120,
          position: 'top',
        });
        // NOTE: always set jscolor.init() before always show to set changing color
        jscolor.init();
        // this.colorPickerTemp.show();
      });
    },
    handleCloseComment() {
      this.showComment = false;
    },
    updateValue(data) {
      this.inputSearch = data;
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
  },
  data() {
    return {
      color: '000000',
      colorTemp: '',
      colorPickerTemp: '',
      inputSearch: '',
      showComment: false,
      showModal: false,
      current: 6,
      pageSize: 3,
      listCourses: [
        {
          id: 1,
          title: 'Basic Level',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 30 }],
          name: 'Basic English Course',
          courseFinished: '3/10',
          color: '#0068FF',
        },
        {
          id: 2,
          title: 'Intermediate Level',
          subtitle: 'English for individuals with intermediate knowledge.',
          percentages: [{ percentage: 65 }],
          name: 'Intermediate English Course',
          courseFinished: '3/10',
          color: '#AA53EE',
        },
        {
          id: 3,
          title: 'Advanced Level',
          subtitle: 'English for individuals with advanced knowledge.',
          percentages: [{ percentage: 10 }],
          name: 'Advanced English Course',
          courseFinished: '3/10',
          color: '#87CF2A',
        },
        {
          id: 4,
          title: 'Grammar',
          subtitle: 'English for individuals with basic knowledge.',
          percentages: [{ percentage: 90 }],
          name: 'Grammar English Course',
          courseFinished: '3/10',
          color: '#7C89CE',
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

///comement
.overlay {
  background-color: rgb(170 170 170 / 40%);
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  z-index: 1111;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out, left 0.5s ease-in-out;
}

.overlay-visible {
  opacity: 1;
  left: 0;
}

.comment {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  width: 524px;
  height: 100vh;
  right: -512px;
  top: 0;
  z-index: 9997;
}

.menu-visible {
  transform: translateX(0);
  right: 0;
}
</style>
