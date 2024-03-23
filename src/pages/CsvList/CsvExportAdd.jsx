import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CsvExportForm from '../../components/Form/CsvExportForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = { csvExport_name: '', memo: '' };

const CsvExportAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="CSV >エクスポートCSV新規作成" className="mt-4 text-blue-50 font-bold" />
            <CsvExportForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default CsvExportAdd;
