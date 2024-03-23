// APIEndpoint URL
export const baseURL = process.env.REACT_APP_API_URL_PRODUCTION;

// TODO: Ability to remove later
// example
export const debug = "debug"

// Project
export const listProject = "/admin/project/read/";
export const createProject = "/admin/project/create/";
export const updateProject = "/admin/project/update/"
export const deleteProject = "/admin/project/delete/"

// Domain
export const listDomain = "/admin/domain/read/"
export const createDomain = "/admin/domain/create/";

// Account
export const listAccounts = "/admin/account/read/0";
export const getAccount = "/admin/account/read/";
export const createAccount = "/admin/account/create/";
export const updateAccount = "/admin/account/update/";
export const deleteAccount = "/admin/account/delete/";

// Role
export const listRoles = "/admin/role/read/0";
export const getRole = "/admin/role/read/";
export const createRole = "/admin/role/create/";
export const updateRole = "/admin/role/update/";
export const deleteRole = "/admin/role/delete/";

// Log
export const listLog = "/admin/log/read/0";
export const createLog = "/admin/log/create";

// Customer
export const listCustomer = "/admin/customer/read/";
// export const getCustomer = "/admin/customer/read/";
export const createCustomer = "/admin/customer/create/";
export const adminReservationMailRemind = "/admin/reservation/mail/remind";

// CSV
export const listCSV = "/admin/csv/read/0";
export const updateCSV = "/admin/csv/update/"; // パスワード設定
export const csvDownload = "/admin/csv/download"; // パスワード設定

// Event
export const listEvent = "/admin/event/read/";
export const createEvent = "/admin/event/create/"
export const updateEvent = "/admin/event/update/"
export const deleteEvent = "/admin/event/delete/"

// App
export const listApp = "/admin/app/read/";
export const createApp = "/admin/app/create/"
export const updateApp = "/admin/app/update/"
export const deleteApp = "/admin/app/delete/"

//TODO: May be delete later
export const updateAppNotice = "/admin/app/update/";

// Scheduler
// TODO: 
// export const listScheduler = "/admin/scheduler/read/0";
export const listScheduler = "/admin/event/mapping/read/0"; //Link has changed 22-7-22
export const listSchedulerMap = "/admin/event/mapping/read/0"; //Link has changed 22-7-22
export const listSchedulerSlot = "/admin/event/scheduler/slot/read/"; // admineventschedulerslotread
//FIXME: Duplicate endpoints. should be deleted later.
export const listSchedulerCatagory = "/admin/category/read/";
export const listSchedulerSlotUpdate = "/admin/event/scheduler/slot/update/";

// Institute
export const listInstitute = "/admin/institute/read/";
export const createInstitute = "/admin/institute/create/";
export const updateInstitute = "/admin/institute/update/";
export const deleteInstitute = "/admin/institute/delete/";

// TODO: Ability to remove later
// App 
export const getAppNotice = "/admin/app/read/"
export const updateAdminAppNotice ="/admin/app/notice/update/" // お知らせ

// TODO: Ability to remove later
// App setting button
export const buttonA ="/action/app/deploy/A"
export const buttonB ="/action/app/deploy/B "

// Filter
export const listFilter = "/admin/filter/read/"
export const createFilter = "/admin/filter/create/"
export const updateFilter = "/admin/filter/update/"
export const deleteFilter = "/admin/filter/delete/"

// Field
export const listField = "/admin/field/read/"
export const createField = "/admin/field/create/"
export const updateField = "/admin/field/update/"
export const deleteField = "/admin/field/delete/"

// Category
export const listCategory = "/admin/category/read/"
export const createCategory = "/admin/category/create/"
export const updateCategory = "/admin/category/update/"
export const deleteCategory = "/admin/category/delete/"

// Item
export const listItem = "/admin/item/read/"
export const createItem = "/admin/item/create/"
export const updateItem = "/admin/item/update/"
export const deleteItem = "/admin/item/delete/"

// Counselor
export const listCounselor = "/admin/counselor/read/"
export const createCounselor = "/admin/counselor/create/"
export const updateCounselor = "/admin/counselor/update/"
export const deleteCounselor = "/admin/counselor/delete/"

// Bus
// BusRoute
export const listBusRoute = "/admin/bus/route/read/"
export const createBusRoute = "/admin/bus/route/create/"
export const updateBusRoute = "/admin/bus/route/update/"
export const deleteBusRoute = "/admin/bus/route/delete/"
