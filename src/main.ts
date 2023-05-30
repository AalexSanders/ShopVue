import { createApp } from 'vue';
import store from "./store";
import router from "./router"
import App from './App.vue';
import Wrapper from './components/Wrapper.vue';

const app = createApp(App);
app.use(store).use(router);
app.component('Wrapper', Wrapper);

app.mount('#app');