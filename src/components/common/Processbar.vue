<template>
  <div class="skill-main w-full flex flex-col gap-4 mt-6">
    <div
      class="skill-wrap flex flex-col"
      v-for="(skill, index) in percentages"
      :key="index"
    >
      <div class="skill-bar rounded-lg bg-white">
        <div
          class="skill-per bg-orange"
          :style="{ width: skill.percentage + '%' }"
          :per="skill.percentage + '%'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentages: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },
  computed: {
    currentWidth() {
      return this.animatedValue + '%';
    },
  },
  methods: {
    animateSkills() {
      this.percentages.forEach((skill) => {
        var per = skill.percentage;
        var animatedValue = 0;
        var startTime = null;

        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = timestamp - startTime;
          var stepPercentage = progress / 1000; // Dividing by duration in milliseconds (1000ms = 1s)

          if (stepPercentage < 1) {
            animatedValue = per * stepPercentage;
            skill.percentage = Math.floor(animatedValue);
            requestAnimationFrame(animate);
          } else {
            animatedValue = per;
            skill.percentage = Math.floor(animatedValue);
          }
        }

        requestAnimationFrame(animate);
      });
    },
  },
  mounted() {
    this.animateSkills();
  },
};
</script>

<style lang="css" scoped>
.skill-main {
  max-width: 600px;
  .skill-wrap {
    gap: 10px;

    .skill-bar {
      height: 10px;
    }

    .skill-per {
      height: 10px;
      background: #23576f;
      border-radius: 8px;
      width: 0;
      transition: 1s linear;
      position: relative;
      &:before {
        content: attr(per);
        position: absolute;
        padding: 4px 6px;
        background-color: #f05123;
        color: #fff;
        font-size: 11px;
        border-radius: 4px;
        top: -30px;
        right: 0;
        transform: translateX(50%);
      }
    }
  }
}
</style>
