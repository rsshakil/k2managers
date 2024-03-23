import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/Loading/Loader';
import PrepareCsvTableBody from './PrepareCsvTableBody';
import PrepareCsvTableHeader from './PrepareCsvTableHeader';

export default function CsvImportPreviewTable({ importPreviewTableProps,information }) {
// console.log("importPreviewTableProps", importPreviewTableProps);
    // LOCAL INITIALIZE START
    const refs = useRef([]);
    const ref1 = useRef(null);
    const parentTableRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [headerFieldLists, setHeaderFieldLists] = useState([]);
    const [tableMinWidth, seTableMinWidth] = useState('1372px');
    const headerRecords = importPreviewTableProps?.csvImportPreviewHeaderData;
    const csvImportPreviewRecords = importPreviewTableProps?.csvImportPreview;
    const [viewFlag, setViewFlag] = useState(false);
    refs.current = [];
    // LOCAL INITIALIZE END

    // useEFFECT START
    // useEffect(() => {
    //     prepareTableHeader();
    // }, [information]);

    useEffect(() => {
        if (headerFieldLists.length >= 1) {
            console.log('headerFieldLists',headerFieldLists)
            console.log('csvImportPreviewRecords',csvImportPreviewRecords)
            setLoading(false)
            setViewFlag(true)
        }
        else {
            console.log('headerFieldLists length 0')
            prepareTableHeader()
        }
    }, [headerFieldLists, csvImportPreviewRecords]);

    // useEFFECT END
    // FUNCTION START
    function prepareTableHeader() {
        const width =
            headerRecords && headerRecords.length > 0 && headerRecords.map((item) => item.column_width.split(['-'])[1]);
        if (width) {
            const summationOfTotalWidth = width.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
            if (parseInt(summationOfTotalWidth) * 4 > 1372) {
                let totalWidth = summationOfTotalWidth * 4;
                seTableMinWidth(totalWidth + 'px');
            } else {
                seTableMinWidth('1372px');
            }
        }
        setHeaderFieldLists(headerRecords);
    }
    // FUNCTION END

    return (
        <>
            {loading && viewFlag && <Loading /> }
            <div
                className={`min-w-[${tableMinWidth}] overflow-x-auto`}
                style={{ minWidth: tableMinWidth }}
                ref={parentTableRef}
            >
                <div className="h-[calc(100vh-246px)] tbody-vertical-scroll">
                    {headerRecords && headerRecords.length > 0 && loading && <Loading />}

                    {/* HEADER PART START */}
                    <div className="flex bg-blue-50 sticky top-0 z-10">
                        {headerFieldLists.length > 0 &&
                            headerFieldLists.map((headerCell, index) => (
                                <PrepareCsvTableHeader
                                    key={index}
                                    headerCell={headerCell}
                                    parentTableRef={parentTableRef}
                                    ref1={ref1}
                                />
                            ))}
                        <div className="grow"></div>
                    </div>
                    {/* HEADER PART END */}
                    {/* TABLE BODY PART START*/}
                    <PrepareCsvTableBody
                        csvImportPreviewRecords={csvImportPreviewRecords}
                        headerFieldLists={headerFieldLists}
                        parentTableRef={parentTableRef}
                    />
                    {/* TABLE BODY PART END*/}
                </div>
            </div>
        </>
    );
}
