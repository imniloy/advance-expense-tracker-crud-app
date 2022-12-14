import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransactions,
} from "./transactionAPI";

const initialState = {
    transactions: [],
    latestTransactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {
        onFromEditing: {},
        onMadalEditing: {},
    },
    totalTransactions: 1,
};

// async thunks
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async ({ currentPage, limit, searchTransition, transitionType }) => {
        const transactions = await getTransactions(currentPage, limit, searchTransition, transitionType);
        return transactions;
    }
);

export const createTransaction = createAsyncThunk(
    "transaction/createTransaction",
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction;
    }
);

export const changeTransaction = createAsyncThunk(
    "transaction/changeTransaction",
    async ({ id, data }) => {
        const transaction = await editTransaction(id, data);
        return transaction;
    }
);

export const removeTransaction = createAsyncThunk(
    "transaction/removeTransaction",
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction;
    }
);

// create slice
const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        onFromEditActive: (state, action) => {
            state.editing.onFromEditing = action.payload;
        },
        onFromEditInActive: (state) => {
            state.editing.onFromEditing = {};
        },
        onMadalEditActive: (state, action) => {
            state.editing.onMadalEditing = action.payload;
            // console.log(action);
        },
        onMadalEditInActive: (state) => {
            state.editing.onMadalEditing = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                // console.log(action.payload?.totalTransactions)
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload?.responseData;
                state.latestTransactions = action.payload?.responseData.filter((_, index) => index <= 4)
                state.totalTransactions = action.payload?.totalTransactions;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message;
                state.transactions = [];
                state.latestTransactions = [];
            })
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.unshift(action.payload);
                state.latestTransactions = state.transactions.filter((_, index) => index <= 4);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message;
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;

                const indexToUpdate = state.transactions.findIndex(
                    (t) => t.id === action?.payload?.id
                );

                state.transactions[indexToUpdate] = action.payload;
                state.latestTransactions = state.transactions.filter((_, index) => index <= 4);
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                // console.log(action);
                state.isError = false;
                state.isLoading = false;

                state.transactions = state.transactions.filter(
                    (t) => t.id !== action?.meta?.arg
                );
                state.latestTransactions = state.transactions.filter((_, index) => index <= 4)
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message;
            });
    },
});

export default transactionSlice.reducer;
export const { onFromEditActive, onFromEditInActive, onMadalEditActive, onMadalEditInActive } = transactionSlice.actions;
