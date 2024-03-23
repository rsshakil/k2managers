import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageOnReload } from '../../helper/browserLocalStorage/LocalStorageOnReload';
import './Navbar.css';
import NavInfo from './NavInfo';
import NavItem from './NavItem';

const Navbar = ({ title }) => {
    const { isLoggedIn, info, lastLoginFailureCount, lastLoginTime, loading, initial } = useSelector(
        (state) => state.auth
    );
    const location = useLocation();
    const { removeFromLocalStorageOnRouteChange } = LocalStorageOnReload();
    // Remove LocalStorage when Route change
    useEffect(() => {
        removeFromLocalStorageOnRouteChange();
    }, [location, removeFromLocalStorageOnRouteChange]);

    const tid = useMemo(() => uuidv4(), []);
    const [tooltipEnabled, setTooltipEnabled] = useState(false);
    // MOUSE ENTER HANDLER
    const handleTooltip = useCallback(
        (e) => {
            if (e.offsetWidth < e.scrollWidth) {
                setTooltipEnabled(true);
            }
        },
        [tooltipEnabled, setTooltipEnabled]
    );

    let headerBackgroundColor = '';
    if (process.env.REACT_APP_MANAGER_HEADER_COLOR) {
        headerBackgroundColor = process.env.REACT_APP_MANAGER_HEADER_COLOR;
    } else {
        headerBackgroundColor = 'bg-green-500';
    }

    return (
        <div className="w-full">
            <nav className={`flex flex-nowrap justify-center ${headerBackgroundColor} h-8 pl-4 pr-4`}>
                {isLoggedIn && !initial && (
                    <NavInfo info={info} lastLoginFailureCount={lastLoginFailureCount} lastLoginTime={lastLoginTime} />
                )}
                {tooltipEnabled && <ReactTooltip id={tid} place="bottom" type="dark" effect="solid" />}
                <div className="flex text-center">
                    <div
                        className="leading-8 text-center text-white font-bold max-w-[640px] truncate"
                        onMouseEnter={(e) => handleTooltip(e.target)}
                        onMouseLeave={() => setTooltipEnabled(false)}
                    >
                        <span className="text-base w-auto" data-for={tid} data-tip={title}>
                            {title}
                        </span>
                    </div>
                </div>
                {isLoggedIn && !initial && <NavItem />}
            </nav>
        </div>
    );
};

export default Navbar;
