import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeTransaction,
    createTransaction,
    onFromEditInActive,
} from "../features/transaction/transactionSlice";

export default function Form() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, isError, error } = useSelector((state) => state?.transaction);
    const { editing: { onFromEditing } } = useSelector((state) => state?.transaction);

    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = onFromEditing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [onFromEditing]);

    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    };

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        );
        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id: onFromEditing?.id,
                data: {
                    name: name,
                    amount: Number(amount),
                    type: type,
                },
            })
        );
        setEditMode(false);
        reset();
    };

    const cancelEditMode = () => {
        dispatch(onFromEditInActive())
        reset();
        setEditMode(false);
    };

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="enter title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <label>
                            <input
                                required
                                type="radio"
                                value="income"
                                name="type"
                                checked={type === "income"}
                                onChange={(e) => setType("income")}
                            />
                            <span className="">Income</span>
                        </label>
                    </div>
                    <div className="radio_group">
                        <label className="label">
                            <input
                                type="radio"
                                value="expense"
                                name="type"
                                placeholder="Expense"
                                checked={type === "expense"}
                                onChange={(e) => setType("expense")}
                            />
                            <span>Expense</span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        required
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type="submit">
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>

                {
                    !isLoading && isError && (
                        <p className="error">{error}</p>
                    )
                }
            </form >

            {editMode && (
                <button className="btn cancel_edit" onClick={cancelEditMode}>
                    Cancel Edit
                </button>
            )
            }
        </div >
    );
}
