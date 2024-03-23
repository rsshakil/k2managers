import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import { baseURL, listMethod } from '../../restapi/queries';
import { instance } from '../../services/axios.js';

import './Pagination.css';

const PaginationSearchParams = (props) => {
    const {
        itemsPerPage,
        endPoint,
        setLoading,
        setRecords,
        subQueryString = '',
        setNumberOfRecords,
        setHeaderFieldList = [],
        pageNumber, setPageNumber
    } = props;
    const location = useLocation();
    const processing = useRef(false);
    const [pageCount, setPageCount] = useState(0);
    const [showPagination, setShowPagination] = useState(false);
    const pagesVisited = pageNumber * itemsPerPage;

    useEffect(() => {
        // Make RESTapi URL
        const queryString = `?itemsPerPage=${itemsPerPage}&pagesVisited=${pagesVisited}&pid=${sessionStorage.getItem(
            'currentProjectId'
        )}${subQueryString && '&' + subQueryString}`;

        const api = `${baseURL}${endPoint}${queryString}`;
        let config = { method: listMethod, url: api };
        if (!processing.current)
            (async () => {
                processing.current = true;
                setRecords([]);
                setLoading(true);
                try {
                    const response = await instance.request(config);
                    const result = await response.data;
                    if (result.error) throw new Error(result.error);
                    if (result.records !== undefined) {
                        setRecords(result.records);
                        setNumberOfRecords(result.count || 0);
                        result.count > 0 ? setPageCount(Math.ceil(result.count / itemsPerPage)) : setPageCount(0);
                        setShowPagination(true);
                        if (result.templatefieldList) {
                            setHeaderFieldList &&
                                setHeaderFieldList(
                                    result.templatefieldList !== undefined ? result.templatefieldList : []
                                );
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    processing.current = false;
                }
            })();
    }, [pageNumber, subQueryString, location]);

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
            <div className="text-xs textColor pt-4 pb-4 position-center">
                {showPagination && (
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
                )}
            </div>
        );
    }
};

export default PaginationSearchParams;
export const MemorizePagination = React.memo(PaginationSearchParams);
