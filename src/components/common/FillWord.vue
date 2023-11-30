<template>
  <div
    v-for="(item, index) in dataWords"
    :key="item.id"
    class="flex items-center mt-5"
  >
    <div class="text-base text-primary_black w-10 h-5 mr-1">
      {{ index + 1 }}.
    </div>
    <input
      :placeholder="placeholderLeft"
      type="text"
      class="border text-primary_black w-full rounded-lg form-control"
      spellcheck="false"
      v-model="item.contentLeft"
    />
    <div class="text-primary_black mx-2">______________________</div>
    <input
      :placeholder="placeholderRight"
      type="text"
      class="border text-primary_black w-full rounded-lg form-control"
      spellcheck="false"
      v-model="item.contentRight"
    />
  </div>
</template>
<script>
export default {
  components: {},
  created() {},
  emits: ['subtract'],
  props: {
    dataWords: { type: Array, default: () => [] },
    placeholderLeft: { type: String, default: () => '' },
    placeholderRight: { type: String, default: () => '' },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>
