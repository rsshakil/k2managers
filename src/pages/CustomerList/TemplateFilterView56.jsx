import React from 'react';
import TableControls from '../../components/Table/TableControls';
import { datePlaceholders } from '../../lib/datePlaceholder';

export default function TemplateFilterView56(props) {
    const { handleChange, handleChange2, values } = props;

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
}
