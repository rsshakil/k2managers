import React from "react";
import { useRecoilState } from "recoil";
import categoryImage from "../../../img/category.png";
import { appDesignerState } from "../../../store/recoil/appDesignerState";

const CategorySelection1SettingsPreview = ({ pageText, pageId, data }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };

    const {
        headerMenuQuantity,
        headerMenu1Text,
        headerMenu2Text,
        examinationItemTitle,
        scheduleTitle,
    } = info;

    //wrap classes
    const wrapClass = [
        classes.cardBorderRadius,
        classes.cardBorderWidth,
        classes.cardBorderStyle, 
        classes.cardOuterWrapCustomClass,
    ].join(' ');
    const wrapStyle = { ...styles.cardOuterBorderColor };

    const cardDivideXClass = [
        classes.cardDivideWidthX,
        classes.cardDivideStyle,
    ].join(' ');
    const cardDivideYClass = [
        classes.cardDivideWidthY,
        classes.cardDivideStyle,
    ].join(' ');
    const cardDivideColorStyle = { ...styles.cardDivideColor };

    //category name classes
    const categoryNameClass = [
        classes.categoryNameTextSize,
        classes.categoryNameFontWeight,
        classes.categoryNameCustomClass,
    ].join(' ');
    const categoryNameStyle = { ...styles.categoryNameTextColor };

    //Img classes
    const imgAreaClass = [
        classes.imgAreaImgRadius,
        classes.imgAreaImgMaxHeight,
        classes.imgAreaImgCustomClass,
    ].join(' ');

    //Category description 1 classes
    const categoryDesription1Class = [
        classes.categoryDescription1TextSize,
        classes.categoryDescription1FontWeight,
        classes.categoryDescription1PCustomClass,
    ].join(' ');
    const categoryDesription1Style = { ...styles.categoryDescription1BackgroundColor, ...styles.categoryDescription1TextColor };

    //Category description 2 classes
    const categoryDesription2Class = [
        classes.categoryDescription2TextSize,
        classes.categoryDescription2FontWeight,
        classes.categoryDescription2PCustomClass,
    ].join(' ');
    const categoryDesription2Style = { ...styles.categoryDescription2BackgroundColor, ...styles.categoryDescription2TextColor }


    //examinationItemTitle  classes
    const examinationItemTitleClass = [
        classes.examinationItemTitleTextSize,
        classes.examinationItemTitleFontWeight,
        classes.examinationItemTitleCustomClass,
    ].join(' ');
    const examinationItemTitleStyle = { ...styles.examinationItemTitleTextColor };

    //examinationItem  classes
    const examinationItemClass = [
        classes.examinationItemTextSize,
        classes.examinationItemFontWeight,
        classes.examinationItemCustomClass,
    ].join(' ');
    const examinationItemStyle = { ...styles.examinationItemTextColor };

    //scheduleTitle  classes
    const scheduleTitleClass = [
        classes.scheduleTitleTextSize,
        classes.scheduleTitleFontWeight,
        classes.scheduleTitleCustomClass,
    ].join(' ');
    const scheduleTitleStyle = { ...styles.scheduleTitleTextColor };

    //schedule  classes
    const scheduleClass = [
        classes.scheduleTextSize,
        classes.scheduleFontWeight,
        classes.scheduleCustomClass,
    ].join(' ');
    const scheduleStyle = { ...styles.scheduleTextColor };



    return (
        <>
            <div className={`w-full flex`}>
                <div data-id="wrapClass_cardDivideYClass"
                    className={`w-full grid grid-cols-1 ${cardDivideYClass}  ${wrapClass}`}
                    style={{ ...wrapStyle }} >

                    <div data-id="headerWrapCustomClass_headerAreaBackgroundColor"
                        className={`flex justify-between ${classes.headerWrapCustomClass}`}
                        style={{ ...styles.headerAreaBackgroundColor }}>

                        <div className="flex items-center">
                            <p data-id="categoryNameClass" className={categoryNameClass} style={categoryNameStyle}>はつらつ検診</p>
                        </div>

                        <div data-id="headerMenuButtonWrapCustomClass" className={`flex flex-row-reverse ${classes.headerMenuButtonWrapCustomClass}`}>
                            <button className="border border-sky-500 text-sky-500 py-2 px-4 cursor-pointer">{headerMenu2Text}</button>

                            {headerMenuQuantity == 2 && <button className="border border-sky-500 text-sky-500 py-2 px-4 cursor-pointer">{headerMenu1Text}</button>}
                        </div>
                    </div>

                    <div className={`grid grid-cols-3  ${cardDivideXClass}`} style={cardDivideColorStyle} >

                        <div data-id="imgAreaOuterWrapCustomClass" className={`h-full align-middle ${classes.imgAreaOuterWrapCustomClass}`}>
                            <img data-id="imgAreaClass" className={imgAreaClass} src={categoryImage} alt="" />
                        </div>

                        <div data-id="categoryDescriptionAllWrapCustomClass"
                            className={`grid h-full ${cardDivideYClass} ${classes.categoryDescriptionAllWrapCustomClass}`}
                            style={cardDivideColorStyle}
                        >

                            <div data-id="categoryDescription1PWrapCustomClass"
                                className={`${classes.categoryDescription1PWrapCustomClass}`}>

                                <p data-id="categoryDesription1Class"
                                    className={`whitespace-normal ${categoryDesription1Class}`}
                                    style={categoryDesription1Style}>
                                    はつらつ検診は、保健センター内で実施する検診です。
                                    がん検診（胃、肺、大腸など）のほか、特定健診も受診することができます。
                                    また、前立腺がん検診やピロリ菌検査などのオプションを追加することもできます。す。
                                </p>
                            </div>

                            <div data-id="categoryDescription2PWrapCustomClass"
                                className={`${classes.categoryDescription2PWrapCustomClass}`}
                                style={cardDivideColorStyle}>
                                <p data-id="categoryDesription2Class"
                                    className={`whitespace-normal ${categoryDesription2Class}`}
                                    style={categoryDesription2Style}>
                                    今年40歳になる方は誕生日以降の日程を予約してください
                                    。受診日時点で39歳だと受診できません。特定健診の受診には必ず
                                    「特定健康診査受診券」が必要です。
                                </p>
                            </div>
                        </div>

                        <div className={`grid h-full`} style={cardDivideColorStyle} >
                            <div data-id="examinationItemWrapCustomClass"
                                className={`${classes.examinationItemWrapCustomClass}`}
                                style={styles.examinationItemBackgroundColor}>

                                <p data-id="examinationItemTitleClass"
                                    className={examinationItemTitleClass}
                                    style={examinationItemTitleStyle}>
                                    {examinationItemTitle}
                                </p>

                                <p data-id="examinationItemClass"
                                    className={`whitespace-normal ${examinationItemClass}`}
                                    style={examinationItemStyle}>
                                    検診内容胃がん検診（バリウム）
                                    ピロリ菌検査肺がん検診大腸がん検診前立腺がん
                                    検診特定健診特定健診(国保以外)後期高齢者健診
                                </p>
                            </div>
                        </div>
                    </div>

                    <div data-id="scheduleWrapCustomClass"
                        className={`${classes.scheduleWrapCustomClass}`}
                        style={{ ...styles.scheduleBackgroundColor, ...cardDivideColorStyle }}>

                        <p data-id="scheduleTitleClass" className={scheduleTitleClass} style={scheduleTitleStyle}>{scheduleTitle}</p>
                        <p data-id="scheduleClass" className={scheduleClass} style={scheduleStyle}>
                            3/2(木), 3/3(金)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategorySelection1SettingsPreview
