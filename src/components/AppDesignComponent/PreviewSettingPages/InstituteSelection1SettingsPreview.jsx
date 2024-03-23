import React from 'react';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

const InstituteSelection1SettingsPreview = ({ pageText, pageId, data }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    let gridText = [
        '千代田区',
        '中央区',
        '港区',
        '渋谷区',
        '新宿区',
        '足立区',
        '葛飾区',
        '墨田区',
        '江戸川区',
        '江東区',
        '練馬区',
        '目黒区',
        '品川区',
        '大田区',
        '北多摩（調布市 府中市 西東京市 東久留米市 清瀬市）',
        '西多摩（福生市 あきる野市 羽村市 西多摩郡）',
    ];
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
    let schedule_list = [
        {
            instituteName: 'プラザノース多目的ルーム',
            address: 'さいたま市北区宮原1丁目852番地1',
        },
        {
            instituteName: 'JA共済埼玉ビルディング　会議室12・13',
            address: 'さいたま市大宮区土手町1丁目２番地JA共済埼玉ビル内',
        },
        {
            instituteName: 'プラザウエスト多目的ルーム',
            address: 'さいたま市桜区道場4丁目3番1号',
        },
    ];
    return (
        <div className={`w-full`}>
            {/* ___________________________temporary comment out__________________________*/}

            <p className="h-8 bg-blue-50 text-2xl text-center">バグ修正中</p>

            {/*<div className={`overflow-visible break-all ${viewSettingData?.instituteWrapCustomClass}`}>
            <div className={`bg-kenpo-blue overflow-hidden mb-4
            
            ${removeSM(viewSettingData?.sm?.instituteBorderRadius)}
            ${removeSM(viewSettingData?.sm?.instituteBorderWidth)}
            ${removeSM(viewSettingData?.sm?.instituteBorderStyle)}
            ${removeSM(viewSettingData?.sm?.instituteMarginX)}
            ${removeSM(viewSettingData?.sm?.instituteBoxShadow)}
            `}
            style={{borderColor:viewSettingData?.instituteBorderColor?.borderColor,
            shadowColor:viewSettingData?.instituteBoxShadowColor?.BoxShadowColor
            }}
            >
                <div className={`px-6 py-4 
                 ${viewSettingData?.headerWrapCustomClass}
                `}
                style={{backgroundColor:viewSettingData?.headerBackgroundColor?.backgroundColor}}
                >
                    <h3 className={` ${viewSettingData?.headerTitleTextSize} 
                    ${viewSettingData?.headerTitleFontWeight}
                    ${viewSettingData?.headerTitleCustomClass}
                    `}
                    style={{color:viewSettingData?.headerTitleTextColor?.color}}
                    >会場情報</h3>
                    <p className={`mt-1
                    ${viewSettingData?.headerExplanationTextSize} 
                    ${viewSettingData?.headerExplanationFontWeight}
                    ${viewSettingData?.headerExplanationCustomClass}
                    `}
                    style={{color:viewSettingData?.headerExplanationTextColor?.color}}
                    >ご希望の会場を選択してください</p>
                </div>
                <div className="divide-y">
                    {schedule_list.map((facility, index) => (
                        <div role="listitem" className={`bg-white p-2 flex relative z-30 
                        ${viewSettingData?.instituteDivideWidthX}
                        ${viewSettingData?.instituteDivideStyle}
                        w-full`}>
                                <div className={`grow bg-white
                                    ${removeSM(viewSettingData?.sm?.instituteInfoPaddingX)}
                                    ${removeSM(viewSettingData?.sm?.instituteInfoPaddingY)}
                                `}>
                                    <span className={`
                                        ${viewSettingData?.dentalCheckBorderRadius}
                                        ${viewSettingData?.dentalCheckTextSize}
                                        ${viewSettingData?.dentalCheckFontWeight}
                                        ${viewSettingData?.dentalCheckCustomClass}
                                    `}
                                    style={{color:viewSettingData?.dentalCheckTextColor?.color,
                                    backgroundColor:viewSettingData?.dentalCheckBackgroundColor?.backgroundColor
                                    }}
                                    >{viewSettingData?.dentalCheckText}</span>
                                    <div className="md:flex items-baseline justify-between">
                                        <h2 className={` whitespace-normal 
                                            ${removeSM(viewSettingData?.sm?.instituteNameTextSize)}
                                            ${removeSM(viewSettingData?.sm?.instituteNameTextWeight)}
                                            ${viewSettingData?.sm?.instituteNameCustomClass}
                                        `}
                                        style={{color:viewSettingData?.instituteNameTextColor?.color}}
                                        >{facility?.instituteName}</h2>
                                    </div>
                                    <p className={`whitespace-normal 
                                         ${removeSM(viewSettingData?.sm?.instituteAddressTextSize)}
                                         ${removeSM(viewSettingData?.sm?.instituteAddressTextWeight)}
                                         ${viewSettingData?.sm?.instituteAddressCustomClass}
                                    `}
                                    style={{color:viewSettingData?.instituteAddressTextColor?.color}}
                                    >{facility?.address}</p>
                                    
                                </div>
                                <div className="flex items-center flex-col w-[80px] p-0 divide-y" style={{backgroundColor:viewSettingData?.selectionAreaBackgroundColor?.backgroundColor}}>
                                    <div className={`h-full w-full whitespace-normal flex items-center justify-center align-middle p-0 m-0 cursor-pointer 
                                       ${removeSM(viewSettingData?.sm?.selectionTextSize)} 
                                       ${removeSM(viewSettingData?.sm?.selectionTextWeight)}
                                       ${viewSettingData?.selectionCustomClass}
                                    `}
                                    style={{color:viewSettingData?.selectionTextColor?.color}}
                                    >
                                        {viewSettingData?.destinationText??'選択する'}
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>*/}
        </div>
    );
};
export default InstituteSelection1SettingsPreview;
