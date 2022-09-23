import React from 'react';
import { useState } from 'react';

const FilterSection = () => {
    const [searchInput, setSearchInput] = useState("");
    const [type, setType] = useState("");
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
                <label className="radio_group">
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

                <label className="radio_group">
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
