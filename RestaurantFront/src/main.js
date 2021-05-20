import { createApp } from 'vue';
import router from '@/router.js';
import store from './store';
import App from './App.vue';
import './index.css';
import 'bulma/css/bulma.css';

const app = createApp(App);
app.use(store);
app.use(router);

app.mount('#app');
