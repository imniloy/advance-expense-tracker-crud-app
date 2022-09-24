import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../features/filter/filterSlice';

const Pagination = () => {
    const { pagination: { limit, currentPage, totalTransition } } = useSelector((state) => state?.filter);
    const dispatch = useDispatch();
    const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
    const totalPages = Math.ceil(totalTransition / limit);

    const handlePagination = (e) => {
        setCurrentPageNumber(e.target.value);
    }

    const pages = [...Array(totalPages)]?.map((_, index) =>
        <li key={index + 1} value={index + 1}
            onClick={handlePagination}
            className={currentPage === index + 1 ?
                `pagination pagination-hover` :
                `pagination`}>{index + 1}</li>);

    useEffect(() => {
        dispatch(setCurrentPage(currentPageNumber));
    }, [currentPageNumber, dispatch]);

    return (
        <div>
            <ul className='pagination-container'>
                {pages}
            </ul>
        </div>
    );
}

export default Pagination;
