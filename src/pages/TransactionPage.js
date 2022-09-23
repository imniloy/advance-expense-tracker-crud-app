import React from "react";
import Balance from "../components/Balance";
import FilterSection from "../components/filtersection/FilterSection";
import Transactions from "../components/Transactions/Transactions";

const TransactionPage = () => {
    return (
        <div>
            <Balance />
            <FilterSection />
            <Transactions />
        </div>
    );
};

export default TransactionPage;
