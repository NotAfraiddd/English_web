<template>
  <div>
    <div
      v-for="(item, index) in dataQuestions"
      :key="index"
      class="flex mt-5 flex-col"
    >
      <div class="flex create-course__title items-center gap-2">
        <div
          class="h-10 leading-10 text-primary_black text-left font-semibold text-base mr-2"
        >
          Question
        </div>
        <div
          v-if="dataQuestions.length >= 2"
          @click="subtract(index)"
          class="font-semibold text-base cursor-pointer text-red-500"
        >
          ( X )
        </div>
      </div>
      <div class="flex gap-4">
        <input
          type="text"
          :disabled="true"
          class="border w-10 h-10 rounded-lg text-center bg-table_header"
          :placeholder="index + 1"
        />
        <input
          v-model="item.title"
          type="text"
          class="w-full border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
      <div class="font-semibold text-base text-primary_black text-left mt-3">
        Answer
      </div>
      <div
        v-for="(answer, subIndex) in 4"
        :key="subIndex"
        class="flex flex-col items-start w-full justify-center mt-3 gap-3"
      >
        <input
          v-model="item.answers[subIndex]"
          :placeholder="`Answer ${subIndex + 1}`"
          type="text"
          class="w-full border rounded-lg form-control"
          spellcheck="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  created() {},
  emits: ['subtract'],
  props: {
    dataQuestions: { type: Array, default: () => [] },
  },
  watch: {
    dataQuestions: {
      deep: true,
      handler(newDataQuestions) {
        for (const item of newDataQuestions) {
          if (!Array.isArray(item.answers) || item.answers.length !== 4) {
            item.answers = ['', '', '', ''];
          }
        }
      },
    },
  },
  methods: {
    subtract(index) {
      this.$emit('subtract', index);
    },
  },
  data() {
    return {};
  },
};
</script>
