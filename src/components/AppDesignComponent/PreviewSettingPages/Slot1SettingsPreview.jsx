import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";
import _ from 'lodash';

import SlotPreview from "./SlotPreview";
import DeliveryPreview from "./DeliveryPreview";
import BusPreview from "./BusPreview";
import { slotData, deliveryData, busData } from "../../../lib/slotConstant";



const Slot1SettingsPreview = ({ pageText, pageId, data }) => {
    const { classes, styles, info, prefixClass } = data || '';

    //slot wrap classes
    const slotWrapClass = [
        ignoredPrefixValue(prefixClass.sm.slotWrapBorderRadius, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotWrapBorderWidth, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotWrapBorderStyle, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotWrapMarginX, 'sm:'),

        classes.slotWrapBorderColor,
        classes.slotWrapBackgroundColor,
    ].join(' ')

    const slotWrapStyle = { ...styles.slotWrapBorderColor, ...styles.slotWrapBackgroundColor }


    function ignoredPrefixValue(value, ignoreStr = '') {
        return value.replace(`${ignoreStr}`, '')
    }


    return (
        <div className={`w-full overflow-x-auto`}>
            <div data-id="slotWrapClass_normalWrapCustomClass" className={`w-full min-w-[48rem] max-w-screen-lg ${slotWrapClass} ${classes.normalWrapCustomClass}`} style={slotWrapStyle}>
                <SlotPreview settingData={data} eventSlotData={slotData} />
            </div>

            <div data-id="slotWrapClass_deliveryWrapCustomClass" className={`w-full mt-10 min-w-[48rem] max-w-screen-lg ${slotWrapClass} ${classes.deliveryWrapCustomClass}`} style={slotWrapStyle}>
                <DeliveryPreview settingData={data} eventSlotData={deliveryData} />
            </div>

            <div data-id="slotWrapClass_busWrapCustomClass" className={`w-full mt-10 mb-4 min-w-[48rem] max-w-screen-lg ${slotWrapClass} ${classes.busWrapCustomClass}`} style={slotWrapStyle}>
                <BusPreview settingData={data} eventSlotData={busData} />
            </div>
        </div>
    );
};
export default Slot1SettingsPreview
