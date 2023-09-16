<template>
  <div class="w-full mt-5 detail-priority flex text-base justify-between p-5">
    <div class="flex flex-col justify-between">
      <div class="flex" v-for="(item, index) in dataPriority" :key="index">
        <div class="ml-1 text-left">{{ index + 1 }}. {{ item.question }}</div>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-1">
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="border text-center border-primary w-40 h-8 rounded-lg form-control"
          @change="handleChangeInput1"
          v-model="inputPriority1"
          spellcheck="false"
          :placeholder="placeholder"
        />
        <div v-if="true" class="text-text_red font-semibold">x</div>
        <div v-else />
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="border text-center border-primary w-40 h-8 rounded-lg form-control"
          @change="handleChangeInput2"
          v-model="inputPriority2"
          spellcheck="false"
          :placeholder="placeholder"
        />
        <div v-if="true" class="text-text_red font-semibold">x</div>
        <div v-else />
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="border text-center border-primary w-40 h-8 rounded-lg form-control"
          @change="handleChangeInput3"
          v-model="inputPriority3"
          spellcheck="false"
          :placeholder="placeholder"
        />
        <div v-if="true" class="text-text_red font-semibold">x</div>
        <div v-else />
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="border text-center border-primary w-40 h-8 rounded-lg form-control"
          @change="handleChangeInput4"
          v-model="inputPriority4"
          spellcheck="false"
          :placeholder="placeholder"
        />
        <div v-if="true" class="text-text_red font-semibold">x</div>

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
    placeholder: { type: String, default: null },
  },
  watch: {
    dataPriority(newValue) {
      this.priority = newValue;
    },
  },
  data() {
    return {
      priority: this.dataPriority,
      inputPriority1: null,
      inputPriority2: null,
      inputPriority3: null,
      inputPriority4: null,
    };
  },
  computed: {
    ...mapState('course', ['submit']),
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    handleChangeInput1(event) {
      this.$emit('update1', event.target.value);
    },
    handleChangeInput2(event) {
      this.$emit('update2', event.target.value);
    },
    handleChangeInput3(event) {
      this.$emit('update3', event.target.value);
    },
    handleChangeInput4(event) {
      this.$emit('update4', event.target.value);
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
