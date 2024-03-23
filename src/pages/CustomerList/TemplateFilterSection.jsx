import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TableControls from '../../components/Table/TableControls';
import { LocalStorageOnReload } from '../../helper/browserLocalStorage/LocalStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import { datePlaceholders } from '../../lib/datePlaceholder';
import fetchRecords from '../../lib/filterFetch';
import { listInstitute } from '../../restapi/queries';
import { DataManageContext } from '../../routes/Router';

export default function TemplateFilterSection(initializeValue, cancelReservationOptions) {
    // DECLARATION START
    const { pathname } = useLocation();
    const [instituteOptions, setInstituteOptions] = useState([]);
    const [dataManage, setDataManage] = useContext(DataManageContext);
    const { fetchLocalStorageData, getInitialState } = LocalStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname); // Pass the pathname and get the filter items and new searchParams from LocalStorage
    const { handleChange2, searchParams, handleChange, values, setValues, calendarDateGet } =
        FilterComMethods(initializeValue);
    const filterPropObj = {
        setId: 'instituteId',
        setName: 'instituteName',
        endPoint: listInstitute,
        setOptions: setInstituteOptions,
    };
    // DECLARATION END
    // useEffect START
    useEffect(() => {
        fetchRecords.filter(filterPropObj); // Fetch the Filter Records for the Filter Box
        fetchLocalStorageData(pathname, 'listCustomer', setValues, initializeValue); // Get searchParams from localStorage and set it to filter section
    }, []);
    useEffect(() => {
        setDataManage({
            ...dataManage,
            func: calendarDateGet,
            start: 'reservationDateTimeFrom',
            end: 'reservationDateTimeTo',
        }); // Date Picker Filter
    }, [searchParams]);
    // useEffect END
    const TemplateDefaultFilter = () => {
        return (
            <>
                <TableControls.CalendarSection2
                    placeholder={datePlaceholders.customerListCalendar}
                    start="reservationDateTimeFrom"
                    end="reservationDateTimeTo"
                />
                <TableControls.Selection
                    className="w-[10.75rem] ml-2"
                    defaultValue="予約・キャンセル"
                    name="reservationStatus"
                    options={cancelReservationOptions}
                    value={values.reservationStatus}
                    onChange={handleChange}
                />
                <TableControls.Selection
                    className="ml-2"
                    defaultValue="施設"
                    name="instituteId"
                    options={instituteOptions}
                    value={values.instituteId}
                    onChange={handleChange}
                />
                <TableControls.Search
                    placeholder="保険証記号"
                    className="ml-2"
                    name="insuranceSymbol"
                    value={values.insuranceSymbol}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="保険証番号"
                    className="ml-2"
                    name="insuranceNo"
                    value={values.insuranceNo}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="セイメイ"
                    className="ml-2"
                    name="nameKana"
                    value={values.nameKana}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
            </>
        );
    };
    const Template3Filter = () => {
        return (
            <>
                <TableControls.CalendarSection2
                    placeholder={datePlaceholders.templateView3Calendar}
                    start="birthdayDateTimeFrom"
                    end="birthdayDateTimeTo"
                />
                <TableControls.Search
                    placeholder="郵便番号"
                    className="ml-2"
                    name="zipCode"
                    value={values.zipCode}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="ユーザーID"
                    className="ml-2"
                    name="customerId"
                    value={values.customerId}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="保険証記号"
                    className="ml-2"
                    name="insuranceSymbol"
                    value={values.insuranceSymbol}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="保険証番号"
                    className="ml-2"
                    name="insuranceNo"
                    value={values.insuranceNo}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
                <TableControls.Search
                    placeholder="セイメイ"
                    className="ml-2"
                    name="nameKana"
                    value={values.nameKana}
                    onChange={handleChange2}
                    onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
                />
            </>
        );
    };

    return { TemplateDefaultFilter, Template3Filter, searchParams, searchParamsValues };
}
