<template>
  <div class="text-primary_black">
    <div class="flex justify-between flex-wrap gap-4 mb-10">
      <div
        class="contain hover:bg-table_border w-4/12 h-20 border flex justify-between p-3 flex-wrap cursor-pointer"
      >
        <div class="flex flex-col items-start justify-center">
          <div class="text-sm text-primary_black_opacity">Report</div>
          <div class="text-xl text-primary_black font-semibold">
            Report comment
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
  name: 'Notify',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.contain {
  min-width: 300px;

  /* @media screen and (max-width: 1024px) {
      height: 96px;
    } */
}
</style>
