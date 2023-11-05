<template>
  <div class="w-full mt-5 detail-priority text-base p-5">
    <div class="flex justify-between">
      <div class="flex flex-col justify-between">
        <div class="flex" v-for="(item, index) in dataPriority" :key="index">
          <div class="ml-1 text-left">{{ index + 1 }}. {{ item.question }}</div>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-1">
        <div
          class="flex gap-2 items-center"
          v-for="(item, index) in dataPriority.length"
          :key="index"
        >
          <input
            type="text"
            class="border text-center border-primary w-40 h-8 rounded-lg form-control"
            @change="handleChangeInput($event, index)"
            v-model="inputPriority[index]"
            spellcheck="false"
            :placeholder="placeholder"
            maxlength="1"
          />
          <div v-if="hasError(index)" class="text-text_red font-semibold">
            x
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    submitProp: { type: Boolean, default: false },
    placeholder: { type: String, default: null },
    dataPriority: { type: Array, default: () => [] },
    errorPriority: { type: Array, default: () => [] },
    inputPriorityProp: { type: Array, default: () => [] },
    listCorrectPriority: { type: Array, default: () => [] },
  },
  watch: {
    dataPriority(newValue) {
      this.priority = newValue;
    },
    inputPriorityProp(newValue) {
      this.inputPriority = newValue;
    },
    submitProp(newVal) {
      this.submit = newVal;
    },
  },
  data() {
    return {
      error: 0,
      submit: false,
      priority: this.dataPriority,
      correctPriority: this.listCorrectPriority,
      errors: this.errorPriority,
      inputPriority: [],
    };
  },
  methods: {
    ...mapMutations('auth', ['setError']),
    /**
     *  Check if the route name matches the route being displayed.
     *  @returns {boolean} - Returns true if the route name matches the current route, false otherwise.
     */
    isMatchedRoute(routeName) {
      return this.$route.name === routeName;
    },
    hasError(dataIndex) {
      if (this.submit) {
        if (this.inputPriority.length == 0) {
          if (!this.isMatchedRoute('ListeningTest')) return true;
          else this.error = 4;
        } else {
          let check = this.errors.some(
            (item) => item.index == dataIndex && !item.status,
          );
          if (!this.isMatchedRoute('ListeningTest')) {
            return check;
          } else {
            this.errors.forEach((item) => {
              if (!item.status) {
                this.error++;
              }
            });
          }
        }
        this.setError(this.error);
        this.correctPriority.forEach((item, i) => {
          if (i == 3) {
            this.submit = false;
          }
        });
      }
    },
    handleChangeInput(event, index) {
      this.$emit('update', { value: event.target.value, i: index });
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
