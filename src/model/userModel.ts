export interface UserRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    name: string;
    token: string;
}