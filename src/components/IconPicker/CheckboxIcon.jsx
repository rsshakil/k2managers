export default function CheckboxIcon({
    icon = '',
    iconTitle = '',
    width = '',
    height = '',
    iconSize = '',
    iconCustomClass = '',
    iconWrapperCustomClasses = '',
    titleCustomClasses = '',
    handleOnClick = () => {},
}) {
    let customStyle = {};
    if (iconSize) customStyle.fontSize = iconSize;
    if (width) customStyle.width = width;
    if (height) {
        customStyle.height = height;
        customStyle.minHeight = 'unset';
    }

    return (
        <div
            className={`icon-picker-item cursor-pointer ${iconWrapperCustomClasses}`}
            tabIndex="0"
            onClick={() => handleOnClick((prevState) => !prevState)}
        >
            <div
                className={`icon-picker-icon ${iconCustomClass}`}
                style={customStyle}
                dangerouslySetInnerHTML={{ __html: icon }}
            ></div>
            <div className={`name ${titleCustomClasses}`}>{iconTitle}</div>
        </div>
    );
}
