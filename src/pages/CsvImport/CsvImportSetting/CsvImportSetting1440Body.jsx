import React from 'react';
import Loading from '../../../components/Loading/Loader';
import Page1440Body from '../../../components/Page1440/Page1440Body';
import CsvImportOutputSetting from './CsvImportOutputSettingLayer';
import CsvImportSettingLayer from './CsvImportSettingLayer';

export default function CsvImportSetting1440Body({ heading, load, importSettingProps, outputSettingProps }) {
    return (
        <>
            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <div className="relative w-full h-full">
                        <label className="text-blue-100 flex justify-center text-xl">{heading}</label>
                        <div className="-mt-4" id="scroller"></div>
                        <div className="body-height3 pt-12 px-10">
                            <CsvImportOutputSetting outputSettingProps={outputSettingProps} />
                            <CsvImportSettingLayer importSettingProps={importSettingProps} />
                        </div>
                    </div>
                </Page1440Body>
            )}
        </>
    );
}
