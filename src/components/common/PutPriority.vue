<template>
  <div class="w-full mt-5 detail-priority text-base p-5">
    <div class="flex justify-between">
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
            maxlength="1"
          />
          <div
            v-if="hasError1(inputPriority1)"
            class="text-text_red font-semibold"
          >
            x
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="text"
            class="border text-center border-primary w-40 h-8 rounded-lg form-control"
            @change="handleChangeInput2"
            v-model="inputPriority2"
            spellcheck="false"
            :placeholder="placeholder"
            maxlength="1"
          />
          <div
            v-if="hasError2(inputPriority2)"
            class="text-text_red font-semibold"
          >
            x
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="text"
            class="border text-center border-primary w-40 h-8 rounded-lg form-control"
            @change="handleChangeInput3"
            v-model="inputPriority3"
            spellcheck="false"
            :placeholder="placeholder"
            maxlength="1"
          />
          <div
            v-if="hasError3(inputPriority3)"
            class="text-text_red font-semibold"
          >
            x
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="text"
            class="border text-center border-primary w-40 h-8 rounded-lg form-control"
            @change="handleChangeInput4"
            v-model="inputPriority4"
            spellcheck="false"
            :placeholder="placeholder"
            maxlength="1"
          />
          <div
            v-if="hasError4(inputPriority4)"
            class="text-text_red font-semibold"
          >
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
    dataPriority: { type: Array, default: () => [] },
    listCorrectPriority: { type: Array, default: () => [] },
    placeholder: { type: String, default: null },
    inputPriorityProp1: { type: String, default: null },
    inputPriorityProp2: { type: String, default: null },
    inputPriorityProp3: { type: String, default: null },
    inputPriorityProp4: { type: String, default: null },
  },
  watch: {
    dataPriority(newValue) {
      this.priority = newValue;
    },
    inputPriorityProp1(newValue) {
      this.inputPriority1 = newValue;
    },
    inputPriorityProp2(newValue) {
      this.inputPriority2 = newValue;
    },
    inputPriorityProp3(newValue) {
      this.inputPriority3 = newValue;
    },
    inputPriorityProp4(newValue) {
      this.inputPriority4 = newValue;
    },
  },
  data() {
    return {
      priority: this.dataPriority,
      correctPriority: this.listCorrectPriority,
      inputPriority1: this.inputPriorityProp1,
      inputPriority2: this.inputPriorityProp2,
      inputPriority3: this.inputPriorityProp3,
      inputPriority4: this.inputPriorityProp4,
    };
  },
  computed: {
    ...mapState('course', ['submit']),
    ...mapState('auth', ['error']),
  },
  methods: {
    ...mapMutations('course', ['setSubmit']),
    ...mapMutations('auth', ['setError']),
    hasError1(data) {
      if (this.submit == true) {
        console.log('log', data, this.correctPriority[0]);
        if (data == this.correctPriority[0] && data) {
          console.log('1');
        } else {
          this.setError(1);
          this.setSubmit(false);
        }
      }
    },
    hasError2(data) {
      // if (this.submit == true) {
      //   console.log('log 1', data, this.correctPriority[1]);
      //   if (data == this.correctPriority[1] && data) {
      //     console.log('2');
      //   } else {
      //     this.setError(1);
      //     this.setSubmit(false);
      //   }
      // }
    },
    hasError3(data) {
      // if (this.submit == true) {
      //   if (data == this.correctPriority[0]) {
      //     console.log('1');
      //   }
      // }
    },
    hasError4(data) {
      // if (this.submit == true) {
      //   if (data == this.correctPriority[0]) {
      //     console.log('1');
      //   }
      // }
    },

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
