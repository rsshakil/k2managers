import React, { forwardRef } from 'react'

const Divider = forwardRef((props, ref) => {
    const { dividerWrapClass, dividerClass, dividerStyle, dividerText = '' } = props;

    return (
        <div className={`flex items-center justify-center ${dividerWrapClass}`}>
            <span ref={ref} className={`w-max flex-none ${dividerClass}`} style={dividerStyle} >
                {dividerText}
            </span>
        </div>
    )
});


export default Divider;