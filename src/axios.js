import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://172.18.160.1:8080', // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json',
        // 필요에 따라 추가 헤더를 설정할 수 있습니다.
    },
});

export default apiClient;