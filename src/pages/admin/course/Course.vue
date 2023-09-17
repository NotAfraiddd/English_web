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
    <ListTypeCourse :data="listCourses" @clicked="getData" />
    <div
      @click="showModalCreate"
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
  <!-- modal create -->
  <ConfirmModal
    :showModal="showModalCreateCourse"
    @closeModal="closeModalCreateCourse"
    @save="closeModalCreateCourse"
    :showFooter="false"
    :widthCustom="800"
  >
    <template #content>
      <div class="w-full font-bold text-center text-xl text-primary opacity-90">
        New Type Course
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-20"
        >
          Title
        </div>
        <input
          v-model="createTitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
          ref="errorInputTitle"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Subtitle
        </div>
        <input
          ref="errorInputSubtitle"
          v-model="createSubtitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Name course
        </div>
        <input
          ref="errorInputName"
          v-model="createName"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Background
        </div>
        <input
          v-model="createColor"
          class="input-type-course form-control h-10 text-left px-2 py-1 border cursor-pointer rounded-lg"
          ref="colorPicker"
          data-jscolor=""
          @input="
            createColorTemp?.length < 3 ? (createColorTemp = createColor) : null
          "
        />
      </div>
    </template>
    <template #select>
      <div class="flex justify-between items-center mt-3 gap-40">
        <div class="flex gap-10 mt-4">
          <div
            class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="cancelTypeCourse"
          >
            <span class="text-base text-primary">Cancel</span>
          </div>
          <div
            class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
            @click="createTypeCourse"
          >
            <span class="text-base text-white">Create</span>
          </div>
        </div>
      </div>
    </template>
  </ConfirmModal>
  <!-- modal edit -->
  <ConfirmModal
    :showModal="showModalChooseCourse"
    @closeModal="closeModalChoose"
    @save="closeModalChoose"
    :showFooter="false"
    :widthCustom="800"
  >
    <template #content>
      <div class="w-full font-bold text-center text-xl text-primary opacity-90">
        {{ createName }}
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-20"
        >
          Title
        </div>
        <input
          v-model="editTitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
          ref="editInputTitle"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Subtitle
        </div>
        <input
          v-model="editSubtitle"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
          ref="editInputSubtitle"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Name course
        </div>
        <input
          v-model="editNameCourse"
          type="text"
          class="input-type-course border rounded-lg form-control"
          spellcheck="false"
          ref="editInputName"
        />
      </div>
      <div class="flex w-full mt-5 justify-between">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base"
        >
          Background
        </div>
        <input
          id="editColorDisplay"
          v-model="editColor"
          class="input-type-course form-control h-10 text-left px-2 py-1 border cursor-pointer rounded-lg"
          ref="editColorPicker"
          data-jscolor=""
          @input="
            editColorPickerTemp?.length < 3
              ? (editColorPickerTemp = editColor)
              : null
          "
        />
      </div>
    </template>
    <template #select>
      <div class="flex justify-between items-center mt-3 gap-60">
        <div
          class="mt-4 cursor-pointer rounded-lg border-yellow-400 border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="editModal"
        >
          <span class="text-base text-yellow-400">Edit</span>
        </div>
        <div class="flex mt-4">
          <div class="flex gap-10">
            <div
              class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
              @click="goToListening"
            >
              <span class="text-base text-primary">Listening</span>
            </div>
            <div
              class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
              @click="goToReading"
            >
              <span class="text-base text-white">Reading</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ConfirmModal>
