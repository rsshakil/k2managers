import React from 'react';
import { Formik, Form } from 'formik';

import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import { StepBox } from '../StepBox';

import { fullWidthNumber } from '../../../lib/commonConstants';

const Step3SettingsPreview = ({ children, className = '', id, flexType = 'col', previewBorderClass = '' }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    let viewSettingData = recoilStateValue.tabItems.settings.appSettingQuery.step3Settings;
    return (
        <div className="flex flex-col">
            <div className="pb-5">
                <label htmlFor="headerAreaShadow" className="text-blue-100 mb-4">
                    ステップ３
                </label>
                <div className="mx-4 p-4">
                    <div className="flex items-center">
                        {viewSettingData?.stepBoxText.length > 0 &&
                            viewSettingData?.stepBoxText.map((field, index) => {
                                if (index == 0) {
                                    return (
                                        <>
                                            <StepBox
                                                wrapperClass={viewSettingData?.wrapCustomClass}
                                                color={`[${viewSettingData?.activeTextColor}]`}
                                                cProperty={`${viewSettingData?.textAlign} sm:${viewSettingData?.textAlignSm} md:${viewSettingData?.textAlignMd} lg:${viewSettingData?.textAlignLg} xl:${viewSettingData?.textAlignXl} 2xl:${viewSettingData?.textAlign2xl}
        ${viewSettingData?.verticalAlign} sm:${viewSettingData?.verticalAlignSm} md:${viewSettingData?.verticalAlignMd} lg:${viewSettingData?.verticalAlignLg} xl:${viewSettingData?.verticalAlignXl} 2xl:${viewSettingData?.verticalAlign2xl} 
                                                        ${viewSettingData?.textSize} sm:${viewSettingData?.textSizeSm} md:${viewSettingData?.textSizeMd} lg:${viewSettingData?.textSizeLg} xl:${viewSettingData?.textSizeXl} 2xl:${viewSettingData?.textSize2Xl}
            ${viewSettingData?.textWeight} sm:${viewSettingData?.textWeightSm} md:${viewSettingData?.textWeightMd} lg:${viewSettingData?.textWeightLg} xl:${viewSettingData?.textWeightXl} 2xl:${viewSettingData?.textWeight2Xl}
            ${viewSettingData?.letterSpacing} sm:${viewSettingData?.letterSpacingSm} md:${viewSettingData?.letterSpacingMd} lg:${viewSettingData?.letterSpacingLg} xl:${viewSettingData?.letterSpacingXl} 2xl:${viewSettingData?.letterSpacing2Xl}
${viewSettingData?.boxCustomClass}`}
                                                text="teal-600"
                                                border={`[${viewSettingData?.activeBorderColor}]`}
                                                bgColor={`[${viewSettingData?.activeBackgroundColor}]`}
                                                fill={viewSettingData?.activeTextColor}
                                                stroke={viewSettingData?.activeTextColor}
                                                stepnumber={fullWidthNumber[index + 1]}
                                            >
                                                {field.text}
                                            </StepBox>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <div
                                                className={`flex-auto ${viewSettingData?.borderWidth} transition duration-500 ease-in-out border-[${viewSettingData?.disableBorderColor}]`}
                                            ></div>
                                            <StepBox
                                                wrapperClass={viewSettingData?.wrapCustomClass}
                                                color={`[${viewSettingData?.disableTextColor}]`}
                                                cProperty={`
                                                        ${viewSettingData?.textAlign} sm:${viewSettingData?.textAlignSm} md:${viewSettingData?.textAlignMd} lg:${viewSettingData?.textAlignLg} xl:${viewSettingData?.textAlignXl} 2xl:${viewSettingData?.textAlign2xl}
        ${viewSettingData?.verticalAlign} sm:${viewSettingData?.verticalAlignSm} md:${viewSettingData?.verticalAlignMd} lg:${viewSettingData?.verticalAlignLg} xl:${viewSettingData?.verticalAlignXl} 2xl:${viewSettingData?.verticalAlign2xl} 
                                                        ${viewSettingData?.textSize} sm:${viewSettingData?.textSizeSm} md:${viewSettingData?.textSizeMd} lg:${viewSettingData?.textSizeLg} xl:${viewSettingData?.textSizeXl} 2xl:${viewSettingData?.textSize2Xl}
            ${viewSettingData?.textWeight} sm:${viewSettingData?.textWeightSm} md:${viewSettingData?.textWeightMd} lg:${viewSettingData?.textWeightLg} xl:${viewSettingData?.textWeightXl} 2xl:${viewSettingData?.textWeight2Xl}
            ${viewSettingData?.letterSpacing} sm:${viewSettingData?.letterSpacingSm} md:${viewSettingData?.letterSpacingMd} lg:${viewSettingData?.letterSpacingLg} xl:${viewSettingData?.letterSpacingXl} 2xl:${viewSettingData?.letterSpacing2Xl}
${viewSettingData?.boxCustomClass}
                                                        `}
                                                text={`teal-600`}
                                                border={`[${viewSettingData?.disableBorderColor}]`}
                                                bgColor={`[${viewSettingData?.disableBackgroundColor}]`}
                                                fill={viewSettingData?.disableTextColor}
                                                stroke={viewSettingData?.disableTextColor}
                                                stepnumber={fullWidthNumber[index + 1]}
                                            >
                                                {field.text}
                                            </StepBox>
                                        </>
                                    );
                                }
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Step3SettingsPreview;
