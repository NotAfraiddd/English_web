<template>
  <div>
    <GroupBack title="Create Course" @back="changeBack" :hide-back="true" />
    <!-- title -->
    <div class="flex gap-10">
      <div class="flex mt-5 w-1/2">
        <div class="flex create-course__title">
          <div
            class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-2"
          >
            Title
          </div>
          <img :src="STAR_RED" alt="" srcset="" class="w-2 h-2 my-auto" />
        </div>
        <input
          type="text"
          class="w-full border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="flex mt-5 w-1/2">
        <div
          class="text-primary_black h-10 leading-10 text-left font-semibold text-base mr-5 create-course__title"
        >
          Background
        </div>
        <input
          v-model="color"
          class="input-color h-10 text-left w-full px-2 py-1 border cursor-pointer rounded-lg"
          ref="colorPicker"
          data-jscolor=""
          @input="colorTemp?.length < 3 ? (colorTemp = color) : null"
        />
      </div>
    </div>
    <div class="flex mt-5">
      <div
        class="h-10 leading-10 text-primary_black text-left font-semibold text-base create-course__subtitle"
      >
        Subtitle
      </div>
      <input
        type="text"
        class="w-full border rounded-lg form-control"
        spellcheck="false"
      />
    </div>
    <!-- listening -->
    <GroupBack title="Listening" extend-class="mt-5" />
    <Audio :data-prop="selectedAudio" />
    <GroupBack title="Transcript" extend-class="mt-5" />
    <Word :contentProp="content" @update="updateContent" />
  </div>
</template>
<script>
import jscolor from '@eastdesire/jscolor';
import GroupBack from '../../../components/common/GroupBack.vue';
import Audio from '../../../components/common/Audio.vue';
import Word from '../../../components/common/Editor.vue';
import { STAR_RED } from '../../../constants/image';
export default {
  name: 'CreateCourse',
  components: { GroupBack, Audio, Word },
  created() {
    this.handleEditColor();
    this.STAR_RED = STAR_RED;
  },

  methods: {
    changeBack() {
      this.$router.push({ name: 'Course' });
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
          position: 'bottom',
        });
        // NOTE: always set jscolor.init() before always show to set changing color
        jscolor.init();
        // this.colorPickerTemp.show();
      });
    },
  },
  computed: {},

  data() {
    return {
      color: '#000000',
      colorTemp: '',
      colorPickerTemp: '',
      selectedAudio: null,
    };
  },
};
</script>

<style lang="scss">
// color
.input-color {
  &:focus-visible {
    outline: none;
  }
}
.create-course {
  &__title,
  &__subtitle {
    min-width: 100px;
  }
}
</style>
