<template>
  <div class="grid-container mt-5">
    <div class="text-left" v-for="(i, index) in data" :key="index">
      <div class="text-base text-primary_black font-semibold mb-2">
        {{ `${index + 1} .` }} {{ i.title }}
      </div>
      <div
        v-for="(value, key) in i.question"
        :key="key"
        class="question flex my-1"
      >
        <input
          type="radio"
          :id="'question-' + i.id + '-' + key"
          :value="key"
          :checked="isSelected(i.id, key + 1)"
          @change="handleChange(i.id, key + 1)"
          class="mt-1 mb-auto"
        />
        <label
          :for="'question-' + i.id + '-' + key"
          class="ml-2 mb-0 text-base"
        >
          {{ key + 1 }}. {{ value }}
        </label>
      </div>
      <span
        v-if="hasError(i.id + 1)"
        class="ml-1 text-text_red font-semibold text-base"
      >
        x
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    correctAnswer: {
      type: Array,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState('course', ['submit']),
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    isSelected(id, key) {
      // this.setSubmit(false);
      return this.selected[id] === key;
    },
    handleChange(id, key) {
      this.selected[id] = key;
      this.$emit('setValue', this.selected);
    },
    hasError(id) {
      return this.errors.includes(id);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
  @media screen and (max-width: 1550px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
label:not(.form-check-label):not(.custom-file-label) {
  font-weight: 200;
}
</style>
