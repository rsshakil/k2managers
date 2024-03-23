import React, { useEffect, useState } from "react";

const FavIconUploaderPreview = ({ pageText, pageId, data }) => {
    const { info } = data || {};
    const { shortcutIcon, appleTouchIcon, icon } = info || {};

    const [width, setWidth] = useState(16);
    const [height, setHeight] = useState(16);

    useEffect(() => {

        async function calculateDimension(imageSrc) {
            try {
                const getDimension = (imageSrc) => new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        const height = image.height;
                        const width = image.width;
                        resolve({ image, width, height });
                    };
                    image.src = imageSrc;
                });

                const { width, height } = await getDimension(imageSrc);

                setWidth(width);
                setHeight(height);

            } catch (err) {
                console.log('Err while calculating dimension ', err)
            }
        }

        if (shortcutIcon) {
            calculateDimension(shortcutIcon);
        }

    }, [shortcutIcon])



    return (
        <>
            {shortcutIcon && (
                <>
                    <label className="text-blue-100 text-sm">ICO (rel="icon")</label>
                    <div className={`w-16 bg-gray-400 flex mb-8`} style={{ width: `${width}px`, heigth: `${height}px` }}>
                        <img className={`p-1 w-36 h-auto`} src={shortcutIcon} alt={'ICO (rel="icon")'} />
                    </div>
                </>
            )}

            {appleTouchIcon && (
                <>
                    <label className="text-blue-100 text-sm">144×144　PNG (rel="apple-touch-icon")</label>
                    <div className={`w-36 bg-gray-400 flex mb-8`}>
                        <img className={`p-1 w-36 h-auto`} src={appleTouchIcon} alt={'144×144　PNG (rel="apple-touch-icon")'} />
                    </div>
                </>
            )}

            {icon && (
                <>
                    <label className="text-blue-100 text-sm">192×192 PNG (rel="icon")</label>
                    <div className={`w-48 bg-gray-400 flex`}>
                        <img className={`p-1 w-48 h-auto`} src={icon} alt={'192×192 PNG (rel="icon")'} />
                    </div>
                </>
            )}
        </>
    );
};
export default FavIconUploaderPreview
