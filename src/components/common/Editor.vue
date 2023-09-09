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
      class="mt-4 text-left preview-transcript"
      v-html="content"
    />
    <div v-else class="mt-5 preview-transcript">
      <Editor
        api-key="no-api-key"
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
        selector: 'textarea',
        statusbar: false,
        notifications: false,
        height: 400,
        images_file_types: 'jpg,svg,webp',
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
.tox-notifications-container {
  display: none;
}
.title-text {
  width: 90px;
  min-width: 90px;
  line-height: 35px;
  letter-spacing: 2px;
  font-weight: 500;
}

.preview-transcript {
  height: 400px;
}
</style>
