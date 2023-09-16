<template>
  <div class="w-full mt-5 detail-priority flex text-base justify-between p-5">
    <div class="flex flex-col justify-between">
      <div class="flex" v-for="(item, index) in dataPriority" :key="index">
        <div class="ml-1 text-left">{{ index + 1 }}. {{ item.question }}</div>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-1">
      <div
        v-for="(item, index) in dataAnswers"
        :key="index"
        class="flex gap-2 items-center"
      >
        <input
          type="text"
          class="border border-primary w-40 h-8 rounded-lg form-control"
          @change="handleChangeInput"
          v-model="inputPriority[index]"
          spellcheck="false"
          :placeholder="placeholder"
        />
        <div v-if="item.error == 1" class="text-text_red font-semibold">
          Wrong
        </div>
        <div v-else-if="item.error == 2" class="text-text_red font-semibold">
          Empty
        </div>
        <div v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    dataPriority: { type: Array, default: () => [] },
    dataAnswers: { type: Array, default: () => [] },
    placeholder: { type: String, default: null },
  },
  watch: {
    dataPriority(newValue) {
      this.priority = newValue;
    },
    dataAnswers(newValue) {
      this.answers = newValue;
    },
  },
  data() {
    return {
      priority: this.dataPriority,
      answers: this.dataAnswers,
      inputPriority: [],
    };
  },
  computed: {
    ...mapState('course', ['submit']),
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    handleChangeInput(e) {
      console.log(e.targe.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-priority {
  border-radius: 15px;
  border: 1px solid #eae4e4;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
