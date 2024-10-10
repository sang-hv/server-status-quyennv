import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    data: [],
}

const apiUrl = process.env.REACT_APP_API_URL;
export const getServerStatus = createAsyncThunk('serverStatus/getServerStatus', async () => {
    const response = await fetch(apiUrl);
    return await response.json()
})

export const serverStatusSlice = createSlice({
    name: 'serverStatus',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getServerStatus.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getServerStatus.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getServerStatus.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})