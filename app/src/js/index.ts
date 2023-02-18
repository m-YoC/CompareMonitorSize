import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./index.vue"

const app = createApp(App).use(createPinia()).mount("#root");
