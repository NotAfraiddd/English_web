import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.css";
import ConfirmModal from "./components/admin/ConfirmModal.vue";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import mitt from "mitt";
const emitter = mitt();

const app = createApp(App)
  .component("confirm-modal", ConfirmModal)
  .use(router)
  .use(store)
  .use(Antd);

app.config.globalProperties.emitter = emitter;
store.emitter = emitter;
app.mount("#app");
