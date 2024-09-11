<template>
    <div class="card">
        <img :src="item.img" :alt="item.name" class="card-image" />
        <h3 class="card-title">{{ item.name }}</h3>
        <p class="card-price">{{ item.price }} coins</p>
        <button class="card-button" @click="checkLoginAndBuy">Buy Now</button>
    </div>
</template>

<script>
import Bootpay from '@bootpay/client-js';
import apiClient from '../axios';

export default {
    name: 'SkinCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async checkLoginAndBuy() {
            const token = localStorage.getItem('jwt');

            if (!token) {
                // 로그인이 되어 있지 않다면 로그인 페이지로 리디렉션
                this.$router.push('/login');
                return;
            }

            // 로그인이 되어 있으면 결제 진행
            this.buyItem();
        },

        async buyItem() {
            try {
                // 1. 서버에 주문 생성 요청 (JWT 토큰 포함)
                const orderResponse = await apiClient.post('/api/order/v1/create', {
                    itemId: this.item.id
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

                const orderId = orderResponse.data.orderId;
                const MemberId = orderResponse.data.member.id;
                const MemberUsername = orderResponse.data.member.username;

                console.log(MemberId + MemberUsername);

                // 2. Bootpay 결제 요청 (분리승인 옵션 추가)
                const paymentResponse = await Bootpay.requestPayment({
                    application_id: '66d43bf5cc5274a3ac3fc16f',
                    price: this.item.price,
                    order_name: this.item.name,
                    order_id: orderId,
                    pg: '토스',
                    method: '카드',
                    tax_free: 0,
                    user: {
                        id: MemberId,
                        username: MemberUsername,
                        phone: '01000000000',
                        email: 'test@test.com',
                    },
                    extra: {
                        open_type: 'iframe',
                        escrow: false,
                        separately_confirmed: true, // 분리승인 활성화
                    },
                });

                console.log('결제 성공:', paymentResponse);
                this.verifyPayment(paymentResponse.receipt_id);
            } catch (error) {
                // JWT 토큰이 유효하지 않다면 로그아웃 처리
                if (error.response && error.response.status === 500) {
                    this.logout(); // 로그아웃 처리
                } else {
                    console.error('결제 실패:', error);
                    alert('결제에 실패했습니다.');
                }
            }
        },

        logout() {
            localStorage.removeItem('jwt'); // JWT 토큰 삭제
            this.$emit('logout'); // 부모 컴포넌트(App.vue)로 로그아웃 이벤트 전달
            console.log("로그아웃");
            this.$router.push('/login'); // 로그인 페이지로 리디렉션
        },

        async verifyPayment(receipt_id) {
            try {
                // 결제 검증 요청을 서버에 전송
                const response = await apiClient.post('/api/order/v1/verify', { receipt_id });

                console.log('결제 검증 성공:', response.data);

                // 결제가 검증되면 분리승인 요청
                this.approvePayment(receipt_id);
            } catch (error) {
                // 결제 검증에서 오류가 발생하면 분리승인 요청을 보내지 않음
                console.error('결제 검증 실패:', error);
                alert('결제 검증에 실패했습니다.');
                Bootpay.destroy();
            }
        },

        async approvePayment(receipt_id) {
            try {
                // 서버에 결제 승인 요청
                const response = await apiClient.post('/api/order/v1/approve', { receipt_id });

                console.log('결제 승인 성공:', response.data);

                Bootpay.destroy();
                this.$router.push('/payment-complete');

            } catch (error) {
                console.error('결제 승인 실패:', error);
                alert('결제 승인에 실패했습니다.');
                Bootpay.destroy();
            }
        },
    },
};
</script>
<style scoped>
.card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
}

.card-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

.card-title {
    font-size: 18px;
    margin: 10px 0;
}

.card-price {
    color: #666;
    margin-bottom: 10px;
}

.card-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.card-button:hover {
    background-color: #218838;
}
</style>