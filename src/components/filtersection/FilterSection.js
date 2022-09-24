import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByTransitionsType, filterByQuery } from '../../features/filter/filterSlice';

const FilterSection = () => {
    const { searchTransition, transitionType } = useSelector(state => state?.filter)
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState(searchTransition);
    const [type, setType] = useState(transitionType);

    const filterTransitionByType = (value) => {
        dispatch(filterByTransitionsType(value));
    };

    useEffect(() => {
        dispatch(filterByQuery(searchInput));
    }, [dispatch, searchInput])

    return (
        <div className='filter-container'>
            <input
                type="text"
                name="searchInput"
                required
                placeholder="Search transactions"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className="radio-filter">
                <label className="radio_group" onClick={() => filterTransitionByType('income')}>
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

                <label className="radio_group" onClick={() => filterTransitionByType('expense')}>
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
    );
}

export default FilterSection;
