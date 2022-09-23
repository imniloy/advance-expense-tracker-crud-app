import React from "react";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import FilterSection from "../components/filtersection/FilterSection";
import Transactions from "../components/Transactions/Transactions";

const TransactionPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Balance />
            <FilterSection />
            <Transactions />
        </div>
    );
};

export default TransactionPage;
