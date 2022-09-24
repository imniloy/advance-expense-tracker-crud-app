import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalBalance } from "./getTotalBalanceAPI";

const initialState = {
    isLoading: false,
    isError: false,
    totalBalance: 0,
    error: ''
};

const calculateBalance = ((transactions) => {
    let balance = 0;
    transactions?.forEach((transaction) => {
        // console.log(transaction)
        const { type, amount } = transaction || {};
        if (type === "income") {
            balance += amount;
        }
        else if (type === "expense") {
            balance -= amount;
        }
    });
    return balance;
});

// async thunks
export const getBalance = createAsyncThunk(
    "transaction/getBalance",
    async () => {
        const response = await getTotalBalance();
        return calculateBalance(response.data);
    }
);

// create slice
const getTotalBalanceSlice = createSlice({
    name: "getTotalBalanceSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                console.log(action);
                state.isError = false;
                state.isLoading = false;
                state.totalBalance = action.payload;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action?.error?.message;
            })
    },
});

export default getTotalBalanceSlice.reducer;
