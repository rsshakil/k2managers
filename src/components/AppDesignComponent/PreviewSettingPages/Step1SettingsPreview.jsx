import React from 'react';
import { Formik, Form } from 'formik';

import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import { StepBox } from '../StepBox';

import { fullWidthNumber } from '../../../lib/commonConstants';

const Step1SettingsPreview = ({ pageId, data }) => {
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    function removeSM(str) {
        if (typeof str != 'undefined') {
            if (str.includes('sm:')) {
                let arr = str.split(':');
                return arr[1];
            } else {
                return str;
            }
        }
    }
    let pageTitle = pageId == 'step1Settings' ? 'ステップ１' : pageId == 'step2Settings' ? 'ステップ２' : 'ステップ３';
    const arrayKeys = Object.keys(viewSettingData?.stepBoxText);

    let justifyCenter = '';
    if (arrayKeys.length == 1) {
        justifyCenter = 'flex flex-col justify-center items-center';
    }

    return (
        <div className="flex flex-col">
            <div className="pb-96">
                <label htmlFor="headerAreaShadow" className="text-blue-100 mb-4">
                    {pageTitle}
                </label>
                <div className={`p-4 ${justifyCenter}`}>
                    <div className={`flex ${viewSettingData?.position} justify-evenly`}>
                        {arrayKeys.length > 0 &&
                            arrayKeys.map((item, index) => {
                                let field = viewSettingData?.stepBoxText[item];
                                if (index == 0) {
                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                id="stepBoxOuterWrap"
                                                className={`flex items-center relative ${viewSettingData?.wrapCustomClass} flex-col w-full`}
                                            >
                                                <div className="flex w-full items-center">
                                                    <div
                                                        className={`flex-auto ${viewSettingData?.borderWidth} opacity-0 transition duration-500 ease-in-out border-[${viewSettingData?.disableBorderColor}]`}
                                                    ></div>
                                                    <StepBox
                                                        borderWidth={viewSettingData?.borderWidth}
                                                        color={viewSettingData?.activeTextColor?.color}
                                                        border={viewSettingData?.activeBorderColor?.borderColor}
                                                        bgColor={
                                                            viewSettingData?.activeBackgroundColor?.backgroundColor
                                                        }
                                                        fill={viewSettingData?.activeTextColor?.color}
                                                        stroke={viewSettingData?.activeTextColor?.color}
                                                        stepnumber={fullWidthNumber[index + 1]}
                                                    ></StepBox>
                                                    <div
                                                        className={`flex-auto ${viewSettingData?.borderWidth} ${
                                                            index === arrayKeys.length - 1 ? 'opacity-0' : ''
                                                        } transition duration-500 ease-in-out border-[${
                                                            viewSettingData?.disableBorderColor
                                                        }]`}
                                                    ></div>
                                                </div>
                                                <div
                                                    className={`w-full top-0`}
                                                    style={{
                                                        color: viewSettingData?.activeExplanationTextColor?.color,
                                                    }}
                                                >
                                                    <p
                                                        className={`whitespace-pre-wrap ${removeSM(
                                                            viewSettingData?.sm.textAlign
                                                        )}
                                                        ${removeSM(viewSettingData?.sm.verticalAlign)}
                                                        ${removeSM(viewSettingData?.sm.textSize)}
                                                        ${removeSM(viewSettingData?.sm.textWeight)}
                                                        ${removeSM(viewSettingData?.sm.letterSpacing)}
                                                        ${viewSettingData?.boxCustomClass}`}
                                                    >
                                                        {field?.sm}
                                                    </p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                } else {
                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                id="stepBoxOuterWrap"
                                                className={`flex items-center relative ${viewSettingData?.wrapCustomClass} flex-col w-full`}
                                            >
                                                <div className="flex w-full items-center">
                                                    <div
                                                        className={`flex-auto ${viewSettingData?.borderWidth} transition duration-500 ease-in-out border-[${viewSettingData?.disableBorderColor}]`}
                                                    ></div>
                                                    <StepBox
                                                        borderWidth={viewSettingData?.borderWidth}
                                                        color={viewSettingData?.disableTextColor?.color}
                                                        border={viewSettingData?.disableBorderColor?.borderColor}
                                                        bgColor={
                                                            viewSettingData?.disableBackgroundColor?.backgroundColor
                                                        }
                                                        fill={viewSettingData?.disableTextColor?.color}
                                                        stroke={viewSettingData?.disableTextColor?.color}
                                                        stepnumber={fullWidthNumber[index + 1]}
                                                    >
                                                        }
                                                    </StepBox>

                                                    <div
                                                        className={`flex-auto ${
                                                            viewSettingData?.borderWidth
                                                        } transition duration-500 ease-in-out ${
                                                            index === arrayKeys.length - 1 ? 'opacity-0' : ''
                                                        } border-[${viewSettingData?.disableBorderColor}]`}
                                                    ></div>
                                                </div>
                                                <div
                                                    className={`w-full top-0`}
                                                    style={{
                                                        color: viewSettingData?.disableExplanationTextColor?.color,
                                                    }}
                                                >
                                                    <p
                                                        className={`whitespace-pre-wrap ${removeSM(
                                                            viewSettingData?.sm.textAlign
                                                        )}
                                                        ${removeSM(viewSettingData?.sm.verticalAlign)}
                                                        ${removeSM(viewSettingData?.sm.textSize)}
                                                        ${removeSM(viewSettingData?.sm.textWeight)}
                                                        ${removeSM(viewSettingData?.sm.letterSpacing)}
                                                        ${viewSettingData?.boxCustomClass}`}
                                                    >
                                                        {field?.sm}
                                                    </p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Step1SettingsPreview;
