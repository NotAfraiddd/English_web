<template>
  <a-modal
    :visible="showModal"
    title=""
    centered
    :footer="null"
    :closable="closeModal"
    :maskClosable="disabledClickOutside"
    @cancel="PopupCancel"
    :class="`base-confirm-modal ${modalCustomClass}`"
    dialogClass="p-10"
    :width="widthCustom"
  >
    <slot name="text-button" />
    <div class="flex justify-center items-center text-3xl">
      <slot name="icon" />
    </div>
    <div class="flex items-center justify-center flex-column text-xl">
      <slot name="content" />
    </div>
    <div class="flex items-center justify-center gap-10 sm:gap-0">
      <slot name="select" />
    </div>
    <div class="flex items-center justify-center gap-10 sm:gap-0">
      <slot name="time-keeping" />
    </div>

    <div
      v-if="showFooter"
      class="flex justify-center items-center mt-3 gap-20 md:gap-14 lg:gap-14 text-lg sm:text-sm"
    >
      <div class="underline cur-p" @click="onCancel">
        <slot name="text-cancel" />
      </div>
      <button class="min-w-max bg-primary h-10" @click="onSave">
        <span class="flex items-center justify-center gap-5">
          <slot name="text-save" />
        </span>
      </button>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    closeModal: {
      type: Boolean,
      default: true,
    },
    disabledClickOutside: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    widthCustom: {
      type: [String, Number],
      default: 'auto',
    },
    modalCustomClass: {
      type: String,
    },
  },
  methods: {
    PopupCancel() {
      this.$emit('closeModal');
    },
    onSave() {
      this.$emit('save');
    },
    onCancel() {
      this.$emit('handleCancel');
      this.$emit('closeModal');
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/styles/modal';
</style>
