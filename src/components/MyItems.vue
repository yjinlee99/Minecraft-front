<template>
    <div class="my-items">
        <h1>My Purchased Skins</h1>
        <ul v-if="items.length > 0">
            <li v-for="item in items" :key="item.id">
                <img :src="item.img" :alt="item.name" class="item-image" />
                <p>{{ item.name }}</p>
                <button :disabled="item.id === selectedSkinId" @click="selectSkin(item)">
                    {{ item.id === selectedSkinId ? 'Selected' : 'Select' }}
                </button>
            </li>
        </ul>
        <p v-else>구매한 스킨이 없습니다.</p>
    </div>
</template>

<script>
import apiClient from '../axios'; // axios 인스턴스

export default {
    name: 'MyItems',
    data() {
        return {
            items: [], // 구매한 스킨 목록
            selectedSkinId: null, // 현재 선택된 스킨 ID
        };
    },
    created() {
        this.fetchItems(); // 컴포넌트 생성 시 스킨 목록 불러오기
    },
    methods: {
        async fetchItems() {
            try {
                // 서버에서 구매한 스킨 목록과 현재 선택된 스킨을 불러오기
                const response = await apiClient.get('/api/user-item', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                this.items = response.data.items; // 스킨 목록 초기화
                this.selectedSkinId = response.data.selectedSkinId; // 현재 선택된 스킨 ID
            } catch (error) {
                console.error('스킨 목록을 불러오는 데 실패했습니다.', error);
                alert('스킨 목록을 불러오는 데 실패했습니다.');
            }
        },
        async selectSkin(item) {
            try {
                // 서버로 선택한 스킨 정보를 전송하여 업데이트
                await apiClient.post('/api/user-item/select', { skinId: item.id }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });

                // 서버로 전송 후 선택된 스킨 ID 업데이트 및 페이지 새로고침
                this.selectedSkinId = item.id;
                alert(`${item.name} 스킨이 선택되었습니다.`);
                this.fetchItems(); // 스킨 목록 다시 불러오기
            } catch (error) {
                console.error('스킨 선택에 실패했습니다.', error);
                alert('스킨 선택에 실패했습니다.');
            }
        },
    },
};
</script>

<style scoped>
.my-items {
    text-align: center;
}

.my-items ul {
    list-style-type: none;
    padding: 0;
}

.my-items li {
    display: inline-block;
    margin: 10px;
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    transition: transform 0.2s;
}

.my-items li:hover {
    transform: scale(1.05);
}

.item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
}

button {
    padding: 5px 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    transition: background-color 0.3s;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>