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
            class="text-primary_line flex justify-center items-center gap-1"
          >
            Your email
            <div class="text-xs" :class="focusedEmail && 'text-text_red'">
              ★
            </div>
          </label>
          <!--
            role="presentation"
            autocomplete="new-password" 
            to turn off autocomplete of google
          -->
          <input
            id="fname"
            type="text"
            class="rounded-lg pl-3 form-control w-full"
            v-model="email"
            @focus="onFocusEmail"
            @blur="onBlurEmail"
            role="presentation"
            autocomplete="new-password"
            ref="inputEmail"
          />
          <div
            class="text-red-500 mt-1 text-base text-left w-full"
            v-if="emptyEmail"
          >
            {{ ERROR_MESSAGE.emptyEmail }}
          </div>
          <div
            class="text-red-500 mt-1 text-base text-left w-full"
            v-if="syntaxEmail"
          >
            {{ ERROR_MESSAGE.wrongEmail }}
          </div>
        </div>
      </div>
      <div class="mt-4 mx-10 flex flex-col items-start">
        <div class="text-primary_black font-semibold text-base">Password</div>
        <div class="relative mt-2 w-full">
          <label
            :class="{ active: focusedPassword }"
            for="fname"
            class="text-primary_line flex justify-center items-center gap-1"
          >
            Your password
            <div
              class="text-xs"
              :class="focusedPassword && 'text-text_red'"
              ref="star"
            >
              ★
            </div>
          </label>
          <input
            id="fname"
            :type="showPassword ? 'text' : 'password'"
            class="rounded-lg pl-3 form-control"
            v-model="password"
            @focus="onFocusPassword"
            @blur="onBlurPassword"
            role="presentation"
            autocomplete="new-password"
            ref="inputPassword"
          />
          <div
            class="text-red-500 mt-1 text-base text-left w-full"
            v-if="emptyPassword"
          >
            {{ ERROR_MESSAGE.emptyPassword }}
          </div>
          <div
            class="text-red-500 mt-1 text-base text-left w-full"
            v-if="syntaxPassword"
          >
            {{ ERROR_MESSAGE.wrongPassword }}
          </div>
          <span
            class="h-10 w-6 absolute z-20 top-2 right-2 cursor-pointer"
            @click="toggleShowPassword"
          >
            <img :src="EYE_DISABLE" alt="" srcset="" v-if="showPassword" />
            <img :src="EYE_ENABLE" alt="" srcset="" v-else />
          </span>
        </div>
      </div>
      <div
        class="mt-3 mx-10 text-right underline text-primary_999 cursor-pointer animation-translate-y py-1"
      >
        Forget password
      </div>
      <div
        @click="handleLogin()"
        class="mt-4 mx-10 h-10 leading-10 rounded-lg bg-primary text-white text-lg font-semibold cursor-pointer hover:opacity-70"
      >
        Login
      </div>
      <div class="flex flex-1 items-center mx-10">
        <div class="border-primary_line w-full border-b" />
        <div class="text-primary_black mx-2">or</div>
        <div class="border-primary_line w-full border-b" />
      </div>
      <div
        class="flex justify-center items-center border mx-10 h-10 leading-10 rounded-lg text-lg font-semibold cursor-pointer hover:opacity-70"
      >
        <img :src="GOOGLE" alt="" srcset="" class="w-7 h-7" />
        <div class="h-7 leading-7 text-primary_black">Login with Google</div>
      </div>
      <div
        class="mt-2 text-base text-primary_black flex mx-auto justify-center"
      >
        If you don’t have an account ?&nbsp;
        <div
          @click="goToRegister"
          class="font-semibold underline hover:opacity-70 cursor-pointer animation-translate-y"
        >
          Sign up now
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
import { ERROR_MESSAGE } from '../../constants';
import { validEmail, validPassword } from '../../constants/function';
import {
  ICON_LOGIN,
  EYE_DISABLE,
  EYE_ENABLE,
  GOOGLE,
} from '../../constants/image.js';
export default {
  name: 'Login',
  created() {
    this.GOOGLE = GOOGLE;
    this.EYE_DISABLE = EYE_DISABLE;
    this.EYE_ENABLE = EYE_ENABLE;
    this.ICON_LOGIN = ICON_LOGIN;
    // Trigger Enter
    document.addEventListener('keyup', this.handleKeyPress);
  },
  watch: {
    email() {
      this.emptyEmail = false;
      this.syntaxEmail = false;
      this.$refs.inputEmail.classList.remove('border-red-500');
    },
    password() {
      this.emptyPassword = false;
      this.syntaxPassword = false;
      this.$refs.inputPassword.classList.remove('border-red-500');
    },
  },
  data() {
    return {
      email: '',
      password: '',
      isSubmit: false,
      emptyEmail: false,
      emptyPassword: false,
      syntaxEmail: false,
      syntaxPassword: false,
      focusedEmail: false,
      ERROR_MESSAGE: {
        emptyEmail: ERROR_MESSAGE.EMAIL_EMPTY,
        emptyPassword: ERROR_MESSAGE.PASSWORD_EMPTY,
        wrongEmail: ERROR_MESSAGE.EMAIL_SYNTAX,
        wrongPassword: ERROR_MESSAGE.PASSWORD_SYNTAX,
      },
      focusedPassword: false,
      showPassword: false,
    };
  },
  methods: {
    validateEmail() {
      const isValidEmail = validEmail(this.email);
      if (this.email.trim() === '' && this.isSubmit) {
        this.$refs.inputEmail.classList.add('border-red-500');
        this.emptyEmail = true;
      } else if (!isValidEmail && this.isSubmit) {
        this.$refs.inputEmail.classList.add('border-red-500');
        this.syntaxEmail = true;
      } else return;
    },
    validatePassword() {
      const isValidPassword = validPassword(this.password);
      if (this.password.trim() === '' && this.isSubmit) {
        this.$refs.inputPassword.classList.add('border-red-500');
        this.emptyPassword = true;
      } else if (!isValidPassword && this.isSubmit) {
        this.$refs.inputPassword.classList.add('border-red-500');
        this.syntaxPassword = true;
      } else return;
    },
    goToRegister() {
      this.$router.push({ name: 'Register' });
    },
    handleKeyPress(event) {
      if (event.keyCode === 13) {
        this.handleLogin();
      }
    },
    handleLogin() {
      this.isSubmit = true;
      const validEmail = this.validateEmail();
      const validPassword = this.validatePassword();
      if (validEmail && validPassword) {
        this.$gAuth.signIn().then((GoogleUser) => {
          console.log('GoogleUser', GoogleUser);
          this.isSignIn = this.$gAuth.isAuthorized;
        });
      }
    },
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
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

input::placeholder {
  color: #f00;
}

span > i {
  height: 100%;
  width: 100%;
}

.animation-translate-y {
  &:hover {
    transform: translateY(-1px);
  }
}
</style>
