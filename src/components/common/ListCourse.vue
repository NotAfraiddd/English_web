<template>
  <div class="grid grid-cols-3">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="h-auto min-h-max w-80"
      @click="handleClick(item)"
    >
      <div
        class="course flex justify-center border flex-col w-80 px-2 gap-1 rounded-2xl h-40 cursor-pointer hover:opacity-80"
        :style="`background-color: ${item.color};`"
      >
        <div class="font-semibold text-2xl text-white">{{ item.title }}</div>
        <div class="text-base text-white">
          {{ item.subtitle }}
        </div>
        <Processbar :percentages="item.percentages" />
      </div>
      <div class="w-full mt-3 flex flex-col gap-1 items-start my-4 ml-4">
        <div class="font-semibold text-xl">{{ item.name }}</div>
        <div class="text-sm flex gap-3">
          Completed
          <div class="font-semibold">{{ item.courseFinished }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Processbar from './Processbar.vue';
export default {
  name: 'ListCourse',
  components: { Processbar },
  created() {},
  emits: ['clicked'],
  props: {
    data: { type: Array, default: () => [] },
  },
  methods: {
    handleClick(data) {
      this.$emit('clicked', { item: data, status: true });
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.course {
  &:hover {
    transform: translateY(-2px);
  }
}
</style>
