// import './assets/main.css'

import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);

// Set axios as a global property
app.config.globalProperties.$axios = axios;

// Use the router & ElementPlus
app.use(router);
app.use(ElementPlus);

// Mount the app
app.mount('#app');