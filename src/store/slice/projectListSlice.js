import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseURL, listMethod, listProject } from '../../restapi/queries'
import { instance } from "../../services/axios.js"

export const getProjectList = createAsyncThunk('projectList', async () => {
    const ENDPOINT = `${baseURL}${listProject}?itemsPerPage=300&pagesVisited=0` 
    const config = {
        method: listMethod,
        url: ENDPOINT,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    }
    const response = await instance.request(config);
    return await response.data
})

export const projectListSlice = createSlice({
    name: 'projectList',
    initialState: { data: [], status: 'pending', projectId: null },

    extraReducers: {
        [getProjectList.pending]: (state) => {
            state.status = 'pending'
        },
        [getProjectList.fulfilled]: (state, { payload }) => {
            state.data = payload.records
            state.status = 'success'
            state.count = payload.count
        },
        [getProjectList.rejected]: (state, { error }) => {
            state.status = 'failure'
            state.error = error
        },
    },

    reducers: {
        makeProjectID: (state, { payload }) => {
            state.projectId = payload
        },
    },
})

export default projectListSlice.reducer
export const { makeProjectID } = projectListSlice.actions
