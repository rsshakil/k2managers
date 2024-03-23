import { useState } from 'react';
import CheckboxIcon from './CheckboxIcon';
import CheckboxIconModal from './CheckboxIconModal';

export default function IconPicker({
    name,
    value = '',
    onChangeIcon = () => {},
    iconTitle = '',
    iconSize = '',
    width = '',
    height = '',
    iconCustomClass = '',
    iconWrapperCustomClasses = '',
    titleCustomClasses = '',
}) {
    const { icon = '', key = '' } = value || '';

    const [showModal, setShowModal] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(icon);

    function handleOnPressSave(icon = '', key = '') {
        if (icon) {
            setSelectedIcon(icon);
            const iconObj = { icon: icon, key: key };
            onChangeIcon(name, iconObj);
        }
        setShowModal(false);
    }

    function resetIcon() {
        setSelectedIcon('');
        onChangeIcon(name, { icon: '', key: '' });
        setShowModal(false);
    }

    return (
        <>
            <CheckboxIcon
                icon={selectedIcon}
                iconTitle={iconTitle}
                iconSize={iconSize}
                width={width}
                height={height}
                iconCustomClass={iconCustomClass}
                iconWrapperCustomClasses={iconWrapperCustomClasses}
                titleCustomClasses={titleCustomClasses}
                handleOnClick={setShowModal}
            />

            {showModal && (
                <CheckboxIconModal
                    defaultSelected={key}
                    onPressClose={() => setShowModal(false)}
                    onPressSave={handleOnPressSave}
                    resetIcon={resetIcon}
                />
            )}
        </>
    );
}
