import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.css';
import ConfirmModal from './components/admin/ConfirmModal.vue';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import mitt from 'mitt';
import GAuth from 'vue-google-oauth2';
const emitter = mitt();

const gauthOption = {
  clientId:
    '50385097493-mcao4pi81kmo58or518pd6rdk0kkppp8.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: false,
};
const app = createApp(App)
  .component('confirm-modal', ConfirmModal)
  // .use(GAuth, gauthOption)
  .use(router)
  .use(store)
  .use(Antd);

app.config.globalProperties.emitter = emitter;
store.emitter = emitter;
app.mount('#app');
