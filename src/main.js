import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.css';
import ConfirmModal from './components/admin/ConfirmModal.vue';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import mitt from 'mitt';
import vue3GoogleLogin from 'vue3-google-login';
import VueSocketIO from 'vue-3-socket.io';
import socketio from 'socket.io-client';
import Notifications from '@kyvg/vue3-notification';
const emitter = mitt();
var socketIOLocation = process.env.VUE_APP_SOCKETIO_PORT;
const SocketInstance = socketio.connect(socketIOLocation);

const app = createApp(App)
  .component('confirm-modal', ConfirmModal)
  .use(router)
  .use(store)
  .use(vue3GoogleLogin, {
    clientId:
      '50385097493-mcao4pi81kmo58or518pd6rdk0kkppp8.apps.googleusercontent.com',
  })
  .use(Antd)
  .use(Notifications)
  .use(
    new VueSocketIO({
      connection: SocketInstance,
      debug: true,
    }),
  );

app.config.globalProperties.emitter = emitter;
store.emitter = emitter;
app.mount('#app');
