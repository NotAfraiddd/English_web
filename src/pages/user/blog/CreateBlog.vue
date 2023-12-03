<template>
  <div class="mr-5">
    <ButtonBackUser
      v-if="!checkRouteUpdate"
      title="Write blog"
      :hide-back="true"
      @back="handleBack"
    />
    <ButtonBackUser
      v-else
      title="Update blog"
      :hide-back="true"
      @back="handleBack"
    />
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
          :src-img="avatar || AVATAR"
          extend-class="h-96 width-image"
          extend-class-icon="icon-remove"
          @update="getAvatar"
        />
      </div>
    </div>
    <Word :contentProp="content" @update="updateContentListening" />
    <div
      @click="handleCreatePost"
      class="bg-primary w-40 h-9 leading-9 rounded-md cursor-pointer ml-auto mt-5 hover:opacity-50"
    >
      Send to Admin
    </div>
  </div>
</template>
<script>
import ButtonBackUser from '../../../components/common/ButtonBackUser.vue';
import Word from '../../../components/common/Editor.vue';
import ImageUpload from '../../../components/common/ImageUpload.vue';
import { AVATAR } from '../../../constants/image';
import blogApi from '../../../apis/blog';
import fileAPI from '../../../apis/file';
import { notification } from 'ant-design-vue';
import { NOTIFY_MESSAGE } from '../../../constants';
import moment from 'moment';

export default {
  name: 'CreateBlog',
  components: { ButtonBackUser, Word, ImageUpload },
  created() {
    this.AVATAR = AVATAR;
    this.NOTIFY_MESSAGE = NOTIFY_MESSAGE;
    this.userInfor = JSON.parse(localStorage.getItem('user'));
    if (this.$route.name == 'UpdateBlog') {
      this.checkRouteUpdate = true;
    }
    this.idBlog = +this.$route.params.id;
    if (this.idBlog) {
      this.getDetail();
    }
  },
  data() {
    return {
      idBlog: null,
      checkRouteUpdate: false,
      content: null,
      avatar: null,
      file: null,
      inputTitle: null,
      userInfor: null,
    };
  },

  methods: {
    async getDetail() {
      try {
        this.emitter.emit('isShowLoading', true);
        const data = await blogApi.getDetailBlog({ id: this.idBlog });
        this.content = data?.content;
        this.created_at = moment(data?.createDate).format('DD/MM/YYYY HH:mm');
        this.name = data?.author?.fullName;
        this.avatar = data?.author?.avtURL;
        this.inputTitle = data?.title;
        this.emitter.emit('isShowLoading', false);
      } catch (error) {
        console.log(error);
        this.emitter.emit('isShowLoading', false);
      }
    },
    handleBack() {
      if (this.checkRouteUpdate) this.$router.push({ name: 'MyBlog' });
      else this.$router.push({ name: 'HomeUser' });
    },
    updateContentListening(data) {
      this.content = data;
    },
    getAvatar(data, fileData) {
      this.avatar = data;
      this.file = fileData;
    },
    async handleCreatePost() {
      try {
        if (this.inputTitle && this.content && this.avatar) {
          this.emitter.emit('isShowLoading', true);
          if (this.file) {
            let formData = new FormData();
            formData.append('file', this.file);
            this.avatar = await fileAPI.updateImg(formData);
          }
          if (!this.idBlog) {
            await blogApi.createBlog({
              title: this.inputTitle,
              content: this.content,
              thumbnailURL: this.avatar,
              author: {
                uid: this.userInfor.email,
              },
            });
          } else {
            await blogApi.updateBlog({
              id: this.idBlog,
              title: this.inputTitle,
              content: this.content,
              thumbnailURL: this.avatar,
              author: {
                uid: this.userInfor.email,
              },
            });
          }
          notification.success({ message: NOTIFY_MESSAGE.CREATE_BLOG_SUCCESS });
          this.emitter.emit('isShowLoading', false);
          this.$router.push({ name: 'MyBlog' });
        }
        if (!this.inputTitle) {
          notification.error({ message: 'Missing title' });
        }
        if (!this.content) {
          notification.error({ message: 'Missing content blog' });
        }
        if (!this.avatar) {
          notification.error({ message: 'Missing image' });
        }
      } catch (error) {
        console.log(error);
        notification.success({ message: NOTIFY_MESSAGE.CREATE_BLOG_FAILED });
        this.emitter.emit('isShowLoading', false);
      }
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
