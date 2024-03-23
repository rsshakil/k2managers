// -------------React.Lazy Trail #1-------------
// import { lazy } from 'react'

// Common
import ExpiredWarn from '../pages/ExpiredWarn/ExpiredWarn';
import Home from '../pages/Home/Home';
import PasswordReset from '../pages/PasswordReset/PasswordReset';

// Account
import AccountAdd from '../pages/AccountList/AccountAdd';
import AccountEdit from '../pages/AccountList/AccountEdit';
import AccountList from '../pages/AccountList/AccountList';
// App
import AppAdd from '../pages/AppList/AppAdd';
// import AppDesigner from "../pages/AppList/AppDesigner";
import AppEdit from '../pages/AppList/AppEdit';
import AppList from '../pages/AppList/AppList';
import AppSetting from '../pages/AppList/AppSetting';
// Bus Route
import BusRouteAdd from '../pages/BusList/BusRouteAdd';
import BusRouteEdit from '../pages/BusList/BusRouteEdit';
import BusRouteList from '../pages/BusList/BusRouteList';
// Bus Way
import BusWayAdd from '../pages/BusList/BusWay/BusWayAdd';
import BusWayEdit from '../pages/BusList/BusWay/BusWayEdit';
import BusWayList from '../pages/BusList/BusWay/BusWayList';
// Bus Stop
import BusStopAdd from '../pages/BusList/BusStop/BusStopAdd';
import BusStopEdit from '../pages/BusList/BusStop/BusStopEdit';
import BusStopList from '../pages/BusList/BusStop/BusStopList';
// Category
import CategoryAdd from '../pages/CategoryList/CategoryAdd';
import CategoryEdit from '../pages/CategoryList/CategoryEdit';
import CategoryList from '../pages/CategoryList/CategoryList';
// Counselor
import CounselorAdd from '../pages/CounselorList/CounselorAdd';
import CounselorEdit from '../pages/CounselorList/CounselorEdit';
import CounselorList from '../pages/CounselorList/CounselorList';
// Csv Export
import CsvExportAdd from '../pages/CsvList/CsvExportAdd';
import CsvExportList from '../pages/CsvList/CsvExportList';
import CsvExportSetting from '../pages/CsvList/TemplateSetting/CsvExportSetting';
// CSV Import
import CsvImportList from '../pages/CsvImport/CsvImportList';
import CsvImportSetting from '../pages/CsvImport/CsvImportSetting/CsvImportSetting';
// Customer
import CustomerAdd from '../pages/CustomerList/CustomerAdd';
import CustomerList from '../pages/CustomerList/CustomerList';
import CustomerSetting from '../pages/CustomerList/CustomerSetting/CustomerSetting';
// Domain
import DomainAdd from '../pages/DomainList/DomainAdd';
import DomainEdit from '../pages/DomainList/DomainEdit';
import DomainList from '../pages/DomainList/DomainList';
// Event
import EventAdd from '../pages/EventList/EventAdd';
import EventEdit from '../pages/EventList/EventEdit';
import EventList from '../pages/EventList/EventList';
import EventScheduler from '../pages/EventList/EventScheduler/EventScheduler';
// Field
import FieldAdd from '../pages/FieldList/FieldAdd';
import FieldEdit from '../pages/FieldList/FieldEdit';
import FieldList from '../pages/FieldList/FieldList';
// Filter
import FilterAdd from '../pages/FilterList/FilterAdd';
import FilterEdit from '../pages/FilterList/FilterEdit';
import FilterList from '../pages/FilterList/FilterList';
// Institute
import InstituteAdd from '../pages/InstituteList/InstituteAdd';
import InstituteEdit from '../pages/InstituteList/InstituteEdit';
import InstituteList from '../pages/InstituteList/InstituteList';
// Broadcast List
import BroadcastList from '../pages/BroadcastList/BroadcastList';
// Item
import ItemAdd from '../pages/ItemList/ItemAdd';
import ItemEdit from '../pages/ItemList/ItemEdit';
import ItemList from '../pages/ItemList/ItemList';
// Log
import LogList from '../pages/LogList/LogList';
// Project
import ProjectAdd from '../pages/ProjectList/ProjectAdd';
import ProjectEdit from '../pages/ProjectList/ProjectEdit';
import ProjectList from '../pages/ProjectList/ProjectList';
// Role
import UserRoleAdd from '../pages/RoleList/RoleAdd';
import UserRoleEdit from '../pages/RoleList/RoleEdit';
import UserRoleList from '../pages/RoleList/RoleList';

