<template>
  <!-- <div class="personal-image text-center">
    <label class="label">
      <input
        type="file"
        ref="imageInput"
        accept="image/png, image/gif, image/jpeg"
        @change="handleImageChange"
      />
      <figure class="personal-figure relative w-32 h-32">
        <img
          :src="imageURL"
          class="personal-avatar w-32 h-32 rounded-full"
          alt="avatar"
        />
        <figcaption
          class="personal-figcaption absolute top-0 opacity-0 hover:opacity-100 rounded-full"
        >
          <img
            class="mx-auto"
            src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
          />
        </figcaption>
      </figure>
    </label>
  </div> -->
  <div class="flex">acb</div>
</template>

<script>
export default {
  data() {
    return {
      imageURL: 'https://avatars1.githubusercontent.com/u/11435231?s=460&v=4',
    };
  },
  methods: {
    handleImageChange(event) {
      const imageFile = event.target.files[0];

      if (imageFile) {
        const imageURL = URL.createObjectURL(imageFile);
        this.imageURL = imageURL;
      }
    },
  },
};
</script>

<style scoped>
.personal-image input[type='file'] {
  display: none;
}
.personal-avatar {
  box-sizing: border-box;
  border: 2px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out 0.3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.personal-figcaption {
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0);
  transition: all ease-in-out 0.3s;
}
.personal-figcaption:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.personal-figcaption > img {
  margin-top: 32.5px;
  width: 50px;
  height: 50px;
}
</style>
