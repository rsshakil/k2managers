import hexToRgba from 'hex-to-rgba';
import _ from 'lodash';
import { rgbToObj } from '../../lib/ColorConvert';

export default function RecentUsedColor({ colors = [], handleOnChangeColor = () => {} }) {
    const handleOnChange = (_e, hexColor) => {
        const rgbStr = hexToRgba(hexColor);
        const obj = rgbToObj(rgbStr);

        handleOnChangeColor({
            hex: hexColor,
            rgb: obj,
        });
    };

    return (
        <div
            className="flexbox-fix"
            style={{
                marginTop: '8px',
                padding: '10px 0px 0px 10px',
                borderTop: '1px solid rgb(238, 238, 238)',
                display: 'flex',
                flexWrap: 'wrap',
                position: 'relative',
            }}
        >
            {colors.map((x, index) => (
                <div
                    key={index}
                    onClick={(e) => handleOnChange(e, x)}
                    style={{ width: '16px', height: '16px', margin: '0px 10px 10px 0px' }}
                >
                    <span>
                        <div
                            title={x}
                            tabIndex="0"
                            style={{
                                backgroundColor: x,
                                height: '100%',
                                cursor: 'pointer',
                                position: 'relative',
                                outline: 'none',
                                borderRadius: '3px',
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset',
                            }}
                        ></div>
                    </span>
                </div>
            ))}
        </div>
    );
}
