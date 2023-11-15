<template>
  <div class="flex gap-5" :class="extendClass">
    <div v-if="!edit" class="flex gap-7 mt-4 flex-wrap button-gap">
      <div
        :class="[
          'cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50',
          !edit && 'invisible',
        ]"
      />
      <div
        class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleEdit"
      >
        <span class="text-base text-primary">Edit</span>
      </div>
    </div>
    <div v-else class="flex gap-7 mt-4 flex-wrap button-gap">
      <div
        class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleUpdate"
      >
        <span class="text-base text-white">Save</span>
      </div>
      <div
        class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
        @click="handleCancel"
      >
        <span class="text-base text-primary">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonEdit',
  emits: ['edit', 'update', 'cancel'],
  created() {},
  props: {
    extendClass: { type: String, default: '' },
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    handleEdit() {
      this.edit = true;
      this.$emit('edit', true);
    },
    handleUpdate() {
      this.edit = false;
      this.$emit('update', false);
    },
    handleCancel() {
      this.edit = false;
      this.$emit('cancel', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-arrow {
  transition: transform 0.2s;
  transform-origin: center;
}

.button-gap {
  gap: 0.75rem !important;
  justify-content: flex-end;
}
</style>
