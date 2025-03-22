import { createSlice } from "@reduxjs/toolkit";
import { token } from "../utils";

const auth = createSlice({
    name: "auth",
    initialState: {
        email: "",
        password: "",
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            if (action.payload.email === state.email && action.payload.password === state.password) {
                state.isLoggedIn = true;
                window.localStorage.setItem('token', token());
            }
        },
        register: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            window.localStorage.removeItem('token');
        }
    }
});

const {actions, reducer} = auth;

export const {login, register, logout} = actions;

export default reducer;