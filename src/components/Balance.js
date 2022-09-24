import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance } from "../features/totalBalance/getTotalBalanceSlice";
import numberWithCommas from "../utils/numberWithCommas";

export default function Balance() {
    const { totalBalance } = useSelector((state) => state?.balance);
    const { transactions } = useSelector((state) => state?.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBalance());
    }, [dispatch, transactions])

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>{" "}
                <span>
                    {numberWithCommas(totalBalance)}
                </span>
            </h3>
        </div>
    );
}
