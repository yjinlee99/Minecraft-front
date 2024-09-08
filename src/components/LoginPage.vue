<template>
    <div class="login-page">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import apiClient from '../axios';

export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                // 서버로 로그인 요청 전송
                const response = await apiClient.post('/login', {
                    username: this.username,
                    password: this.password,
                });

                // Authorization 헤더에서 JWT 토큰 가져오기
                const token = response.headers['authorization'] || response.headers['Authorization'];

                if (token) {
                    // 'Bearer ' 부분을 제외한 토큰만 추출
                    const jwtToken = token.replace('Bearer ', '');

                    localStorage.setItem('jwt', jwtToken);
                    alert('로그인 성공!');

                    // 부모(App.vue)의 로그인 핸들러 호출
                    this.$emit('login');

                    this.$router.push('/'); // 로그인 후 홈으로 리디렉션
                } else {
                    this.errorMessage = '토큰이 반환되지 않았습니다.';
                }
            } catch (error) {
                console.error('로그인 실패:', error);
                alert('로그인에 실패했습니다.');
            }
        },
    },
};
</script>

<style scoped>
.login-page {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
}

input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
}

.error {
    color: red;
    text-align: center;
}
</style>