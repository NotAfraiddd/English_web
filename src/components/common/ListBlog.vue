<template>
  <div
    v-for="(item, index) in data"
    :key="item.id"
    :class="extendClass"
    @click="goToDetail(item)"
    class="flex h-auto cursor-pointer text-base flex-1 justify-between items-start mt-3 border gap-2 py-3 px-5 rounded-lg"
  >
    <div
      class="flex max-h-40 flex-col list-blog-contain w-full h-40 justify-between items-start"
    >
      <div class="flex flex-col">
        <div v-if="user" class="flex gap-3 items-center">
          <Avatar :imgUrl="item.avatar" :name="item?.userID" class="w-9 h-9" />
          <div class="flex flex-col items-start">
            <div class="font-semibold text-base">{{ item.author }}</div>
            <div class="text-xs">{{ item.date }}</div>
          </div>

          <div
            class="text-base text-red-500 mb-auto"
            v-if="item.status == 'DELETED'"
          >
            ( Reject )
          </div>
          <div
            class="text-base text-yellow-500 mb-auto"
            v-if="item.status == 'PENDING'"
          >
            ( Pending )
          </div>
        </div>
        <div class="flex flex-col items-start gap-1 hover:opacity-70">
          <div
            class="font-semibold text-xl text-primary_black text-left text-title overflow-hidden"
          >
            {{ item.title }}
          </div>
          <div
            class="text-base text-primary_black text-left overflow-hidden"
            :class="!user ? 'text-sub-content' : 'text-sub-content-3'"
            v-html="item.content"
            style="margin-bottom: 0 !important"
          />
        </div>
      </div>
      <div v-if="button" class="flex w-40 justify-between flex-wrap gap-3">
        <div
          @click.stop="handleRejected(item)"
          class="text-text_red hover:text-red-600 cursor-pointer"
        >
          Rejected
        </div>
        <div
          @click.stop="handleApproved(item)"
          class="text-text_green hover:text-green-600 cursor-pointer"
        >
          Approved
        </div>
      </div>
      <div v-if="react">
        <div
          v-if="item.status == 'APPROVED'"
          class="flex w-24 justify-between flex-wrap gap-2"
        >
          <div class="flex justify-center items-center cursor-pointer">
            <div @click.stop="handleClickReact(item, index)">
              <img
                :src="checkReact[item.id] ? HEART : HEART_DEFAULT"
                alt=""
                srcset=""
                class="w-5 h-4"
              />
            </div>
            <div class="h-5 w-5 leading-5 text-primary_black">
              {{ item.numReact }}
            </div>
          </div>
          <div
            class="flex justify-center items-center cursor-pointer"
            @click.stop="showComment(item)"
          >
            <img :src="CHAT" alt="" srcset="" class="w-5 h-4" />
            <div class="h-5 w-5 leading-5 text-primary_black">
              {{ item.numComment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-end gap-3"
      :class="image == true ? 'w-1/4' : 'w-5'"
    >
      <div v-if="image" class="w-48">
        <div
          class="profile-background rounded-md"
          :style="{ backgroundImage: 'url(' + item.imageTitle + ')' }"
        />
      </div>
      <div v-if="icon">
        <div
          @click.stop="showOptions(item.id)"
          :class="['relative cursor-pointer w-8 pb-2 icon']"
        >
          <img :src="OPTION_ICON" alt="" srcset="" />
        </div>
        <div
          :class="[
            'w-32 rounded-lg absolute menu-option right-14 bg-white border',
            showOption && activeId === item.id ? 'block' : 'hidden',
          ]"
        >
          <div class="h-7 leading-7 hover:bg-table_border cursor-pointer">
            Delete
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { OPTION_ICON, HEART, CHAT, HEART_DEFAULT } from '../../constants/image';
import Avatar from '../common/Avatar.vue';

export default {
  name: 'ListBlog',
  created() {
    this.HEART = HEART;
    this.CHAT = CHAT;
    this.HEART_DEFAULT = HEART_DEFAULT;
    this.OPTION_ICON = OPTION_ICON;
  },
  components: { Avatar },
  emits: ['showComment', 'changePath', 'clickReact', 'rejected', 'approved'],
  props: {
    data: { type: Array, default: () => [] },
    icon: { type: Boolean, default: false },
    image: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    react: { type: Boolean, default: false },
    checkReact: { type: Array, default: () => [] },
    user: { type: Boolean, default: false },
    extendClass: { type: String, default: '' },
  },
  methods: {
    handleRejected(data) {
      this.$emit('rejected', data);
    },
    handleApproved(data) {
      this.$emit('approved', data);
    },
    handleClickReact(data, index) {
      if (!this.reactionExecuted) {
        if (!data?.like) {
          data.numReact += 1;
          const event = {
            data,
            index,
            like: true,
          };
          this.$emit('clickReact', event);
          this.reactionExecuted = true;
        } else {
          if (data.numReact > 0) {
            data.numReact -= 1;
            const event = {
              data,
              index,
              like: false,
              idLike: data?.idLike,
            };
            this.$emit('clickReact', event);
          }
        }
      } else {
        if (data.numReact > 0) {
          data.numReact -= 1;
          const event = {
            data,
            index,
            like: false,
          };
          this.$emit('clickReact', event);
        }
        this.reactionExecuted = false;
      }
    },
    goToDetail(data) {
      this.$emit('changePath', data);
    },
    showComment(data) {
      this.$emit('showComment', { data, status: true });
    },
    showOptions(data) {
      this.activeId = data;
      this.showOption = !this.showOption;
    },
    closeOptions() {
      this.showOption = false;
    },
  },
  data() {
    return {
      reactionExecuted: false,
      showOption: false,
      activeId: null,
      options: [
        { id: 1, title: 'Delete' },
        { id: 2, title: 'Edit' },
      ],
    };
  },
};
</script>

<style lang="scss">
.menu-option {
  height: fit-content;
  padding: 5px 0;
  z-index: 1;
}

.icon {
  transform: translateY(3px);
  transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 20px;
    right: 8px;
  }
  &:hover {
    transform: translateY(0);
  }
}

.text-sub-content {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
p {
  margin-bottom: 0;
}
.text-title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.text-sub-content-3 {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.profile-background {
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
}
</style>
