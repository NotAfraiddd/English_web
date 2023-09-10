<template>
  <div class="flex" :class="extendClass">
    <div
      v-if="hideBack"
      @click="changeBack"
      class="w-max px-2 py-1 text-gray-400 border border-text_back hover:opacity-70 text-lg rounded-xl font-semibold cursor-pointer mt-5 flex mx-auto"
    >
      Back
    </div>
    <div
      v-if="hideContinue"
      @click="changeCreate"
      class="bg-primary btn-countinue w-max px-2 py-1 text-white text-lg rounded-xl font-semibold cursor-pointer mt-5 flex mx-auto"
    >
      Create
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupButton',
  emits: ['back', 'coutinue'],
  created() {},
  props: {
    hideBack: { type: Boolean, default: true },
    hideContinue: { type: Boolean, default: true },
  },
  data() {
    return {};
  },
  methods: {
    changeBack() {
      this.$emit('back');
    },
    changeCreate() {
      this.$emit('coutinue');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-countinue {
  &:hover {
    transform: translateY(-2px);
    opacity: 0.7;
  }
}
</style>
