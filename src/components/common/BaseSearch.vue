<template>
  <div class="relative">
    <div class="flex relative w-1/3 search-width h-9">
      <input
        type="text"
        class="px-5 text-base h-9 border input-search w-full"
        placeholder="Type to search.."
        v-model="userData"
        @input="onInputChange"
        spellcheck="false"
      />
      <div
        class="absolute right-5 cursor-pointer flex items-center my-auto h-full"
      >
        <img :src="SEARCH" alt="" srcset="" />
      </div>
    </div>
    <div class="w-1/3 absolute search-width" v-if="showSuggestion">
      <ul class="border border-t-0 w-full">
        <li
          class="h-8 leading-8 text-left pl-5 item-search hover:bg-primary text-base hover:text-white cursor-pointer text-primary_black"
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          @click="select(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SEARCH } from '../../constants/image';
export default {
  created() {
    this.SEARCH = SEARCH;
  },
  props: {
    search: { type: String, default: '' },
  },
  watch: {
    search(newValue) {
      this.userData = newValue;
    },
  },
  data() {
    return {
      userData: this.search,
      suggestions: [
        'Channel',
        'Mr Code Box',
        'Vs Code',
        'Instagram',
        'YouTube',
        'YouTuber',
        'YouTube Channel',
        'Blogger',
        'Please Like, Share & Subscribe',
        'Bollywood',
        'Vlogger',
      ],
      showSuggestion: false,
    };
  },
  computed: {
    filteredSuggestions() {
      const input = this.userData.toLowerCase();
      return this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input),
      );
    },
  },
  methods: {
    onInputChange(event) {
      if (this.userData.trim() === '') {
        this.showSuggestion = false;
      } else {
        this.showSuggestion = true;
        this.$emit('update', event.target.value);
      }
    },
    select(selectedData) {
      this.userData = selectedData;
      this.showSuggestion = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::selection {
  color: #fff;
  background: rgba(81, 166, 221, 0.7);
}
.search-width {
  max-width: 300px;
  .input-search {
    &:focus-visible {
      outline: none;
    }
  }
}

.item-search:last-child {
  margin-bottom: 6px;
}
</style>
