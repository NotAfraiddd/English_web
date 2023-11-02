<template lang="">
  <footer class="footer-wrapper mt-32 flex">
    <div class="flex justify-between mx-auto gap-52">
      <section class="flex flex-col items-start text-white">
        <div class="font-semibold text-2xl footer-wrapper__name mb-2">
          CircleZ
        </div>
        <div>Phone: 0123.456.789</div>
        <div>Email: circlez@english.edu.vn</div>
        <div>12 Nguyen Van Bao, Ward 4, Go Vap, Ho Chi Minh City</div>
      </section>
      <section class="flex flex-col items-start text-white">
        <div class="font-semibold text-2xl footer-wrapper__name mb-2">
          About
        </div>
        <div>
          The product is made by
          <b><i>Nguyen Ngoc Huan</i></b>
          and
          <b><i>Nguyen Huynh Chi Bao</i></b>
        </div>
        <div class="mt-2">
          © 2023 CircleZ. Vietnam's leading English learning platform
        </div>
      </section>
    </div>
  </footer>
</template>
<script>
export default {
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.footer-wrapper {
  background-color: #181821;
  padding: 40px;
  &__name {
    color: #fff;
  }
}
</style>
