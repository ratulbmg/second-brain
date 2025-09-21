import axios, { type AxiosResponse } from 'axios';
import config from '../config/config';
import { handleApiError } from '../utils';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginSuccessResponse {
    statusCode: 200;
    data: {
        name: string;
        token: string;
    };
    message: string;
    success: true;
}

const apiClient = axios.create({
    baseURL: config.apiendpointurl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const login = async (credentials: LoginCredentials): Promise<LoginSuccessResponse> => {
    try {
        const response: AxiosResponse<LoginSuccessResponse> = await apiClient.post('/login', credentials);
        return response.data;
    } catch (error: unknown) {
        throw handleApiError(error);
    }
};