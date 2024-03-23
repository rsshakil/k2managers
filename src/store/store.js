import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import projectListReducer from './slice/projectListSlice';
// import { save, load } from 'redux-localstorage-simple'; //追記

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projectList: projectListReducer,
    },
});
