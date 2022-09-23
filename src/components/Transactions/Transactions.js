import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

export default function Transactions() {
    const dispatch = useDispatch();

    const { latestTransactions, transactions, isLoading, isError } = useSelector(
        (state) => state?.transaction
    );

    console.log(transactions);
    console.log(latestTransactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    // decide what to render
    let content = null;

    if (isLoading) content = <p className="second_heading">Loading...</p>;

    if (!isLoading && !isError && transactions?.length > 0 && latestTransactions?.length > 0) {
        content = latestTransactions?.map((latestTransaction) => (
            <Transaction key={latestTransaction?.id} transaction={latestTransaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p className="second_heading">No transactions found!</p>;
    }

    return (
        <>
            {latestTransactions.length > 0 && <p className="second_heading">Your Transactions</p>}

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>

            {transactions.length > 5 && (
                <Link to="/transactions">
                    <button className="btn loadMore_btn">View All Transactions</button>
                </Link>
            )}
        </>
    );
}
