import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchTransition: "",
    pagination: {
        limit: 10,
        currentPage: 1,
        totalTransition: 1,
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.pagination.currentPage = action.payload;
        },
        setTotalTransitions(state, action) {
            state.pagination.totalTransition = action.payload;
        },
        filterByIncome(state, action) {
        },
        filterByExpense(state, action) {
        },
        searched(state, action) {
        },
    },
})

export const { setCurrentPage, setTotalTransitions, filterByIncome, filterByExpense } = filterSlice.actions;
export default filterSlice.reducer;