import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { listEvent } from '../../restapi/queries'

export const API_URL =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URL_LOCALHOST
        : process.env.REACT_APP_API_URL_PRODUCTION

export const getEventList = createAsyncThunk('filterList', async (id) => {
    const url = `${API_URL}${listEvent}?itemsPerPage=300&pagesVisited=0&pid=${id}`
    const headers = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const response = await fetch(url, headers)
    // const response = await fetch(url)
    return await response.json()
})

export const filterListSlice = createSlice({
    name: 'filterList',
    initialState: { data: [], status: 'pending' },

    extraReducers: {
        [getEventList.pending]: (state) => {
            state.status = 'pending'
        },
        [getEventList.fulfilled]: (state, { payload }) => {
            state.data = payload.records
            state.status = 'success'
            state.count = payload.count
        },
        [getEventList.rejected]: (state, { error }) => {
            state.data = []
            state.status = 'failure'
            state.error = error
        },
    },
})

export default filterListSlice.reducer
