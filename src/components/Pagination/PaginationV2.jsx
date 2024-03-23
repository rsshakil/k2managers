import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { baseURL, listMethod } from '../../restapi/queries';
import { instance } from '../../services/axios.js';

import './Pagination.css';

const PaginationV2 = (props) => {
    const {
        itemsPerPage,
        endPoint,
        setLoading,
        setRecords,
        subQueryString = '',
        setNumberOfRecords,
        setHeaderFieldList = [],
    } = props;
    const [pageCount, setPageCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;
    const location = useLocation();

    // Make RESTapi URL
    const queryString = `?itemsPerPage=${itemsPerPage}&pagesVisited=${pagesVisited}${
        subQueryString && '&' + subQueryString
        // const queryString = `?itemsPerPage=${itemsPerPage}&pagesVisited=${pagesVisited}&pid=${JSON.parse(sessionStorage.getItem("currentProjectId"))}${subQueryString && "&" + subQueryString
    }`; // Set Query String

    const api = `${baseURL}${endPoint}${queryString}`;

    useEffect(() => {
        setLoading(true);
        fetchRecords();
    }, [pageNumber, subQueryString, location]);

    // fetch records with RESTapi
    let count = 0;
    const fetchRecords = () => {
        setLoading(true);
        new Promise(async (resolve, reject) => {
            try {
                if (endPoint !== 'debug') {
                    let config = { method: listMethod, url: api };
                    const response = await instance.request(config);
                    const result = await response.data;
                    if (result.error) throw new Error(result.error);
                    if (result.records !== undefined) {
                        resolve(result);

                        setRecords(result.records);
                        setNumberOfRecords && setNumberOfRecords(result.count !== undefined ? result.count : 0);
                        result.count > 0 ? setPageCount(Math.ceil(result.count / itemsPerPage)) : setPageCount(0);
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000);
                    }
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                reject(error.message);
            }
        });
    };

    const handlePageClick = (event) => {
        setPageNumber(event.selected);
    };

    // Temporary hide Pagination for Account, Role, Event, App START
    const routes = [{ pathname: '/account_list' }, { pathname: '/role_list' }, { pathname: '/app_list' }];

    // Temporary if condition for hide Pagination
    if (!routes.some((obj) => obj.pathname === location.pathname)) {
        const Next = () => {
            return (
                <div className="flex justify-center items-center border pageBorder h-6  w-16 bg-white hover:bg-blue-50">
                    <span className="text-xs"> 次 </span>

                    <div className="text-xs ml-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12">
                            <g id="Polygon_8" data-name="Polygon 8" transform="translate(11) rotate(90)" fill="#145c8f">
                                <path
                                    d="M 11.15772438049316 10.5 L 0.8422754406929016 10.5 L 6 1.044171690940857 L 11.15772438049316 10.5 Z"
                                    stroke="none"
                                />
                                <path
                                    d="M 6 2.088333129882812 L 1.684545516967773 10 L 10.31545448303223 10 L 6 2.088333129882812 M 6 0 L 12 11 L 0 11 L 6 0 Z"
                                    stroke="none"
                                    fill="#145c8f"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            );
        };
        const Prev = () => {
            return (
                <div className="flex justify-center items-center border pageBorder h-6 w-16 bg-white hover:bg-blue-50">
                    <div className="text-xs mr-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12">
                            <g
                                id="Polygon_8"
                                data-name="Polygon 8"
                                transform="translate(0 12) rotate(-90)"
                                fill="#145c8f"
                            >
                                <path
                                    d="M 11.15772438049316 10.5 L 0.8422754406929016 10.5 L 6 1.044171690940857 L 11.15772438049316 10.5 Z"
                                    stroke="none"
                                />
                                <path
                                    d="M 6 2.088333129882812 L 1.684545516967773 10 L 10.31545448303223 10 L 6 2.088333129882812 M 6 0 L 12 11 L 0 11 L 6 0 Z"
                                    stroke="none"
                                    fill="#145c8f"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-xs">前</div>
                </div>
            );
        };
        return (
            <div className="text-xs textColor pt-4 pb-4 position-center">
                <ReactPaginate
                    previousLabel={<Prev />}
                    nextLabel={<Next />}
                    breakLabel="..."
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'flex justify-center items-center space-x-2'}
                    pageLinkClassName={
                        'pageBorder h-6 block w-16 flex items-center justify-center bg-white hover:bg-blue-50'
                    }
                    activeLinkClassName={`bgActive activeBorder text-white`}
                    disabledLinkClassName={`invisible`}
                    breakClassName={'mt-2'}
                    breakLinkClassName={'marginBreak text-black'}
                />
            </div>
        );
    }
};

export default PaginationV2;
export const MemorizePagination = React.memo(PaginationV2);
