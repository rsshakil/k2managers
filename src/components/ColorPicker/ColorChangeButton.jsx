const ColorChangeButton = ({
    showCalendar,
    value,
    setShowCalendar,
    labelClassName,
    placeholderClick,
    className,
    title_color,
    color_label,
    color_bg,
}) => {
    let bg = ''; 

    title_color = title_color.includes('rgba') ? title_color : `rgba(${title_color})`;

    if (color_bg != '') {
        bg = title_color;
    }

    return (
        <>
            <div className="flex items-center relative">
                <button
                    type="button"
                    className={`${className} border border-[1px solid #C8C8CB] cursor-pointer w-[2rem] text-[1rem] h-[2rem]`}
                    style={{ color: title_color, backgroundColor: bg }}
                    value={value}
                    onClick={() => {
                        setShowCalendar(!showCalendar);
                        placeholderClick && placeholderClick();
                    }}
                >
                    {color_bg == '' && <span className="text-shadow">A</span>}
                </button>
                <span className={`${labelClassName} ml-[4px]`}>{color_label}</span>
            </div>
        </>
    );
};
export default ColorChangeButton;