</template>
<script>
import BaseSearch from '../../../components/common/BaseSearch.vue';
import ButtonBack from '../../../components/common/ButtonBack.vue';
import ListTypeCourse from '../../../components/common/ListTypeCourse.vue';
import jscolor from '@eastdesire/jscolor';
import { NOTIFY, NOTIFY_MESSAGE } from '../../../constants';
import ConfirmModal from '../../../components/admin/ConfirmModal.vue';
import { AVATAR, TITLE, ADMIN_COURSE } from '../../../constants/image';
import { notification } from 'ant-design-vue';
import { formatSpacerIntoHyphen } from '../../../constants/function';
export default {
  name: 'Course',
  components: { BaseSearch, ListTypeCourse, ButtonBack, ConfirmModal },
  created() {
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.ADMIN_COURSE = ADMIN_COURSE;
    this.TITLE = TITLE;
    this.AVATAR = AVATAR;
    this.NOTIFY = NOTIFY;
    this.formatSpacerIntoHyphen = formatSpacerIntoHyphen;
  },

  watch: {
    createTitle() {
      this.$refs.errorInputTitle.classList.remove('border-red-500');
    },
    createSubtitle() {
      this.$refs.errorInputSubtitle.classList.remove('border-red-500');
    },
    createName() {
      this.$refs.errorInputName.classList.remove('border-red-500');
    },
  },

  methods: {
    handleEditUpdate(record) {
      console.log(record);
    },
    goToListening() {
      this.$router.push({
        name: 'CourseListening',
        params: {
          course: formatSpacerIntoHyphen(this.editNameCourse).toLowerCase(),
        },
      });
    },
    goToReading() {
      this.$router.push({
        name: 'CourseReading',
        params: {
          course: formatSpacerIntoHyphen(this.editNameCourse).toLowerCase(),
        },
      });
    },
    cancelTypeCourse() {
      this.createTitle = '';
      this.createSubtitle = '';
      this.createColor = '#000000';
      this.createName = '';
      this.showModalCreateCourse = false;
    },
    createTypeCourse() {
      if (
        this.createTitle &&
        this.createName &&
        this.createSubtitle &&
        this.createColor
      ) {
        this.listCourses.push({
          id: this.listCourses.length,
          title: this.createTitle,
          subtitle: this.createSubtitle,
          color: this.createColor,
          name: this.createName,
        });
        this.cancelTypeCourse();
      } else {
        notification.error({ message: NOTIFY_MESSAGE.CREATE_FAILED });
      }
      if (!this.createTitle) {
        this.$refs.errorInputTitle.classList.remove('border');
        this.$refs.errorInputTitle.classList.add('border-red-500');
      }
      if (!this.createSubtitle) {
        this.$refs.errorInputSubtitle.classList.remove('border');
        this.$refs.errorInputSubtitle.classList.add('border-red-500');
      }
      if (!this.createName) {
        this.$refs.errorInputName.classList.remove('border');
        this.$refs.errorInputName.classList.add('border-red-500');
      }
      if (!this.createColor) {
        this.$refs.colorPicker.classList.remove('border');
        this.$refs.colorPicker.classList.add('border-red-500');
      }
    },
    editModal() {
      if (
        this.editTitle &&
        this.editNameCourse &&
        this.editSubtitle &&
        this.editColor
      ) {
        //         id:4
        // title:"Grammar"
        // subtitle:"English for individuals with basic knowledge."
        // percentages:Array[1]
        // name:"Grammar English Course"
        // courseFinished:"3/10"
        // color:"#7C89CE"
        const courseToEdit = this.listCourses.find(
          (course) => course.id === this.editID,
        );
        if (courseToEdit)
          this.listCourses.push({
            id: this.editID,
            title: this.editTitle,
            subtitle: this.editSubtitle,
            color: this.editColor,
            name: this.editNameCourse,
          });
        this.showModalChooseCourse = false;
      } else {
        notification.error({ message: NOTIFY_MESSAGE.UPDATE_FAILED });
      }
      if (!this.editTitle) {
        this.$refs.editInputTitle.classList.remove('border');
        this.$refs.editInputTitle.classList.add('border-red-500');
      }
      if (!this.editSubtitle) {
        this.$refs.editInputSubtitle.classList.remove('border');
        this.$refs.editInputSubtitle.classList.add('border-red-500');
      }
      if (!this.editNameCourse) {
        this.$refs.editInputName.classList.remove('border');
        this.$refs.editInputName.classList.add('border-red-500');
      }
      if (!this.editColor) {
        this.$refs.editColorPicker.classList.remove('border');
        this.$refs.editColorPicker.classList.add('border-red-500');
      }
    },
    getData(data) {
      this.editID = data.item.id;
      this.editTitle = data.item.title;
      this.editSubtitle = data.item.subtitle;
      this.editNameCourse = data.item.name;
      this.editColor = data.item.color;
      this.showModalChooseCourse = true;
      this.handleEditColor();
    },
    showModalCreate() {
      this.showModalCreateCourse = true;
      this.handleCreateColor();
    },
    closeModalCreateCourse() {
      this.showModalCreateCourse = false;
    },
    closeModalChoose() {
      this.showModalChooseCourse = false;
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
    handleCreateColor() {
      this.createColorTemp = this.createColor;
      // NOTE: Waitting DOM is updated before we access into DOM
      this.$nextTick(() => {
        this.createColorPickerTemp = new jscolor(this.$refs.colorPicker, {
          width: 120,
          position: 'top',
        });
        // NOTE: always set jscolor.init() before always show to set changing color
        jscolor.init();
        // this.colorPickerTemp.show();
      });
    },
    handleEditColor() {
      this.editColorTemp = this.editColor;
      // NOTE: Waitting DOM is updated before we access into DOM
      this.$nextTick(() => {
        if (!this.editColorPickerTemp) {
          this.editColorPickerTemp = new jscolor(this.$refs.editColorPicker, {
            width: 120,
            position: 'top',
          });
          jscolor.init();
        }
        this.editColorPickerTemp.fromString(this.editColor);
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
      showModalChooseCourse: false,
      showModalCreateCourse: false,
      createTitle: '',
      createSubtitle: '',
      createName: '',
      createColor: '#000000',
      createColorTemp: '',
      createColorPickerTemp: '',
      editID: null,
      editTitle: '',
      editSubtitle: '',
      editNameCourse: '',
      editColor: '#000000',
      editColorTemp: '',
      editColorPickerTemp: null,
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
          // percentages: [{ percentage: 30 }],
          name: 'Basic English Course',
          // courseFinished: '3/10',
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

.input-type-course {
  width: calc(100% - 128px);
}
</style>
