<template>
    <div class="card">
        <img :src="item.image" :alt="item.name" class="card-image" />
        <h3 class="card-title">{{ item.name }}</h3>
        <p class="card-price">{{ item.price }} coins</p>
        <button class="card-button" @click="buyItem">Buy Now</button>
    </div>
</template>

<script>
export default {
    name: 'SkinCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        buyItem() {
            // 아이템 구매 로직을 여기에 추가
            alert(`Purchased: ${this.item.name}`);
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