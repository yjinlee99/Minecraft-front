<template>
    <div class="shop-page">
        <div class="card-grid">
            <SkinCard v-for="item in paginatedItems" :key="item.id" :item="item" />
        </div>
        <div class="pagination">
            <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }"
                @click="goToPage(page)">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script>
import SkinCard from './SkinCard.vue';

export default {
    name: 'ShopPage',
    components: {
        SkinCard,
    },
    data() {
        return {
            items: [ // 예시 아이템 목록
                { id: 1, name: 'Item 1', price: 100, image: 'https://via.placeholder.com/150' },
                { id: 2, name: 'Item 2', price: 150, image: 'https://via.placeholder.com/150' },
                { id: 3, name: 'Item 3', price: 150, image: 'https://via.placeholder.com/150' },
                { id: 4, name: 'Item 4', price: 150, image: 'https://via.placeholder.com/150' },
                // 더 많은 아이템을 여기에 추가
            ],
            currentPage: 1,
            itemsPerPage: 18, // 한 페이지에 표시할 카드 수 (3 x 6)
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.items.slice(start, end);
        },
    },
    methods: {
        goToPage(page) {
            this.currentPage = page;
        },
    },
};
</script>

<style scoped>
.shop-page {
    padding: 20px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.pagination {
    text-align: center;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
}

.pagination button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.pagination button:hover:not(.active) {
    background-color: #f1f1f1;
}
</style>