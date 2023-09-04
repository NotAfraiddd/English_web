<template>
  <div class="text-primary_black">
    <div class="flex justify-between flex-wrap gap-4">
      <div
        class="contain rounded-xl hover:bg-table_border w-4/12 h-20 border flex justify-between p-3 flex-wrap cursor-pointer"
        @click="handleClick(data.id)"
      >
        <div class="flex flex-col items-start justify-center">
          <div class="text-sm text-primary_black_opacity">
            {{ data.subtitle }}
          </div>
          <div class="text-xl text-primary_black font-semibold">
            {{ data.title }}
          </div>
        </div>
        <div class="flex justify-center items-start">
          <div
            class="text-xs bg-red-600 text-white text-center leading-6 h-6 w-6 rounded-full"
          >
            +99
          </div>
          <div class="ml-2">notifications</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notify",
  emits: ["clicked"],
  props: {
    data: { type: Object, default: () => {} },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(data) {
      this.$emit("clicked", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.contain {
  min-width: 350px;
}
</style>
