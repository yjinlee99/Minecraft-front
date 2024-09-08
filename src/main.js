import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 라우터 파일 가져오기

createApp(App)
    .use(router) // 라우터 사용
    .mount('#app');