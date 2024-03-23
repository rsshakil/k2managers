import React from 'react';
import TableControls from '../../components/Table/TableControls';
import { datePlaceholders } from '../../lib/datePlaceholder';

export default function TemplateFilterViewDefault(props) {
    const { handleChange, handleChange2, values, instituteOptions, cancelReservationOptions } = props;
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
                name="insuredPersonSymbol"
                value={values.insuredPersonSymbol}
                onChange={handleChange2}
                onKeyPress={(e) => e.key === 'Enter' && handleChange(e)}
            />
            <TableControls.Search
                placeholder="保険証番号"
                className="ml-2"
                name="insuredPersonNo"
                value={values.insuredPersonNo}
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
}
