<template>
  <div class="detail-match-word p-5 border mt-5 rounded-2xl">
    <div class="bg-primary h-16 rounded-xl flex items-center flex-1">
      <Draggable
        v-model="dataListWords"
        group="people"
        @start="onDragStartWords"
        @end="onDragEndWords"
        @change="handleChangeDataListWords"
        item-key="id"
        style="display: flex; justify-content: space-around; flex-grow: 1"
      >
        <template #item="{ element }">
          <div
            class="w-max px-3 bg-white text-primary h-10 leading-10 rounded-xl text-base cursor-pointer"
          >
            {{ element.word }}
          </div>
        </template>
      </Draggable>
    </div>
    <div class="flex items-start justify-between text-base mt-3">
      <div>
        <div
          v-for="(item, index) in listSentences"
          :key="index"
          class="text-left mt-2"
        >
          {{ index + 1 }}. {{ item.vedau }}__{{ item.vesau }}
        </div>
      </div>
      <div class="h-40 detail-course-listening__answers">
        <Draggable
          v-model="listAnswers"
          group="people"
          @start="onDragStartAnswers"
          @end="onDragEndAnswers"
          @change="handleChangeListAnswers"
          item-key="id"
          style="display: flex; flex-direction: column; gap: 4px"
        >
          <template #item="{ element }">
            <div class="flex justify-between w-full">
              <div
                @click="handleDoubleClick(element)"
                class="border border-primary w-2/3 h-7 cursor-pointer rounded-lg"
              >
                {{ element.word }}
              </div>
              <div
                v-if="hasMatchStatus(element, 'empty')"
                class="w-1/3 text-text_red font-semibold"
              >
                Empty
              </div>
              <div
                v-if="hasMatchStatus(element, 'error')"
                class="w-1/3 text-text_red font-semibold"
              >
                Wrong
              </div>
            </div>
          </template>
        </Draggable>
      </div>
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
