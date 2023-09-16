<template>
  <div class="detail-match-word p-5 border mt-5 rounded-2xl">
    <div
      class="bg-primary detail-match-word__container rounded-xl flex items-center flex-1 flex-wrap gap-3"
    >
      <Draggable
        v-model="listWords"
        group="people"
        @start="onDragStartWords"
        @end="onDragEndWords"
        @change="handleChangeDataListWords"
        item-key="id"
        style="
          display: flex;
          justify-content: space-around;
          flex-grow: 1;
          flex-wrap: wrap;
          margin-bottom: 8px;
        "
      >
        <template #item="{ element }">
          <div
            class="w-max px-3 bg-white text-primary h-10 leading-10 rounded-xl text-base cursor-pointer mt-2"
          >
            {{ element.word }}
          </div>
        </template>
      </Draggable>
    </div>
    <div
      ref="matchWord"
      class="flex items-start justify-between text-base mt-3 gap-2"
    >
      <div class="flex flex-col gap-1">
        <div
          v-for="(item, index) in listQuestions"
          :key="index"
          class="text-left detail-match-word__question"
        >
          {{ index + 1 }}. {{ item.contentLeft }}__{{ item.contentRight }}
        </div>
      </div>
      <div
        ref="answers"
        class="detail-course-listening__answers flex justify-between gap-4"
      >
        <Draggable
          v-model="answers"
          group="people"
          @start="onDragStartAnswers"
          @end="onDragEndAnswers"
          @change="handleChangeListAnswers"
          item-key="id"
          style="
            display: flex;
            flex-direction: column;
            gap: 4px;
            justify-content: space-between;
          "
        >
          <template #item="{ element }">
            <div class="detail-match-word__drag">
              <div
                @click="handleDoubleClick(element)"
                class="border border-primary w-40 h-8 leading-7 cursor-pointer rounded-lg"
              >
                {{ element.word }}
              </div>
            </div>
          </template>
        </Draggable>
        <div class="flex flex-col gap-2 items-center justify-center">
          <div v-for="item in errorsMatching" :key="item.id" class="h-7">
            <div class="text-text_red font-semibold" v-if="item.type == 0">
              x
            </div>
            <div class="text-text_red font-semibold" v-else-if="item.type == 1">
              x
            </div>
            <div v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Draggable from 'vuedraggable';

export default {
  components: { Draggable },
  props: {
    listQuestions: { type: Array, default: () => [] },
    listAnswers: { type: Array, default: () => [] },
    dataListWords: { type: Array, default: () => [] },
    errorsMatching: { type: Array, default: () => [] },
  },
  data() {
    return {
      lastClickTime: 0,
      questions: this.listQuestions,
      answers: this.listAnswers,
      listWords: this.dataListWords,
      errors: this.errorsMatching,
    };
  },
  watch: {
    '$refs.matchWord.scrollHeight': {
      handler(newValue, oldValue) {
        const heightMatch = this.$refs.matchWord.scrollHeight;
        console.log(heightMatch);
      },
      deep: true,
    },
  },

  computed: {
    ...mapState('course', ['submit']),
  },
  methods: {
    handleDoubleClick(data) {
      const currentTime = new Date().getTime();
      if (currentTime - this.lastClickTime < 300) {
        const findIndex = this.answers.findIndex(
          (item) => item.id == data.id && item.word == data.word,
        );
        const clickedItem = this.answers[findIndex];
        if (clickedItem && clickedItem.word !== null) {
          this.answers.splice(findIndex, 1);
          this.answers.push({ id: data.id, word: null });
          this.listWords.push(clickedItem);
        }
      }
      this.lastClickTime = currentTime;
    },

    onDragStartAnswers(evt) {
      const draggedItem = evt.item.element;
      if (draggedItem == undefined) {
        evt.cancel = true;
      }
    },
    onDragEndAnswers(evt) {
      const draggedItem = evt.item.element;
      if (draggedItem == undefined) {
        evt.cancel = false;
      }
    },
    onDragStartWords(evt) {
      const draggedItem = evt.item.element;
      if (draggedItem == undefined) {
        evt.cancel = true;
      }
    },
    onDragEndWords(evt) {
      const draggedItem = evt.item.element;
      if (draggedItem == undefined) {
        this.drag = false;
      }
    },
    handleChangeDataListWords(data) {
      const temp = this.listWords;
      if (data.added) {
        const filteredArr = this.listWords.filter((item) => {
          return (
            item.word !== null ||
            temp.filter((i) => i.id === item.id && i.word !== null).length === 0
          );
        });
        this.listWords = filteredArr;
      }
      this.$emit('setQuetions', this.listWords);
    },
    handleChangeListAnswers(data) {
      const temp = this.answers;
      if (data.added) {
        const filteredArr = this.answers.filter((item) => {
          return (
            item.word !== null ||
            temp.filter((i) => i.id === item.id && i.word !== null).length === 0
          );
        });
        this.answers = filteredArr;
      } else if (data.removed) {
        this.answers.push({ id: data.removed?.element.id, word: null });
      }
      this.$emit('setAnswers', this.answers);
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-match-word {
  border-radius: 15px;
  border: 1px solid #eae4e4;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &__container {
    height: 120px;
    gap: 8px;
  }
  &__drag,
  &__answers,
  &__question,
  &__question > div {
    min-height: 32px;
  }
}
</style>
