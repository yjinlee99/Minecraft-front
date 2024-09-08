<template>
    <div class="shop-page">
        <div class="card-grid">
            <SkinCard v-for="item in paginatedItems" :key="item.id" :item="item" @logout="handleLogout" />
            <!-- @logout 추가 -->
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
import apiClient from '../axios';
import SkinCard from './SkinCard.vue';

export default {
    name: 'ShopPage',
    components: {
        SkinCard,
    },
    data() {
        return {
            items: [],
            currentPage: 1,
            itemsPerPage: 18,
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
        async fetchItems() {
            try {
                const response = await apiClient.get('/api/store');
                this.items = response.data;
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        },
        goToPage(page) {
            this.currentPage = page;
        },
        handleLogout() {
            this.$emit('logout'); // 상위 컴포넌트인 App.vue로 이벤트 전송
        },
    },
    mounted() {
        this.fetchItems();
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