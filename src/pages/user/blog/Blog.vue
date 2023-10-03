<template>
  <div>
    <ButtonBackUser title="Write blog" />
    <div class="flex items-center gap-5 w-full">
      <div class="flex items-center justify-center w-1/2">
        <div class="font-semibold mr-4">Title</div>
        <input
          type="text"
          class="px-5 text-base h-9 border rounded-lg input-search w-full"
          placeholder="Title of blog"
          v-model="inputTitle"
          spellcheck="false"
        />
      </div>
      <div class="flex items-center">
        <div class="font-semibold">Image blog</div>
        <ImageUpload :src-img="AVATAR" />
      </div>
    </div>
    <Word :contentProp="contentListening" @update="updateContentListening" />
  </div>
</template>
<script>
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import Word from '../../../components/common/Editor.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import { AVATAR } from '../../../constants/image';
export default {
  name: 'BlogUser',
  components: { ButtonBackUser, Word, ImageUpload },
  created() {
    this.AVATAR = AVATAR;
  },
  data() {
    return {
      contentListening: null,
    };
  },

  methods: {
    updateContentListening(data) {
      this.contentListening = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-cols-user {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  @media screen and (max-width: 1460px) {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    column-gap: 8px !important;
  }
  @media screen and (max-width: 705px) {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
    width: 98%;
  }
}
.user-course {
  width: 20rem;
  margin: 0 auto;
  @media screen and (max-width: 705px) {
    width: 98%;
  }
}

.input-search {
  &:focus-visible {
    outline: none;
  }
}
</style>
