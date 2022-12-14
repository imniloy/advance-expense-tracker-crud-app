import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import { clearFilter, setTotalTransitions } from "../../features/filter/filterSlice";
import Transaction from "./Transaction";
import Pagination from './../ui/pagination/Pagination';

export default function Transactions() {
    const { latestTransactions, transactions, isLoading, isError } = useSelector(
        (state) => state?.transaction
    );

    const { searchTransition, transitionType, pagination: { limit, currentPage } } = useSelector(
        (state) => state?.filter
    );

    const dispatch = useDispatch();
    const match = useMatch("/");

    const resetFilter = () => {
        dispatch(clearFilter())
    };

    useEffect(() => {
        dispatch(fetchTransactions({ currentPage, limit, searchTransition, transitionType }))
            .unwrap()
            .then((result) => {
                dispatch(setTotalTransitions(result?.totalTransactions));
            })
            .catch((err) => {
                console.log(err);
            });

        match && resetFilter();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, match, currentPage, limit, searchTransition, transitionType]);

    // decide what to render
    let content;
    const transactionsToRender = match ? latestTransactions : transactions;

    if (isLoading) content = <p className="second_heading">Loading...</p>;

    if (!isLoading && !isError && transactionsToRender?.length > 0) {

        content = transactionsToRender?.map((transaction) => (
            <Transaction key={transaction?.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactionsToRender?.length === 0) content = <p className="second_heading">No transactions found!</p>;

    return (
        <>
            {transactionsToRender.length > 0 && <p className="second_heading">Your Transactions</p>}

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>

            {
                match && transactions.length > 5
                    ?
                    (
                        <Link to="/transactions">
                            <button className="btn loadMore_btn">View All Transactions</button>
                        </Link>
                    )
                    : <Pagination />

            }
        </>
    );
}
