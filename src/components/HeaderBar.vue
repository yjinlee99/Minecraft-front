<template>
    <header class="header">
        <div class="header-left">
            Minecraft Store
        </div>
        <div class="header-right">
            <span v-if="isLoggedIn">
                <router-link to="/my-items">My Items</router-link>
                {{ username }}
                <button @click="logout">Logout</button>
            </span>
            <span v-else>
                <button @click="navigateToLogin">Login</button>
            </span>
        </div>
    </header>
</template>

<script>
export default {
    props: ['isLoggedIn'], // 로그인 상태를 부모로부터 전달받음
    data() {
        return {
            username: '', // 닉네임 저장 변수
        };
    },
    watch: {
        isLoggedIn(newVal) {
            if (newVal) {
                this.fetchUsername(); // 로그인 상태가 변경되면 사용자 이름을 가져옴
            }
        }
    },
    created() {
        if (this.isLoggedIn) {
            this.fetchUsername(); // 초기 로드 시 로그인 상태면 사용자 이름을 가져옴
        }
    },
    methods: {
        fetchUsername() {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    this.username = payload.username; // 토큰에서 사용자 이름 추출
                } catch (error) {
                    console.error('Failed to decode JWT:', error);
                }
            }
        },
        logout() {
            this.$emit('logout'); // 부모(App.vue)로 로그아웃 이벤트 전송
        },
        navigateToLogin() {
            this.$router.push('/login'); // 로그인 페이지로 이동
        }
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
}

.header-left {
    font-size: 20px;
    font-weight: bold;
}

.header-right {
    font-size: 16px;
}
</style>