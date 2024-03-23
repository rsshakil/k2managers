import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAppNotice } from '../../restapi/queries'

export const API_URL =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URL_LOCALHOST
        : process.env.REACT_APP_API_URL_PRODUCTION

export const getAppList = createAsyncThunk('appList', async (id) => {
    const url = `${API_URL}${getAppNotice}?itemsPerPage=300&pagesVisited=0&pid=${id}`
    const headers = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const response = await fetch(url, headers)
    // const response = await fetch(url)
    return await response.json()
})

export const appListSlice = createSlice({
    name: 'appList',
    initialState: { data: [], status: 'pending' },

    extraReducers: {
        [getAppList.pending]: (state) => {
            state.status = 'pending'
        },
        [getAppList.fulfilled]: (state, { payload }) => {
            state.data = payload.records
            state.status = 'success'
            state.count = payload.count
        },
        [getAppList.rejected]: (state, { error }) => {
            state.data = []
            state.status = 'failure'
            state.error = error
        },
    },
})

export default appListSlice.reducer
