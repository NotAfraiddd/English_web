<template>
  <div class="mr-5">
    <ButtonBackUser title="Write blog" />
    <div class="flex items-start gap-20 w-full mt-5">
      <div class="flex flex-col items-start justify-center w-2/5 gap-2">
        <div class="font-semibold mr-4">Title Blog</div>
        <input
          type="text"
          class="px-5 text-base h-9 border rounded-lg input-search w-full"
          placeholder="Title of blog"
          v-model="inputTitle"
          spellcheck="false"
        />
      </div>
      <div class="flex items-start">
        <div class="font-semibold mt-5">Profile Blog</div>
        <ImageUpload
          :src-img="AVATAR"
          extend-class="h-96 width-image"
          extend-class-icon="icon-remove"
          :remove="true"
        />
      </div>
    </div>
    <Word :contentProp="contentListening" @update="updateContentListening" />
    <div
      class="bg-primary font-semibold w-24 h-9 leading-9 rounded-md cursor-pointer ml-auto mt-5 hover:opacity-50"
    >
      Create
    </div>
  </div>
</template>
<script>
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import Word from '../../../components/common/Editor.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import { AVATAR } from '../../../constants/image';
export default {
  name: 'CreateBlog',
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

<style lang="scss">
.icon-remove {
  top: 2%;
  right: 2%;
  z-index: 1;
}
.width-image {
  max-width: 550px;
}
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
