import { createRouter, createWebHistory } from 'vue-router';
import ShopPage from '../components/ShopPage.vue';
import LoginPage from '../components/LoginPage.vue';
import HeaderBar from '../components/HeaderBar.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        components: {
            default: ShopPage,
            header: HeaderBar, // 헤더를 유지하려면 이렇게 등록
        },
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            default: LoginPage,
            header: HeaderBar, // 헤더를 유지하려면 이렇게 등록
        },
    },
];

const router = createRouter({
    history: createWebHistory(), // 히스토리 모드를 사용하여 URL을 처리
    routes,
});

export default router;