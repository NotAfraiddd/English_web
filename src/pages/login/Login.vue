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
        @click="showModalForgetPassword"
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
        <img :src="GOOGLE" alt="" srcset="" class="w-5 h-5 mr-2" />
        <div
          @click="handleLoginGoogle"
          class="h-7 leading-7 text-primary_black"
        >
          Login with Google
        </div>
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
  <ConfirmModal
    :showModal="modalForgetPassword"
    @closeModal="closeModalForgetPassword"
    @save="closeModalForgetPassword"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #content>
      <div class="text-primary_black my-5 flex gap-1">
        Confirm
        <div class="font-semibold">Email</div>
        and
        <div class="font-semibold">OTP</div>
        ?
      </div>
      <div class="flex mb-5 w-full">
        <div class="w-1/5 leading-10 text-base text-center">Email</div>
        <div class="flex flex-col w-full">
          <input
            v-model="inputEmail"
            type="text"
            class="border-b form-control w-full leading-10"
            spellcheck="false"
            placeholder="Please enter your email"
            ref="refInputEmail"
          />
          <div v-if="emptyInputEmail" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.emptyEmail }}
          </div>
          <div v-if="syntaxInputEmail" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.wrongEmail }}
          </div>
        </div>
      </div>
      <div />
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="closeModalForgetPassword"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="sendEmailToChangePassword"
        >
          <span class="text-base text-white">Okay</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
  <ConfirmModal
    :showModal="modalChangePassword"
    @closeModal="closeModalChangePassword"
    @save="closeModalChangePassword"
    :showFooter="false"
    :widthCustom="600"
  >
    <template #content>
      <div class="text-primary_black my-5 flex gap-1">
        Do you want to change
        <div class="font-semibold">Password</div>
        ?
      </div>
      <div class="flex mb-5 w-full">
        <div class="w-2/5 leading-10 text-base">Code OTP</div>
        <div class="flex flex-col w-full">
          <input
            v-model="inputOTP"
            type="text"
            class="border-b form-control w-full"
            spellcheck="false"
            placeholder="Please enter code OTP"
            ref="codeOTP"
          />
          <div v-if="emptyInputOTP" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.emptyOTP }}
          </div>
          <div v-if="syntaxInputOTP" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.wrongOTP }}
          </div>
        </div>
      </div>
      <!-- password -->
      <div class="flex mb-5 w-full">
        <div class="w-2/5 leading-10 text-base">New password</div>
        <div class="w-full flex flex-col">
          <input
            v-model="changePassword"
            type="text"
            class="border-b form-control w-full"
            spellcheck="false"
            ref="password"
            placeholder="Please enter your new password"
          />
          <div v-if="emptyChangePassword" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.emptyPassword }}
          </div>
          <div v-if="syntaxChangePassword" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.wrongPassword }}
          </div>
        </div>
      </div>
      <!-- confirm password -->
      <div class="flex mb-5 w-full">
        <div class="w-2/5 leading-10 text-base">Confirm password</div>
        <div class="w-full flex flex-col">
          <input
            v-model="confirmPassword"
            type="text"
            class="border-b form-control w-full"
            spellcheck="false"
            ref="confirmPassword"
            placeholder="Please enter your confirm password"
          />
          <div v-if="emptyConfirmPassword" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.emptyConfirmPassword }}
          </div>
          <div v-if="syntaxConfirmPassword" class="text-red-500 text-base mt-1">
            {{ ERROR_MESSAGE.wrongConfirmPassword }}
          </div>
        </div>
      </div>
    </template>
    <template #select>
      <div class="flex gap-20">
        <div
          class="cursor-pointer rounded-lg border-primary border w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="closeModalChangePassword"
        >
          <span class="text-base text-primary">Cancel</span>
        </div>
        <div
          class="cursor-pointer rounded-lg bg-primary w-24 text-center h-8 leading-8 hover:opacity-50"
          @click="saveModalChangePassword"
        >
          <span class="text-base text-white">Okay</span>
        </div>
      </div>
    </template>
  </ConfirmModal>
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
import {
  validEmail,
  validPassword,
  validConfirmPassword,
} from '../../constants/function';
import ConfirmModal from '../../components/admin/ConfirmModal.vue';
import {
  ICON_LOGIN,
  EYE_DISABLE,
  EYE_ENABLE,
  GOOGLE,
} from '../../constants/image.js';
import { googleTokenLogin } from 'vue3-google-login';
import authUser from '../../apis/auth';
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  components: { ConfirmModal },
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
    inputEmail() {
      this.emptyInputEmail = false;
      this.syntaxInputEmail = false;
      this.$refs.refInputEmail.classList.remove('border-red-500');
    },
    inputOTP() {
      this.emptyInputOTP = false;
      this.syntaxInputOTP = false;
      this.$refs.codeOTP.classList.remove('border-red-500');
    },
    password() {
      this.emptyPassword = false;
      this.syntaxPassword = false;
      this.$refs.inputPassword.classList.remove('border-red-500');
    },
    changePassword() {
      this.emptyChangePassword = false;
      this.syntaxChangePassword = false;
      this.$refs.password.classList.remove('border-red-500');
    },
    confirmPassword() {
      this.syntaxConfirmPassword = false;
      this.emptyConfirmPassword = false;
      this.$refs.confirmPassword.classList.remove('border-red-500');
    },
  },
  data() {
    return {
      inputEmail: '',
      inputOTP: '',
      email: '',
      password: '',
      changePassword: '',
      confirmPassword: '',
      sendedOTP: '123',
      isSubmit: false,
      emptyEmail: false,
      emptyInputEmail: false,
      emptyInputOTP: false,
      emptyPassword: false,
      emptyChangePassword: false,
      emptyConfirmPassword: false,
      syntaxEmail: false,
      syntaxInputEmail: false,
      syntaxInputOTP: false,
      syntaxPassword: false,
      syntaxChangePassword: false,
      syntaxConfirmPassword: false,
      focusedEmail: false,
      ERROR_MESSAGE: {
        emptyOTP: ERROR_MESSAGE.OTP_EMPTY,
        emptyEmail: ERROR_MESSAGE.EMAIL_EMPTY,
        emptyPassword: ERROR_MESSAGE.PASSWORD_EMPTY,
        emptyConfirmPassword: ERROR_MESSAGE.CONFIRM_PASSWORD_EMPTY,
        wrongOTP: ERROR_MESSAGE.OTP_SYNTAX,
        wrongEmail: ERROR_MESSAGE.EMAIL_SYNTAX,
        wrongPassword: ERROR_MESSAGE.PASSWORD_SYNTAX,
        wrongConfirmPassword: ERROR_MESSAGE.CONFIRM_PASSWORD_SYNTAX,
      },
      focusedPassword: false,
      showPassword: false,
      modalForgetPassword: false,
      modalChangePassword: false,
    };
  },
  methods: {
    ...mapMutations('auth', ['setEmail', 'setPassword']),
    handleLoginGoogle() {
      googleTokenLogin().then((response) => {
        console.log('Handle the response', response);
      });
    },

    showModalForgetPassword() {
      this.modalForgetPassword = true;
    },
    closeModalForgetPassword() {
      this.changePassword = '';
      this.confirmPassword = '';
      this.modalForgetPassword = false;
    },
    async sendEmailToChangePassword() {
      if (this.inputEmail) {
        this.emptyInputEmail = false;
        const isValidEmail = validEmail(this.inputEmail);
        if (isValidEmail) {
          try {
            await authUser.sendOTP(this.inputEmail);
            // Đăng nhập thành công
            this.syntaxInputEmail = false;
            this.$refs.refInputEmail.classList.remove('border-red-500');
            this.modalChangePassword = true;
            this.modalForgetPassword = false;
            this.emitter.emit('isShowLoading', false);
          } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error('Lỗi', error);
            this.emitter.emit('isShowLoading', false);
          }
        } else {
          this.syntaxInputEmail = true;
          this.$refs.refInputEmail.classList.add('border-red-500');
        }
      } else {
        this.emptyInputEmail = true;
        this.$refs.refInputEmail.classList.add('border-red-500');
      }
    },
    closeModalChangePassword() {
      this.changePassword = '';
      this.confirmPassword = '';
      this.modalChangePassword = false;
      this.modalForgetPassword = true;
    },
    async saveModalChangePassword() {
      if (this.changePassword && this.confirmPassword && this.inputOTP) {
        this.$refs.password.classList.remove('border-red-500');
        this.$refs.codeOTP.classList.remove('border-red-500');
        this.$refs.confirmPassword.classList.remove('border-red-500');
        const isValidPassword = validPassword(this.changePassword);
        const isValidCofirmPassword = validConfirmPassword(
          this.changePassword,
          this.confirmPassword,
        );
        if (
          isValidPassword &&
          isValidCofirmPassword &&
          this.sendedOTP == this.inputOTP
        ) {
          try {
            await authUser.sendOTP(this.inputEmail);
            // Đăng nhập thành công
            this.syntaxInputEmail = false;
            this.$refs.refInputEmail.classList.remove('border-red-500');
            this.modalChangePassword = true;
            this.modalForgetPassword = false;
            this.emitter.emit('isShowLoading', false);
          } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error('Lỗi', error);
            this.emitter.emit('isShowLoading', false);
          }
          this.modalChangePassword = false;
        }
        if (!isValidPassword) {
          this.syntaxChangePassword = true;
          this.$refs.password.classList.add('border-red-500');
        }
        if (!isValidCofirmPassword) {
          this.syntaxConfirmPassword = true;
          this.$refs.confirmPassword.classList.add('border-red-500');
        }
        if (this.sendedOTP != this.inputOTP) {
          this.syntaxInputOTP = true;
          this.$refs.codeOTP.classList.add('border-red-500');
        }
      } else {
        if (!this.inputOTP) {
          this.emptyInputOTP = true;
          this.$refs.codeOTP.classList.add('border-red-500');
        }
        if (!this.changePassword) {
          this.emptyChangePassword = true;
          this.$refs.password.classList.add('border-red-500');
        }
        if (!this.confirmPassword) {
          this.emptyConfirmPassword = true;
          this.$refs.confirmPassword.classList.add('border-red-500');
        }
      }
    },
    validateEmail() {
      const isValidEmail = validEmail(this.email);
      if (this.email.trim() === '' && this.isSubmit) {
        this.$refs.inputEmail.classList.add('border-red-500');
        this.emptyEmail = true;
      } else if (!isValidEmail && this.isSubmit) {
        this.$refs.inputEmail.classList.add('border-red-500');
        this.syntaxEmail = true;
      } else return true;
    },
    validatePassword() {
      const isValidPassword = validPassword(this.password);
      if (this.password.trim() === '' && this.isSubmit) {
        this.$refs.inputPassword.classList.add('border-red-500');
        this.emptyPassword = true;
      } else if (!isValidPassword && this.isSubmit) {
        this.$refs.inputPassword.classList.add('border-red-500');
        this.syntaxPassword = true;
      } else return true;
    },
    goToRegister() {
      this.$router.push({ name: 'Register' });
    },
    handleKeyPress(event) {
      if (event.keyCode === 13) {
        this.handleLogin();
      }
    },
    async handleLogin() {
      this.isSubmit = true;
      const validEmail = this.validateEmail();
      const validPassword = this.validatePassword();
      this.emitter.emit('isShowLoading', true);
      if (validEmail && validPassword) {
        try {
          this.setEmail(this.email);
          this.setPassword(this.password);
          await authUser.login({
            userName: this.email,
            password: this.password,
          });
          // Đăng nhập thành công
          this.emitter.emit('isShowLoading', false);
          this.$router.push({ name: 'BlogPending' });
        } catch (error) {
          // Xử lý lỗi đăng nhập
          console.error('Lỗi đăng nhập:', error);
          this.emitter.emit('isShowLoading', false);
        }
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

/* input::placeholder {
  color: #f00;
} */

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
