<template>
  <div
    v-for="(item, index) in dataPutTasks"
    :key="item.id"
    class="flex items-center mt-5 gap-4"
  >
    <div
      class="border w-10 h-10 leading-10 rounded-lg text-center bg-table_header"
    >
      {{ index + 1 }}
    </div>
    <input
      type="text"
      class="border text-primary_black w-full rounded-lg form-control"
      spellcheck="false"
      placeholder="Enter the sentence"
      v-model="item.content"
    />
  </div>
</template>
<script>
export default {
  components: {},
  created() {},
  props: {
    dataPutTasks: { type: Array, default: () => [] },
  },
  watch: {},
  methods: {},
  data() {
    return {};
  },
};
</script>
