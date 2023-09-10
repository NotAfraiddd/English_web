<template>
  <div class="text-left w-96" v-for="(i, index) in data" :key="index">
    <div>{{ i.title }}</div>
    <div v-for="(value, key) in i.question" :key="key" class="question">
      <input
        type="checkbox"
        :id="'question-' + i.id + '-' + key"
        :value="key"
        :checked="isSelected(i.id, key + 1)"
        @change="handleChange(i.id, key + 1)"
      />
      <label :for="'question-' + i.id + '-' + key" class="ml-1">
        {{ key + 1 }}. {{ value }}
      </label>
    </div>
    <span v-if="hasError(i.id + 1)" class="ml-1 text-red-500">chibao</span>
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
      this.setSubmit(false);
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
