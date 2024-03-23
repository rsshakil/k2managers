import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButton from '../controls/OutlineButton';
import OutlineButtonContainer from '../Wrapper/OutlineButtonContainer';

export function checkOutlineButton(role, info) {
    const { item } = info;
    switch (item.pid) {
        case 1: // APP
            if (role?.r3 === 1) {
                return getOutlineButton(info);
            }
            break;
        case 2: // Filter
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 3: // Field
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 4: // Event
            if (role?.r4 >= 1) {
                return getOutlineButton(info);
            }
            break;
        case 5: // Category
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 6: // Item
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 7: // Institute
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 8: // Bus
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 9: // Counselor
            if (role?.r7 == 1) {
                return getOutlineButton(info);
            }
            break;
        case 10: // Customer
            if (role?.r8 >= 1) {
                return getOutlineButton(info);
            }
            break;
        case 11: // CSV Export
            if (role?.r10 >= 1) {
                return getOutlineButton(info);
            }
            break;
        case 12: // CSV import
            if (role?.r11 >= 1) {
                return getOutlineButton(info);
            }
            break;
        case 13: // broadCast
            if (role?.r12 >= 1) {
                return getOutlineButton(info);
            }
            break;
        default:
            return null;
    }
}

export default function OutlineButtonLinkContainer({ ItemData }) {
    const role = useSelector((state) => state.auth.role);

    return (
        <OutlineButtonContainer>
            {ItemData && ItemData.map((item, index) => <ShowOutlineButton key={index} role={role} item={item} />)}
        </OutlineButtonContainer>
    );
}

export const ShowOutlineButton = ({ role, item }) => {
    const navigate = useNavigate();
    const parentRoute = useLocation().pathname.split('/')[1];
    const itemLinkParentRoute = item.link?.split('/').pop();
    const itemLinkIsActive =
        item?.isActive && item?.isActive.some((activeItem) => parentRoute?.includes(activeItem?.link)); // Set Active Button when need to active outline button

    const className = parentRoute?.includes(itemLinkParentRoute)
        ? 'bg-blue-400'
        : itemLinkIsActive
        ? 'bg-blue-400'
        : 'bg-white';

    const navigateLink = (link) => {
        sessionStorage.removeItem('pagination_pageNo');
        navigate(link)
    };

    return <>{checkOutlineButton(role, { item, className, navigateLink })}</>;
};

export function getOutlineButton(info) {
    const { item, className, navigateLink } = info;
    return <OutlineButton text={item.name} className={className} onClick={() => navigateLink(item.link)} />;
}
