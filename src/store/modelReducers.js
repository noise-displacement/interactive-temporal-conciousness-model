import { createSlice } from '@reduxjs/toolkit'

export const modelSlice = createSlice({
    name: 'model',
    initialState: {
        currentExample: null,
    },

    reducers: {
        setCurrentExample: (state, action) => {
            state.currentExample = action.payload;
        }
    }
})

export const { setCurrentExample } = modelSlice.actions
export default modelSlice.reducer;