const AuthRouters = [
    { path: '/top', element: <Home /> },
    { path: '/expired_warn', element: <ExpiredWarn /> },
    { path: '/pwd_reset', element: <PasswordReset /> },
    { path: '/log_list', element: <LogList /> },
    { path: '/account_list', element: <AccountList /> },
    { path: '/account_add', element: <AccountAdd /> },
    { path: '/account_edit/:accountId', element: <AccountEdit /> },
    { path: '/role_list', element: <UserRoleList /> },
    { path: '/role_add', element: <UserRoleAdd /> },
    { path: '/role_edit/:roleId', element: <UserRoleEdit /> },
    { path: '/project_add', element: <ProjectAdd /> },
    { path: '/project_edit/:projectId', element: <ProjectEdit /> },
    { path: '/domain_list', element: <DomainList /> },
    { path: '/domain_add', element: <DomainAdd /> },
    { path: '/domain_edit/:domainId', element: <DomainEdit /> }, 
    { path: '/app_list', element: <AppList /> },
    { path: '/app_add', element: <AppAdd /> },
    { path: '/app_edit/:appId', element: <AppEdit /> },
    { path: '/app_setting', element: <AppSetting /> },
    { path: '/event_list', element: <EventList /> },
    { path: '/event_add', element: <EventAdd /> },
    { path: '/event_edit/:eventId', element: <EventEdit /> },
    { path: '/event_scheduler', element: <EventScheduler /> },
    { path: '/broadcast_list', element: <BroadcastList /> },
    { path: '/filter_list', element: <FilterList /> },
    { path: '/filter_add', element: <FilterAdd /> },
    { path: '/filter_edit/:filterId', element: <FilterEdit /> },
    { path: '/field_list', element: <FieldList /> },
    { path: '/field_add', element: <FieldAdd /> },
    { path: '/field_edit/:fieldId', element: <FieldEdit /> },
    { path: '/category_list', element: <CategoryList /> },
    { path: '/category_add', element: <CategoryAdd /> },
    { path: '/category_edit/:categoryId', element: <CategoryEdit /> },
    { path: '/item_list', element: <ItemList /> },
    { path: '/item_add', element: <ItemAdd /> },
    { path: '/item_edit/:itemId', element: <ItemEdit /> },
    { path: '/counselor_list', element: <CounselorList /> },
    { path: '/counselor_add', element: <CounselorAdd /> },
    { path: '/counselor_edit/:counselorId', element: <CounselorEdit /> },
    { path: '/institute_list', element: <InstituteList /> },
    { path: '/institute_add', element: <InstituteAdd /> },
    { path: '/institute_edit/:instituteId', element: <InstituteEdit /> },
    { path: '/customer_list', element: <CustomerList /> },
    { path: '/customer_setting', element: <CustomerSetting /> },
    { path: '/customer_add', element: <CustomerAdd /> },
    { path: '/csv_export_list', element: <CsvExportList /> },
    { path: '/csv_export_add', element: <CsvExportAdd /> },
    { path: '/csv_export_setting', element: <CsvExportSetting /> },
    { path: '/csv_import_list', element: <CsvImportList /> },
    { path: '/csv_import_setting', element: <CsvImportSetting /> },
    { path: '/bus_route_list', element: <BusRouteList /> },
    { path: '/bus_route_add', element: <BusRouteAdd /> },
    { path: '/bus_route_edit/:busRouteId', element: <BusRouteEdit /> },
    { path: '/bus_way_list/:busRouteId', element: <BusWayList /> },
    { path: '/bus_way_add', element: <BusWayAdd /> },
    { path: '/bus_way_edit/:busWayId', element: <BusWayEdit /> },
    { path: '/bus_stop_list', element: <BusStopList /> },
    { path: '/bus_stop_add', element: <BusStopAdd /> },
    { path: '/bus_stop_edit/:busStopId', element: <BusStopEdit /> },
    { path: '/project_list', element: <ProjectList /> },
];

export default AuthRouters;
