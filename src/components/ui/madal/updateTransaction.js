import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { changeTransaction, onMadalEditInActive } from '../../../features/transaction/transactionSlice';
// import { editing:{ onFromEditing, onMadalEditing}} from '';

ReactModal.setAppElement('#root');

const UpdateTransaction = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(true);

    const dispatch = useDispatch();
    const { isLoading, isError, error, editing: { onMadalEditing } } = useSelector((state) => state?.transaction);

    useEffect(() => {
        const { id, name, amount, type } = onMadalEditing || {};
        if (id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            setEditMode(false);
            reset();
        }
    }, [onMadalEditing])

    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    };

    const cancelEditMode = () => {
        dispatch(onMadalEditInActive())
        reset();
        setEditMode(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id: onMadalEditing?.id,
                data: {
                    name: name,
                    amount: Number(amount),
                    type: type,
                },
            })
        );
        setEditMode(false);
        reset();
        dispatch(onMadalEditInActive())
    };

    return (
        <ReactModal
            isOpen={editMode}
            onRequestClose={() => setEditMode(false)}
            style={
                {
                    overlay: {
                        background: '#c9cacd',
                    }, content: {
                        width: 'fit-content',
                        height: 'fit-content',
                        position: 'absolute',
                        padding: "20px",
                        top: '50%',
                        left: '50%',
                        right: '50%',
                        bottom: '50%',
                        transform: "translate(-50%, -50%)",
                        background: 'white',
                        outline: "none",
                    }
                }
            }
        >
            <div className="form">
                <h3>Add new transaction</h3>

                <form onSubmit={handleUpdate}>
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
        </ReactModal >
    );
}

export default UpdateTransaction;
