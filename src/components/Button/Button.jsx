import React from 'react';
import './Button.css';

const Button = ({ title, type = 'button', className, colorType, hoverColorType, ...others }) => {
    // Some Extra classes check for button component
    function isClassPropsApply(classes, colorType, hoverColorType) {
        classes = classes !== undefined ? classes : ''; // If extra classes need to added
        colorType = colorType !== undefined ? colorType : 'bg-blue-100'; // Tailwindcss style component added default bg-blue-100
        hoverColorType = hoverColorType !== undefined ? hoverColorType : 'hover:bg-blue-300'; // Tailwindcss style component added default hover:bg-blue-200

        return colorType + ' ' + classes + ' ' + hoverColorType;
    }

    return (
        <button
            type={type}
            className={`h-8 w-full font-bold text-white ${isClassPropsApply(className, colorType, hoverColorType)}`}
            {...others}
        >
            {title}
        </button>
    );
};
export default Button;
