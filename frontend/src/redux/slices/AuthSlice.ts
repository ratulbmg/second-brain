import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AuthState {
    status: boolean;
    token: string | null;
    user: string | null;
}

const initialState: AuthState = {
    status: localStorage.getItem("token") === null ? false : true,
    token: localStorage.getItem("token") !== null ? localStorage.getItem("token") : null,
    user: localStorage.getItem("user") !== null ? localStorage.getItem("user") : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.status = action.payload.status;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer