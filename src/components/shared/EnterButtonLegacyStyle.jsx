import _ from 'lodash';
import React from 'react';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../store/recoil/appDesignerState';

export default function EnterButtonLegacyStyle(props) {
    const { buttonType = 'a', children } = props;

    const [recoilStateValue] = useRecoilState(appDesignerState);
    const { activePageId, activeTab, tabItems } = recoilStateValue;

    let buttonTypeKey = '';
    if (buttonType === 'a') buttonTypeKey = 'buttonASettings';
    else if (buttonType === 'b') buttonTypeKey = 'buttonBSettings';
    else if (buttonType === 'c') buttonTypeKey = 'buttonCSettings';

    const buttonSettings = tabItems.settings.appSettingQuery[buttonTypeKey];

    const { classes = {}, prefixClass = {}, styles = {} } = buttonSettings || '';

    let classList = '';

    if (!_.isEmpty(classes)) {
        const filteredGlobalClasses = filteredClasses(classes, 'spinnerCustomClass', true);
        classList = Object.values(filteredGlobalClasses).join(' ');
    }

    let normalButtonStyles = '';

    if (!_.isEmpty(styles)) {
        normalButtonStyles = { ...styles.backgroundColor, ...styles.borderColor, ...styles.textColor };
    }

    function filteredClasses(classList = {}, filterKey = '', isSkip = false) {
        if (isSkip) {
            return Object.keys(classList)
                .filter((key) => !key.includes(filterKey))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: classList[key] });
                }, {});
        } else {
            return Object.keys(classList)
                .filter((key) => key.includes(filterKey))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: classList[key] });
                }, {});
        }
    }

    return (
        <button
            type="submit"
            className={`w-full flex items-center justify-center ${classList}`}
            style={normalButtonStyles}
        >
            {children}
        </button>
    );
}
