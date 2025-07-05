import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
})

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await apiClient.request<T>(config);
        return response.data;
    } catch (error: any) {
    if (error.response) {
        console.error('Server error:', error.response.status, error.response.data);
        throw new Error(error.response.data?.message || 'Server error');
    } else if (error.request) {
        console.error("Server doesn't responce:", error.request);
        throw new Error("Server doesn't responce:");
    } else {
        console.error('Request error:', error.message);
        throw new Error(error.message);
    }
    }
};

export default apiClient;