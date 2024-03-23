import { useEffect } from "react";
import { useRef } from "react";


export default function RadioboxIconSettingPreview({ data }) {
    const notSelectedIcon1Ref = useRef();
    const notSelectedIcon2Ref = useRef();
    const selectedIcon1Ref = useRef();
    const selectedIcon2Ref = useRef();

    const { classes, info, styles } = data;
    const { notSelectedIcon1, notSelectedIcon2, selectedIcon1, selectedIcon2 } = info || '';

    const notSelectedIcon1Classes = `${classes.notSelectedIcon1Size} ${classes.notSelectedIcon1StrokeSize}`;
    const notSelectedIcon2Classes = `${classes.notSelectedIcon2Size} ${classes.notSelectedIcon2StrokeSize}`;
    const selectedIcon1Classes = `${classes.selectedIcon1Size} ${classes.selectedIcon1StrokeSize}`;
    const selectedIcon2Classes = `${classes.selectedIcon2Size} ${classes.selectedIcon2StrokeSize}`;



    useEffect(() => {
        if (styles.notSelectedIcon1FillColor && notSelectedIcon1Ref.current.firstChild)
            notSelectedIcon1Ref.current.firstChild.style.fill = styles.notSelectedIcon1FillColor.fill;

        if (styles.notSelectedIcon1StrokeColor && notSelectedIcon1Ref.current.firstChild)
            notSelectedIcon1Ref.current.firstChild.style.stroke = styles.notSelectedIcon1StrokeColor.stroke;

        if (styles.notSelectedIcon2FillColor && notSelectedIcon2Ref.current.firstChild)
            notSelectedIcon2Ref.current.firstChild.style.fill = styles.notSelectedIcon2FillColor.fill;

        if (styles.notSelectedIcon2StrokeColor && notSelectedIcon2Ref.current.firstChild)
            notSelectedIcon2Ref.current.firstChild.style.stroke = styles.notSelectedIcon2StrokeColor.stroke;


        if (styles.selectedIcon1FillColor && selectedIcon1Ref.current.firstChild)
            selectedIcon1Ref.current.firstChild.style.fill = styles.selectedIcon1FillColor.fill;

        if (styles.selectedIcon1StrokeColor && selectedIcon1Ref.current.firstChild)
            selectedIcon1Ref.current.firstChild.style.stroke = styles.selectedIcon1StrokeColor.stroke;

        if (styles.selectedIcon2FillColor && selectedIcon2Ref.current.firstChild)
            selectedIcon2Ref.current.firstChild.style.fill = styles.selectedIcon2FillColor.fill;

        if (styles.selectedIcon2StrokeColor && selectedIcon2Ref.current.firstChild)
            selectedIcon2Ref.current.firstChild.style.stroke = styles.selectedIcon2StrokeColor.stroke;

    }, [
        styles.notSelectedIcon1FillColor.fill,
        styles.notSelectedIcon1StrokeColor.stroke,
        styles.notSelectedIcon2FillColor.fill,
        styles.notSelectedIcon2StrokeColor.stroke,

        styles.selectedIcon1FillColor.fill,
        styles.selectedIcon1StrokeColor.stroke,
        styles.selectedIcon2FillColor.fill,
        styles.selectedIcon2StrokeColor.stroke,
        info
    ])


    useEffect(() => {
        if (notSelectedIcon1Ref.current.firstChild) notSelectedIcon1Ref.current.firstChild.setAttribute('class', notSelectedIcon1Classes);
        if (notSelectedIcon2Ref.current.firstChild) notSelectedIcon2Ref.current.firstChild.setAttribute('class', notSelectedIcon2Classes);
        if (selectedIcon1Ref.current.firstChild) selectedIcon1Ref.current.firstChild.setAttribute('class', selectedIcon1Classes);
        if (selectedIcon2Ref.current.firstChild) selectedIcon2Ref.current.firstChild.setAttribute('class', selectedIcon2Classes);


    }, [notSelectedIcon1Classes, notSelectedIcon2Classes, selectedIcon1Classes, selectedIcon2Classes,info])




    return (
        <>
            <div className="flex flex-row items-center">
                <span className="icon-container">
                    <i className="bottom-icon" ref={notSelectedIcon1Ref} dangerouslySetInnerHTML={{ __html: notSelectedIcon1?.icon }}></i>
                    <i className="top-icon" ref={notSelectedIcon2Ref} dangerouslySetInnerHTML={{ __html: notSelectedIcon2?.icon }}></i>
                </span>

                <label htmlFor="inline-2-checkbox" className={`ml-4 text-blue-100 text-xs`}>選択前状態</label>
            </div>

            <div className="flex flex-row mt-5 items-center">
                <span className="icon-container">
                    <i className="bottom-icon" ref={selectedIcon1Ref} dangerouslySetInnerHTML={{ __html: selectedIcon1?.icon }}></i>
                    <i className="top-icon" ref={selectedIcon2Ref} dangerouslySetInnerHTML={{ __html: selectedIcon2?.icon }}></i>
                </span>

                <label htmlFor="inline-3-checkbox" className={`ml-4 text-blue-100 text-xs`}>選択後状態</label>
            </div>
        </>
    )
}