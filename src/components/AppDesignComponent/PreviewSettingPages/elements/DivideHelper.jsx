import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import Divider from './Divider';

export default function DivideHelper({ children, divideWrapClass, divideClass, divideStyle, dividerText }) {
    const [divideWidth, setDivideWidth] = useState(0);
    const { width, height } = useWindowDimensions();
    const location = useLocation();
    const inputDivideRef = useRef(null);

    useLayoutEffect(() => {
        const { clientWidth = 0 } = inputDivideRef.current;

        setDivideWidth(clientWidth);
    }, [location, width, dividerText]);

    return (
        <>
            <Divider
                ref={inputDivideRef}
                dividerWrapClass={`invisible ${divideWrapClass}`}
                dividerClass={divideClass}
                dividerStyle={divideStyle}
                dividerText={dividerText}
            />

            {children(divideWidth, setDivideWidth)}
        </>
    );
}
