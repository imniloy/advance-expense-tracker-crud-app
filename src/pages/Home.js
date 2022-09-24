import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";
import { setCurrentPage } from "../features/filter/filterSlice";

const Home = () => {
    const dispatch = useDispatch();
    const match = useMatch("/");

    useEffect(() => {
        match && dispatch(setCurrentPage(1));
    }, [match, dispatch])

    return (
        <div className="homepage">
            <Balance />
            <Form />
            <Transactions />
        </div>
    );
};

export default Home;
