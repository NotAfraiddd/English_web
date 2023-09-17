<template>
  <div class="absolute z-10 text-black min-h-full w-full">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 border mx-auto login rounded-xl my-auto"
    >
      <div class="flex justify-center items-center mt-2 gap-1">
        <div class="text-lg font-semibold text-primary">JOIN FOR SUCCESS</div>
        <img :src="ICON_LOGIN" alt="" srcset="" />
      </div>
      <div class="text-sm text-primary_999 px-10">
        Are you ready to take the next step towards a successful future ? Look
        no further than Circlez!
      </div>
      <div class="mt-4 mx-10 flex flex-col items-start">
        <div class="text-primary_black font-semibold text-base">Account</div>
        <div class="relative w-full mt-2">
          <label
            :class="{ active: focusedEmail }"
            for="fname"
            class="text-primary_999 flex justify-center items-center gap-1"
          >
            Enter your email
            <div class="text-sm text-text_red">★</div>
          </label>
          <input
            id="fname"
            type="text"
            class="rounded-lg pl-3 form-control w-full"
            v-model="email"
            @focus="onFocusEmail"
            @blur="onBlurEmail"
          />
        </div>
      </div>
      <div class="mt-4 mx-10 flex flex-col items-start">
        <div class="text-primary_black font-semibold text-base">Password</div>
        <div class="relative mt-2 w-full">
          <label
            :class="{ active: focusedPassword }"
            for="fname"
            class="text-primary_999 flex justify-center items-center gap-1"
          >
            Enter your password
            <div class="text-sm text-text_red">★</div>
          </label>
          <input
            id="fname"
            :type="showPassword ? 'text' : 'password'"
            class="rounded-lg pl-3 form-control"
            v-model="password"
            @focus="onFocusPassword"
            @blur="onBlurPassword"
          />
          <span
            class="h-10 w-6 absolute z-20 top-2 right-2"
            @click="toggleShowPassword"
          >
            <img :src="EYE_DISABLE" alt="" srcset="" v-if="showPassword" />
            <img :src="EYE_ENABLE" alt="" srcset="" v-else />
          </span>
        </div>
      </div>
    </div>
  </div>
  <div>
    <!-- aimation -->
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="bg">
          <stop offset="0%" style="stop-color: rgba(130, 158, 249, 0.06)" />
          <stop offset="50%" style="stop-color: rgba(76, 190, 255, 0.6)" />
          <stop offset="100%" style="stop-color: rgba(115, 209, 72, 0.2)" />
        </linearGradient>
        <path
          id="wave"
          fill="url(#bg)"
          d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
        />
      </defs>
      <g>
        <use xlink:href="#wave" opacity=".3">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="10s"
            calcMode="spline"
            values="270 230; -334 180; 270 230"
            keyTimes="0; .5; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        <use xlink:href="#wave" opacity=".6">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="8s"
            calcMode="spline"
            values="-270 230;243 220;-270 230"
            keyTimes="0; .6; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        <use xlink:href="#wave" opacty=".9">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="6s"
            calcMode="spline"
            values="0 230;-140 200;0 230"
            keyTimes="0; .4; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
      </g>
    </svg>
  </div>
</template>

<script>
import { ICON_LOGIN, EYE_DISABLE, EYE_ENABLE } from '../../constants/image.js';
export default {
  name: 'Login',
  created() {
    this.EYE_DISABLE = EYE_DISABLE;
    this.EYE_ENABLE = EYE_ENABLE;
    this.ICON_LOGIN = ICON_LOGIN;
  },
  data() {
    return {
      email: '',
      password: '',
      focusedEmail: false,
      focusedPassword: false,
      showPassword: false,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    onFocusEmail() {
      this.focusedEmail = true;
    },
    onBlurEmail() {
      if (!this.email) {
        this.focusedEmail = false;
      }
    },
    onFocusPassword() {
      this.focusedPassword = true;
    },
    onBlurPassword() {
      if (!this.password) {
        this.focusedPassword = false;
      }
    },
  },
};
</script>

<style scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: block;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff, #fff);
}
.login {
  width: 500px;
  height: 500px;
  box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

label {
  position: absolute;
  top: -3px;
  left: 0px;
  font-size: 16px;
  margin: 10px;
  padding: 0 10px;
  transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out;
}

label.active {
  color: rgba(81, 166, 221, 0.7) !important;
}
label.active > div {
  font-size: 10px !important;
}
.active {
  top: -20px;
  font-size: 14px;
  background-color: #fff;
}

input {
  width: 100%;
  height: 40px;
}

input:focus {
  outline: none;
  border: 1px solid rgba(81, 166, 221, 0.7);
}
label:not(.form-check-label):not(.custom-file-label) {
  font-weight: 300;
}

span > i {
  height: 100%;
  width: 100%;
}
</style>
