<template>
    <div class="payment-complete">
        <h1>결제가 완료되었습니다!</h1>
        <p>주문이 성공적으로 처리되었습니다. 감사합니다.</p>
        <router-link to="/">홈으로 돌아가기</router-link>
    </div>
</template>

<script>
export default {
    name: 'PaymentComplete',
};
</script>

<style scoped>
.payment-complete {
    text-align: center;
    margin-top: 100px;
}

.payment-complete h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.payment-complete p {
    font-size: 1.2em;
    margin-bottom: 30px;
}

.payment-complete a {
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
}
</style>
