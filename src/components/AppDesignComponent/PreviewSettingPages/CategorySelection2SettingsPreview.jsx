import React from "react";
import { useRecoilState } from "recoil";
import { appDesignerState } from "../../../store/recoil/appDesignerState";


let categoryList = ["千代田区", "中央区", "港区", "渋谷区", "新宿区", "足立区", "葛飾区", "墨田区", "江戸川区", "江東区", "練馬区", "目黒区", "品川区", "大田区", "北多摩（調布市 府中市 西東京市 東久留米市 清瀬市）", "西多摩（福生市 あきる野市 羽村市 西多摩郡）"];

const CategorySelection2SettingsPreview = ({ data }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);

    const { classes, styles, info, prefixClass } = data || '';

    //wrap classes
    const wrapClasses = [
        ignoredPrefixValue(prefixClass.sm.wrapPaddingX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.wrapGridGap, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.wrapGridColos, 'sm:'),

        classes.wrapBorderRadius,
        classes.wrapBorderWidth,
        classes.wrapBorderStyle,
        classes.wrapBoxShadow,
        classes.wrapCustomClass,
    ].join(' ');

    const wrapStyle = { ...styles.wrapBorderColor, ...styles.wrapBoxShadowColor, ...styles.wrapBackgroundColor }

    const areaClasses = [
        ignoredPrefixValue(prefixClass.sm.areaTextSize, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaTextWeight, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaBorderRadius, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaBorderWidth, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaBorderStyle, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaBoxShadow, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaTextAlign, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaVerticalAlign, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaLetterSpacing, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaPaddingX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.areaPaddingY, 'sm:'),
    ].join(' ');
    const areaStyle = { ...styles.areaTextColor, ...styles.areaBorderColor, ...styles.areaBackgroundColor, ...styles.areaBoxShadowColor }


    function ignoredPrefixValue(value, ignoreStr = '') {
        if (value) {
            return value.replace(`${ignoreStr}`, '')
        }
    }

    return (
        <div className={`grid ${wrapClasses}`} style={wrapStyle}>
            {categoryList.map((item, index) => (
                <div key={index} data-id="areawrapCustomClass" className={`${classes.areawrapCustomClass}`}>
                    <div data-id="areaClasses" className={`cursor-pointer ${areaClasses}`} style={areaStyle}>
                        {item}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CategorySelection2SettingsPreview
