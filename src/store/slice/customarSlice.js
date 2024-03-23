import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const API_URL =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URL_LOCALHOST
        : process.env.REACT_APP_API_URL_PRODUCTION

export const getCustomerList = createAsyncThunk('customerList', async (api) => {
    const headers = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const response = await fetch(api, headers)
    // const response = await fetch(api)
    return await response.json()
})

export const customerSlice = createSlice({
    name: 'customerList',
    initialState: {
        events: [],
        status: 'pending',
        limit: 300,
        page: 1,
        count: 0,
    },

    extraReducers: {
        [getCustomerList.pending]: (state) => {
            state.status = 'pending'
        },
        [getCustomerList.fulfilled]: (state, { payload }) => {
            state.events = payload.records
            state.status = 'success'
            state.count = payload.count
            state.page = payload.page || 1
            state.limit = parseInt(payload.limit)
        },
        [getCustomerList.rejected]: (state, { error }) => {
            state.events = []
            state.status = 'failure'
            state.error = error
        },
    },
})

export default customerSlice.reducer
