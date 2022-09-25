import React from "react";
import { useSelector } from "react-redux";
import Balance from "../components/Balance";
import FilterSection from "../components/filtersection/FilterSection";
import Transactions from "../components/Transactions/Transactions";
import UpdateTransaction from './../components/ui/madal/updateTransaction';

const TransactionPage = () => {
    const { editing: { onMadalEditing } } = useSelector((state) => state?.transaction);
    console.log(onMadalEditing)

    return (
        <div>
            {onMadalEditing?.id && <UpdateTransaction />}
            <Balance />
            <FilterSection />
            <Transactions />
        </div>
    );
};

export default TransactionPage;
