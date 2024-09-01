<template>
    <header class="header">
        <div class="header-left">
            Minecraft Store
        </div>
        <div class="header-right">
            {{ username ? username : 'Guest' }}
        </div>
    </header>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'HeaderBar',
    data() {
        return {
            username: '', // 닉네임을 저장할 변수
        };
    },
    created() {
        // JWT 토큰을 쿠키에서 가져와 디코딩하고 사용자 정보를 추출
        const token = Cookies.get('jwt'); // 쿠키에서 'jwt'라는 이름의 토큰을 가져옴
        if (token) {
            try {
                // JWT를 디코딩하여 사용자 이름 추출 (디코딩 라이브러리 필요)
                const payload = JSON.parse(atob(token.split('.')[1])); // JWT payload 부분을 디코딩
                this.username = payload.username; // 토큰에서 사용자 이름 추출
            } catch (error) {
                console.error('Failed to decode JWT:', error);
            }
        }
    },
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