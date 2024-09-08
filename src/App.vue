<template>
  <div id="app">
    <HeaderBar :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <router-view @logout="handleLogout" @login="handleLogin" />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('jwt'), // JWT 토큰이 있으면 로그인 상태로 간주
    };
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true; // 로그인 성공 시 상태 업데이트
      console.log('true');
    },
    handleLogout() {
      this.isLoggedIn = false; // 로그아웃 시 상태 업데이트
      console.log('false');
      localStorage.removeItem('jwt'); // JWT 토큰 삭제
    },
  },
};
</script>