import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaPowerOff, FaRegUser } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';
import { logOut } from '../../store/slice/authSlice';
import { getProjectList } from '../../store/slice/projectListSlice';

const NavItem = () => {
    const role = useSelector((state) => state.auth.role) || {};
    const { data } = useSelector((state) => state.projectList);

    const [darkGreen, setDarkGreen] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const routeName = useLocation().pathname;
    const [windowHeightInRem, setWindowHeightInRem] = useState(0);
    const [tooltipEnabled, setTooltipEnabled] = useState(false);
    const tid = useMemo(() => uuidv4(), []);

    // make darkgreen navbar
    const location = useLocation();
    const pathName = location.pathname;
    useEffect(() => {
        let account = pathName.includes('account');
        let role = pathName.includes('role');
        if (account) {
            setDarkGreen({ routeName: 'account', color: 'border-l-green-500' });
        } else if (role) {
            setDarkGreen({ routeName: 'role', color: 'border-l-green-500' });
        } else {
            setDarkGreen({});
        }
    }, [location, pathName]);

    useEffect(() => {
        dispatch(getProjectList());
    }, [dispatch]);

    useEffect(() => {
        if (location?.state?.projectName) {
            dispatch(getProjectList());
        }
    }, [location?.state?.projectName, location?.state?.projectStatus]);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newHeight = window.innerHeight;
            setWindowHeightInRem(Math.floor(newHeight / 16) - 1);
        };

        window.addEventListener('resize', updateWindowDimensions);
        updateWindowDimensions();

        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    const logListReload = () => sessionStorage.setItem('log_list_reload', true);
    const activeProjects = data?.filter((elm) => elm.projectStatus === 1);
    const activeProjectStatus2Length = 2 * activeProjects?.length;

    // MOUSE ENTER HANDLER
    const handleTooltip = useCallback(
        (e) => e.offsetWidth < e.scrollWidth && setTooltipEnabled(true),
        [tooltipEnabled, setTooltipEnabled]
    );

    let toLink = '';
    if (role.r3 == 1) toLink = '/app_list';
    else if (role.r4 >= 1) toLink = '/event_list';
    else if (role.r7 == 1) toLink = '/filter_list';
    else if (role.r8 >= 1) toLink = '/customer_list';
    else if (role.r10 >= 1) toLink = '/csv_export_list';
    else if (role.r11 >= 1) toLink = '/csv_import_list';
    else if (role.r12 == 1) toLink = '/broadcast_list';

    const urlContains = (target, pattern) => {
        let value = 0;
        pattern.forEach(function(word){
            value = value + target.includes(word);
        });
        if (value === 1) {
            // Remove project id & project name from sessionStorage
            sessionStorage.removeItem('currentProjectId');
            sessionStorage.removeItem('currentProjectName');
            sessionStorage.removeItem('pagination_pageNo');
        }
        return (value === 1)
    }


    return (
        <div className="container items-center grid justify-end text-gray-600 text-base flex-1">
            <div className="flex">
                {tooltipEnabled && <ReactTooltip id={tid} place="bottom" type="dark" effect="solid" />}
                {activeProjectStatus2Length ? (
                    <div className="relative group cursor-pointer">
                        <div className={`group-hover:text-gray-700 focus:text-gray-200 text-gray-600 p-2 flex-1
                            ${ 
                                typeof sessionStorage.getItem('currentProjectId') !== "undefined"
                                && typeof sessionStorage.getItem('currentProjectId') !== "object"
                                    ? '!text-gray-700' : null 
                            }
                        `}>
                            <FaChevronDown />
                        </div>
                        <ul
                            className="ul-style ul-project"
                            style={{
                                height: `${
                                    windowHeightInRem > activeProjectStatus2Length
                                        ? activeProjectStatus2Length
                                        : windowHeightInRem
                                }rem`,
                            }}
                        >
                            {data?.length &&
                                data?.map(
                                    (elm, idx) =>
                                        elm.projectStatus === 1 && (
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => navigate(toLink)}
                                                state={elm}
                                                key={idx}
                                            >
                                                {role.r2 >= 1 ||
                                                role.r3 >= 1 ||
                                                role.r4 >= 1 ||
                                                role.r5 >= 1 ||
                                                role.r6 >= 1 ||
                                                role.r7 >= 1 ||
                                                role.r8 >= 1 ? (
                                                    <li
                                                        onMouseEnter={(e) => handleTooltip(e.target)}
                                                        onMouseLeave={(e) => setTooltipEnabled(false)}
                                                        onClick={() => {
                                                            sessionStorage.setItem('currentProjectId', elm.projectId);
                                                            sessionStorage.setItem('projectCsvCharacterCode', elm.projectCsvCharacterCode);
                                                            sessionStorage.setItem('currentProjectName', elm.projectName);
                                                            sessionStorage.removeItem('pagination_pageNo');
                                                        }}
                                                        className={`li-style ${
                                                            elm.projectId ==
                                                            JSON.parse(sessionStorage.getItem('currentProjectId'))
                                                                ? 'border-l-green-500'
                                                                : undefined
                                                        } `}
                                                    >
                                                        <span data-for={tid} data-tip={elm?.projectName}>
                                                            {elm?.projectName}
                                                        </span>
                                                    </li>
                                                ) : (
                                                    <li
                                                        onMouseEnter={(e) => handleTooltip(e.target)}
                                                        onMouseLeave={(e) => setTooltipEnabled(false)}
                                                        className={`li-style ${
                                                            elm.projectId ==
                                                            JSON.parse(sessionStorage.getItem('currentProjectId'))
                                                                ? 'border-l-green-500'
                                                                : undefined
                                                        } `}
                                                        onClick={() => {
                                                            sessionStorage.setItem('currentProjectId', elm.projectId);
                                                            sessionStorage.setItem('projectCsvCharacterCode', elm.projectCsvCharacterCode);
                                                            sessionStorage.setItem('currentProjectName', elm.projectName);
                                                            sessionStorage.removeItem('pagination_pageNo');
                                                        }}
                                                    >
                                                        <span data-for={tid} data-tip={elm?.projectName}>
                                                            {elm?.projectName}
                                                        </span>
                                                    </li>
                                                )}
                                            </div>
                                        )
                                )}
                        </ul>
                    </div>
                ) : (
                    ''
                )}
                {(parseInt(role.r1) === 1 || parseInt(role.r2) === 1) && (
                    <div className="relative group cursor-pointer">
                        <div className={`hover:text-gray-700 p-2 focus:text-gray-200 text-gray-600 flex-1
                            ${ urlContains(routeName, ['/log_list', '/project_list', '/domain_list']) ? '!text-gray-700' : null }
                        `}>
                            <FiSettings />
                        </div>
                        <ul className="ul-style">
                            {parseInt(role.r2) === 1 && (
                                <div className="cursor-pointer" onClick={() => navigate('/log_list')}>
                                    <li
                                        onClick={() => {
                                            logListReload();
                                        }}
                                        className={`li-style ${
                                            routeName.includes('/log') ? 'border-l-green-500' : undefined
                                        } `}
                                    >
                                        ログ
                                    </li>
                                </div>
                            )}
                            {parseInt(role.r1) === 1 && (
                                <div className="cursor-pointer" onClick={() => navigate('/project_list')}>
                                    <li
                                        className={`li-style ${
                                            routeName.includes('/project') ? 'border-l-green-500' : undefined
                                        } `}
                                    >
                                        プロジェクト
                                    </li>
                                </div>
                            )}
                            {parseInt(role.r1) === 1 && (
                                <div className="cursor-pointer" onClick={() => navigate('/domain_list')}>
                                    <li
                                        className={`li-style ${
                                            routeName.includes('/domain') ? 'border-l-green-500' : undefined
                                        } `}
                                    >
                                        ドメイン
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                )}
                <div className="relative group cursor-pointer">
                    <div className={`group-hover:text-gray-700 text-gray-600 p-2 flex-1
                        ${ urlContains(routeName, ['/pwd_reset', '/account_list', '/role_list']) ? '!text-gray-700' : null }
                    `}>
                        <FaRegUser />
                    </div>
                    <ul className="ul-style">
                        <div className="cursor-pointer" onClick={() => navigate('/pwd_reset')}>
                            <li
                                className={`li-style ${routeName === '/pwd_reset' ? 'border-l-green-500' : undefined} `}
                            >
                                ログイン情報変更
                            </li>
                        </div>
                        {parseInt(role.r1) === 1 && (
                            <>
                                <div className="cursor-pointer" onClick={() => navigate('/account_list')}>
                                    <li
                                        className={`li-style  ${
                                            routeName === '/account_list' ? 'border-l-green-500' : undefined
                                        }
                                        ${darkGreen.routeName === 'account' ? darkGreen.color : ''}
                                        `}
                                    >
                                        アカウント管理
                                    </li>
                                </div>
                                <div className="cursor-pointer" onClick={() => navigate('/role_list')}>
                                    <li
                                        className={`li-style ${
                                            routeName === '/role_list' ? 'border-l-green-500' : undefined
                                        } 
                                        ${darkGreen.routeName === 'role' ? darkGreen.color : ''}
                                        `}
                                    >
                                        権限・ロール管理
                                    </li>
                                </div>
                            </>
                        )}
                    </ul>
                </div>

                <div className="relative group cursor-pointer">
                    <div className="group-hover:text-gray-700 text-gray-600 focus:text-gray-200 p-2 flex-1">
                        <FaPowerOff />
                    </div>
                    <ul className="ul-style">
                        <li
                            onClick={() => {
                                sessionStorage.clear();
                                localStorage.clear();
                                dispatch(logOut());
                                navigate('/');
                            }}
                            className="li-style"
                        >
                            ログアウト
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavItem;
