import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { checkAuth, clearUser, loginUser, passwordChange, verifyToken } from '../../api/auth';

export const fetchUser = createAsyncThunk('auth/signin', async (userInfo) => await loginUser(userInfo));
export const changePassword = createAsyncThunk('auth/change-password', async (info) => passwordChange(info));
export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (info) => await verifyToken(info));
export const checkUserToken = createAsyncThunk('auth/checkUser', async (info) => await checkAuth(info));
export const logOut = createAsyncThunk('auth/signout', async (_, { getState }) => {
    getState().auth.info.accountId && clearUser({ accountId: getState().auth.info.accountId });
});

// initial state of auth slice
const initialState = {
    initialLoading: true,
    info: {},
    loading: false,
    error: null,
    isLoggedIn: false,
    title: 'ログイン',
    passState: null,
};

// slices
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        // login user: pending state
        [fetchUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.info = {};
        },

        // login user: success state
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;

            if (payload.mfa) {
                state.mfa = true;
                state.info.accountId = payload.user.accountId;
            } else {
                state.info = payload.user;
                state.lastLoginFailureCount = payload.lastLoginFailureCount;
                state.lastLoginTime = payload.lastLoginTime;
                state.role = payload.role;
                state.csrf = payload.csrf;
                state.token = payload.token;
                state.accountUUID = payload.accountUUID;
            }
            if (payload.initialPassword) state.initial = true;
            if (payload.passwordExpired) {
                Cookies.remove('sessionID', { domain: window.location.hostname });
                state.expired = true;
                state.isLoggedIn = false;
            } else {
                state.isLoggedIn = payload.isLoggedIn;
            }

            if (payload.hasOwnProperty('passwordExpireLimit')) {
                state.limit = payload.passwordExpireLimit;
            }
        },

        // login user: failed state
        [fetchUser.rejected]: (state, { error }) => {
            state.loading = false;
            state.info = {};
            state.error = error?.message;
            if (error.message === 'account locked') state.isLocked = true;
        },

        // Change the passwords: pending state
        [changePassword.pending]: (state) => {
            state.passState = 'pending';
        },

        // Change the passwords: success state
        [changePassword.fulfilled]: (state, { payload }) => {
            state.loading = false;
            if (payload.message === 'success') {
                if (state.initial) delete state.initial;
                state.passState = 'success';
            }
        },

        // Change the passwords: failed state
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            if (action.error) {
                state.passState = 'error';
                state.code = action.error.message ? action.error.message : 500;
            }
        },

        // verify the OTP from email: pending state
        [verifyOTP.pending]: (state, action) => {
            state.loading = true;
        },

        // verify the OTP from email: success state
        [verifyOTP.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.info = payload.user;

            state.lastLoginFailureCount = payload.lastLoginFailureCount;
            state.lastLoginTime = payload.lastLoginTime;
            state.role = payload.role;
            state.csrf = payload.csrf;
            state.token = payload.token;
            state.accountUUID = payload.accountUUID;

            if (payload?.initialPassword) state.initial = true;
            if (payload.passwordExpired) {
                Cookies.remove('sessionID', { domain: window.location.hostname });
                state.expired = true;
                state.isLoggedIn = false;
            } else {
                state.isLoggedIn = payload.isLoggedIn;
            }
            if (payload.passwordExpireLimit) state.limit = payload.passwordExpireLimit;
        },

        // verify the OTP from email: failed state
        [verifyOTP.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            if (action.error.message === 'account locked') state.isLocked = true;
        },

        // check user when browser is reloaded: pending state
        [checkUserToken.pending]: (state, { payload }) => {
            state.initialLoading = true;
        },
        // check user when browser is reloaded: success state
        [checkUserToken.fulfilled]: (state, { payload }) => {
            if (payload.user && payload.user.accountId != null) {
                state.initialLoading = false;
                state.error = null;
                state.info = payload.user;
                state.isLoggedIn = payload.isLoggedIn;
                state.lastLoginFailureCount = payload.lastLoginFailureCount;
                state.lastLoginTime = payload.lastLoginTime;
                state.role = payload.role;
                state.accountUUID = payload.accountUUID;
                if (payload?.initialPassword) state.initial = true;
                if (payload.passwordExpireLimit) state.limit = payload.passwordExpireLimit;
            } else if (payload.mfa) {
                state.mfa = true;
                state.initialLoading = false;
                state.isLoggedIn = false;
                state.info.accountId = payload.user.accountId;
            } else {
                state.initialLoading = false;
                state.isLoggedIn = false;
            }
        },
        // check user when browser is reloaded: failed state
        [checkUserToken.rejected]: (state, { error }) => {
            state.initialLoading = false;
            state.error = error.message;
            state.isLoggedIn = false;
            if (error.message === 'account locked') state.isLocked = true;
        },

        [logOut.pending]: (state) => {
            state.loading = true;
            state.isLoggedIn = false;
            Cookies.remove('sessionID', { domain: window.location.hostname });
        },
        [logOut.fulfilled]: (state) => {
            sessionStorage.clear();
            state.isLoggedIn = false;
            Cookies.remove('sessionID', { domain: window.location.hostname });
            return {
                ...initialState,
                initialLoading: false,
            };
        },
        [logOut.rejected]: (state, { payload, error }) => {
            state.loading = false;
            state.error = error.message;
            state.isLoggedIn = false;
            Cookies.remove('sessionID', { domain: window.location.hostname });
        },
    },

    // logout the user and clear the sessionStorage
    reducers: {
        offInitialize: (state) => {
            state.initialLoading = false;
        },
        clearCookie: (state) => {
            state.clearCookies = true;
        },
        keepCookie: (state) => {
            state.clearCookies = false;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        changeTitle: (state, { payload }) => {
            state.title = payload;
        },
        deletePasswordState: (state) => {
            delete state.passState;
        },
        clearError: (state) => {
            state.error = null;
            state.passState = null;
        },
    },
});

export default authSlice.reducer;
export const {
    offInitialize,
    clearCookie,
    keepCookie,
    setError,
    setLoading,
    changeTitle,
    deletePasswordState,
    clearError,
} = authSlice.actions;
