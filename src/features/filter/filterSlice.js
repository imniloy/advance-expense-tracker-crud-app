import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchTransition: "",
    transitionType: "",
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
        filterByTransitionsType(state, action) {
            state.transitionType = action.payload;
        },
        filterByQuery(state, action) {
            state.searchTransition = action.payload;
            state.pagination.currentPage = 1;
        },
        clearFilter(state, action) {
            state.searchTransition = '';
            state.transitionType = '';
            state.pagination.currentPage = 1;
        },
    },
})

export const { setCurrentPage, setTotalTransitions, filterByTransitionsType, filterByQuery, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;