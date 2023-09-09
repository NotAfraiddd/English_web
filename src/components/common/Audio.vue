<template>
  <div class="flex flex-col gap-4 mt-4 w-full">
    <audio
      ref="audioElement"
      controls
      @play="handlePlay"
      @pause="handlePause"
      :src="data"
      class="w-full"
    />
    <input
      type="file"
      id="audioInput"
      @change="selectAudio"
      accept=".mp3"
      class="max-w-max"
    />
  </div>
</template>

<script>
export default {
  props: {
    dataProp: { type: String, default: '' },
  },
  watch: {
    dataProp(newValue) {
      this.data = newValue;
    },
  },
  data() {
    return {
      isPlaying: false,
      data: this.dataProp,
    };
  },
  methods: {
    selectAudio(event) {
      const file = event.target.files[0];
      if (file) {
        this.playAudio(file);
      }
    },
    playAudio(file) {
      const audioElement = this.$refs.audioElement;
      audioElement.src = URL.createObjectURL(file);

      // get data from api

      // this.data = file;
      // const file2 = new File([this.data], file.name, {
      //   type: 'audio/mp3',
      // });

      audioElement.load();
    },
    handlePlay() {
      const audioElement = this.$refs.audioElement;
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying == true) {
        audioElement.play();
      }
    },
    handlePause() {
      this.isPlaying = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
