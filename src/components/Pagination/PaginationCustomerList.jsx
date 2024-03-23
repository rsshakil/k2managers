import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { baseURL, listMethod } from '../../restapi/queries';
import { instance } from '../../services/axios.js';

import './Pagination.css';

const PaginationCustomerList = (props) => {
    const {
        itemsPerPage,
        endPoint,
        setLoading,
        setRecords,
        subQueryString = '',
        setNumberOfRecords,
        setHeaderFieldList = [],
        newSearchParams, customerValues,
        pageNumber, setPageNumber
    } = props;
    const [pageCount, setPageCount] = useState(1);
    const [showPagination, setShowPagination] = useState(false);
    const pagesVisited = pageNumber * itemsPerPage;
    const location = useLocation();
    const processing = useRef(false);

    useEffect(() => {
        if(customerValues.pid){
            setRecords([]);
            setLoading(true);
            fetchRecords();
        }
        
        // console.log("🚨🚨 Sub Queries Changes : ", subQueryString)
        // console.log("🚨🚨 Sub newSearchParams Changes : ", newSearchParams)
        // console.log("🚨🚨 Sub customerValues Changes : ", customerValues)
    }, [pageNumber, subQueryString, location, newSearchParams]);

    // Make RESTapi URL
    let queryString = ''
    if (customerValues.pid && subQueryString) {
        queryString = `?itemsPerPage=${itemsPerPage}&pagesVisited=${pagesVisited}${subQueryString && '&' + subQueryString
            }`; // Set Query String

        // console.log("🚨✅There is PID and subQueries", subQueryString)
    } else {
        queryString = `?itemsPerPage=${itemsPerPage}&pid=${sessionStorage.getItem('currentProjectId')}&pagesVisited=${pagesVisited}${subQueryString && '&' + subQueryString
            }`; // Set Query String
        // console.log("🚨❌There is No PID and subQueries", subQueryString)
    }
    const api = `${baseURL}${endPoint}${queryString}`;
    console.log('pageCount',pageCount);
    // fetch records with RESTapi
    const fetchRecords = () => {
        console.log("🚨 API :", api)
        console.log("🚨 customerValues.pid :", customerValues.pid)
        if (processing.current) return;
        processing.current = true;
        new Promise(async (resolve, reject) => {
            try {
                setLoading(true)
                if (endPoint != 'debug' /** && hasPageAccess */) {
                    let config = {
                        method: listMethod,
                        url: api,
                    };
                    const response = await instance.request(config);
                    const result = await response.data;
                    if (result.error) throw new Error(result.error);
                    if (result.records !== undefined) {
                        resolve(result);
                        setRecords(result.records);
                        console.log("🔄️ Record :", result.records)
                        setNumberOfRecords(result.count !== undefined ? result.count : 0);
                        result.count > 0 ? setPageCount(Math.ceil(result.count / itemsPerPage)) : setPageCount(1);
                        setShowPagination(true);
                        if (result.templatefieldList) {
                            setHeaderFieldList &&
                                setHeaderFieldList(
                                    result.templatefieldList !== undefined ? result.templatefieldList : []
                                );
                        }
                        // setLoading(false)
                        // console.log('LoadingStopHere');
                    }
                } else {
                    setLoading(false);
                        console.log('stopssss');
                }
            } catch (error) {
                setLoading(false);
                reject(error.message);
            } finally {
                setLoading(false);
                console.log('LoadingStopHere1111');
                processing.current = false;
            }
        });
    };

    const handlePageClick = (event) => {
        setPageNumber(event.selected);
        sessionStorage.setItem(`pagination_pageNo`, event.selected);
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
            <div className={`text-xs textColor pt-4 pb-4 position-center ${showPagination ? '' : 'invisible'}`}>
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
                    forcePage={pageNumber}
                />
            </div>
        );
    }
};

export default PaginationCustomerList;
export const MemorizePagination = React.memo(PaginationCustomerList);
