<template lang="">
  <div class="flex flex-column mt-5">
    <div class="editor-tab flex w-full h-8 leading-8">
      <div
        :class="[
          'w-40 cursor-default',
          {
            active: activeTab === ACTIVE_TAB.write,
            'border border-b-0 rounded-t-md': activeTab === ACTIVE_TAB.write,
            'border-b ': activeTab !== ACTIVE_TAB.write,
          },
        ]"
      >
        <div @click="switchTab(ACTIVE_TAB.write)">Write</div>
      </div>
      <div
        :class="[
          'w-40 cursor-default',
          {
            active: activeTab === ACTIVE_TAB.preview,
            'border border-b-0 rounded-t-md ': activeTab === ACTIVE_TAB.preview,
            'border-b ': activeTab !== ACTIVE_TAB.preview,
          },
        ]"
      >
        <div @click="switchTab(ACTIVE_TAB.preview)">Preview</div>
      </div>
      <div class="w-full border-b" />
    </div>
    <div
      v-if="activeTab == 2"
      class="mt-4 text-left preview-transcript p-5"
      v-html="content"
    />

    <div v-else class="mt-5 transcript">
      <Editor
        api-key="5fr2axelvpc7iydici7ly3a3gnhamti3yn1ehjq7npd0ggiv"
        v-model="content"
        :init="editorConfig"
        @getContent="handleEditorChange"
      />
    </div>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue';
import { ACTIVE_TAB } from '../../constants/index';

export default {
  name: 'Word',
  components: { Editor },
  props: {
    contentProp: { type: String, default: '' },
  },
  created() {
    this.content = this.contentProp;
    this.ACTIVE_TAB = ACTIVE_TAB;
  },
  computed: {
    editorConfig() {
      return {
        statusbar: false,
        notifications: false,
        height: 400,
        menubar: false,
        plugins: [
          'advlist autolink link lists charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking',
          'table emoticons template paste help',
        ],
        toolbar:
          'styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link |  preview fullscreen | code' +
          'forecolor backcolor emoticons | help | fontsize ',
        font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      };
    },
  },

  watch: {
    contentProp(newValue) {
      this.content = newValue;
    },
  },
  data() {
    return {
      content: this.contentProp,
      activeTab: ACTIVE_TAB.write,
    };
  },
  methods: {
    /**
     * emit event
     */
    handleEditorChange() {
      this.$emit('update', this.content);
    },
    switchTab(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/styles/editor';
</style>
