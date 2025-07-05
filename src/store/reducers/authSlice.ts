import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/user';

interface AuthState {
    token: string | null
    user: UserData | null
    email: string | null
    password: string | null
}

const initialState: AuthState = {
    token: null,
    user: null,
    email: null,
    password: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload
    },
    clearAuth: (state) => {
        state.token = null
        state.user = null
        state.email = null
        state.password = null
    },
    setUser: (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
    },
    setCredentials: (state, action: PayloadAction<{ email: string; password: string }>) => {
        state.email = action.payload.email
        state.password = action.payload.password
    },
  },
});

export const { setToken, clearAuth, setUser, setCredentials } = authSlice.actions
export default authSlice