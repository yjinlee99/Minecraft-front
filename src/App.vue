<template>
  <div id="app">
    <HeaderBar />
    <ShopPage />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import ShopPage from './components/ShopPage.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    ShopPage,
  },
};
</script>

<style>
/* 추가 스타일이 필요하면 여기에 작성 */
</style>