// APIEndpoint URL
export const baseURL = process.env.REACT_APP_API_URL_PRODUCTION;
export const environment = process.env.REACT_APP_API_VERSION

// method 
export const listMethod = "GET"
export const createMethod = "POST"
export const updateMethod = "PUT"
export const deleteMethod = "DELETE"

// TODO: Ability to remove later
// example
export const debug = `debug`

// Project
export const listProject = `/${environment}/manager/project/`
export const createProject = `/${environment}/manager/project/`
export const updateProject = `/${environment}/manager/project/`
export const deleteProject = `/${environment}/manager/project/`
export const listProjectData = `/${environment}/manager/project/data/`

// Domain
export const listDomain = `/${environment}/manager/domain/`
export const createDomain = `/${environment}/manager/domain/`;
export const updateDomain = `/${environment}/manager/domain/`;
export const deleteDomain = `/${environment}/manager/domain/`;

// Account
export const listAccounts = `/${environment}/manager/account/`;
export const getAccount = `/${environment}/manager/account/`;
export const createAccount = `/${environment}/manager/account/`;
export const updateAccount = `/${environment}/manager/account/`;
export const deleteAccount = `/${environment}/manager/account/`;

// Role
export const listRoles = `/${environment}/manager/role/`;
export const getRole = `/${environment}/manager/role/`;
export const createRole = `/${environment}/manager/role/`;
export const updateRole = `/${environment}/manager/role/`;
export const deleteRole = `/${environment}/manager/role/`;

// Log
export const listLog = `/${environment}/manager/log/`;
export const createLog = `/${environment}/manager/log/`;

// Customer
export const listCustomer = `/${environment}/manager/customer/`;
export const listCustomerView = `/${environment}/manager/customer/view/`;
// export const getCustomer = `/${environment}/manager/customer/read/`;
// export const createCustomer = `/${environment}/manager/customer/`;
export const adminReservationMailRemind = `/${environment}/manager/customer/reservation/reminder/`;
export const updateCustomerReservation = `/${environment}/manager/customer/edit/`;

// Customer View Template
export const listCustomerViewTemplate = `/${environment}/manager/customer/view/template/`
export const createCustomerViewTemplate = `/${environment}/manager/customer/view/template/`
export const updateCustomerViewTemplate = `/${environment}/manager/customer/view/template/`
export const deleteCustomerViewTemplate = `/${environment}/manager/customer/view/template/`


// CSV
export const listCsvExport = `/${environment}/manager/csv/export/`;
// export const updateCsvExport = `/${environment}/manager/csv/export/`; // パスワード設定
export const csvExportDownload = `/${environment}/manager/csv/export/download/`; // パスワード設定
export const csvExportDeleteList = `/${environment}/manager/csv/export/`

// Email
export const listEmailTemplate = `/${environment}/manager/email/template/`
export const createEmailTemplate = `/${environment}/manager/email/template/`
export const updateEmailTemplate = `/${environment}/manager/email/template/`

// SMS
export const listSMSTemplate = `/${environment}/manager/sms/template/`
export const createSMSTemplate = `/${environment}/manager/sms/template/`
export const updateSMSTemplate = `/${environment}/manager/sms/template/`

// Reservation email send
export const sendResendEmail = `/${environment}/sender/email/`
// Reservation sms send
export const sendResendSMS = `/${environment}/sender/sms/`

// Event
export const listEvent = `/${environment}/manager/event/`;
export const createEvent = `/${environment}/manager/event/`
export const updateEvent = `/${environment}/manager/event/`
export const deleteEvent = `/${environment}/manager/event/`

// Event Item Slot Template Modal
export const listEventItemSlotTemplateModal = `/${environment}/manager/event/slot/template/`;
export const updateEventItemSlotTemplateModal = `/${environment}/manager/event/slot/template/`;

// Event Item Slot Modal
// export const listEventItemSlotModal = `/${environment}/manager/event/slot/`;
// export const updateEventItemSlotModal = `/${environment}/manager/event/slot/`;

// EventCategory
export const listEventCategory = `/${environment}/manager/event/category/`; // EventCategoryList && EventCategoryDetail
export const createEventCategory = `/${environment}/manager/event/category/`;
export const updateEventCategory = `/${environment}/manager/event/category/`;
export const deleteEventCategory = `/${environment}/manager/event/category/`;

// EventInstitute 
export const listEventInstitute = `/${environment}/manager/event/institute/`; // EventInstituteList && EventInstituteDetail
export const createEventInstitute = `/${environment}/manager/event/institute/`;
export const updateEventInstitute = `/${environment}/manager/event/institute/`;
export const deleteEventInstitute = `/${environment}/manager/event/institute/`;

// EventInstituteCalendar
export const listEventInstituteCalendar = `/${environment}/manager/event/institute/calendar/`;
export const updateEventInstituteCalendar = `/${environment}/manager/event/institute/calendar/`;

// EventItem
export const listEventItem = `/${environment}/manager/event/item/`;
export const updateEventItem = `/${environment}/manager/event/item/`;

// EventBus
export const listEventBus = `/${environment}/manager/event/bus/`;
export const updateEventBus = `/${environment}/manager/event/bus/`;

// EventScheduler
// TODO: 
// export const listScheduler = `/${environment}/manager/scheduler/read/0`;
export const listScheduler = `/${environment}/manager/event/mapping/`; //Link has changed 22-7-22
export const listSchedulerMap = `/${environment}/manager/event/mapping/slot/`; //Link has changed 22-7-22
export const listSchedulerSlot = `/${environment}/manager/event/mapping/slot/`; // admineventschedulerslotread
export const listSchedulerSlotUpdate = `/${environment}/manager/event/mapping/slot/`;
//FIXME: Duplicate endpoints. should be deleted later.
export const listSchedulerCatagory = `/${environment}/manager/category/`;

// App
export const listApp = `/${environment}/manager/app/`;
export const updateAppNotice = `/${environment}/manager/app/update/`;
export const createApp = `/${environment}/manager/app/`;
export const updateApp = `/${environment}/manager/app/`;
export const deleteApp = `/${environment}/manager/app/`;
//App > Editor
export const appEditorInitialEndPoint = `/${environment}/manager/app/editor`;
export const appEditorCopyEndPointURL = `/${environment}/manager/app/editor`;

// App > Base
export const listAppBase = `/${environment}/manager/app/base/`;

// AIS --- Add Start
// App > history
export const listAppHistory = `/${environment}/manager/app/history/`;
export const updateAppHistory = `/${environment}/manager/app/history/`;
// AIS --- Add End

// TODO: Ability to remove later
// App 
export const getAppNotice = `/${environment}/manager/app/`
export const updateAdminAppNotice = `/${environment}/manager/app/notice/update/` // お知らせ

// TODO: Ability to remove later
// App setting button
export const buttonA = `/action/app/deploy/A`
export const buttonB = `/action/app/deploy/B `

// Filter
export const listFilter = `/${environment}/manager/filter/`
export const createFilter = `/${environment}/manager/filter/`
export const updateFilter = `/${environment}/manager/filter/`
export const deleteFilter = `/${environment}/manager/filter/`

// Field
export const listField = `/${environment}/manager/field/`
export const createField = `/${environment}/manager/field/`
export const updateField = `/${environment}/manager/field/`
export const deleteField = `/${environment}/manager/field/`
export const copyField = `/${environment}/manager/field/`

// FieldQuery
export const listFieldQuery = `/${environment}/manager/field/query/`
// Filter用フィールド一覧
// export const listFilterField = `/${environment}/manager/field/?specialField=true`

// Category
export const listCategory = `/${environment}/manager/category/`
export const createCategory = `/${environment}/manager/category/`
export const updateCategory = `/${environment}/manager/category/`
export const deleteCategory = `/${environment}/manager/category/`

// Item
export const listItem = `/${environment}/manager/item/`
export const createItem = `/${environment}/manager/item/`
export const updateItem = `/${environment}/manager/item/`
export const deleteItem = `/${environment}/manager/item/`

// Institute
export const listInstitute = `/${environment}/manager/institute/`
export const createInstitute = `/${environment}/manager/institute/`
export const updateInstitute = `/${environment}/manager/institute/`
export const deleteInstitute = `/${environment}/manager/institute/`

// Counselor
export const listCounselor = `/${environment}/manager/counselor/`
export const createCounselor = `/${environment}/manager/counselor/`
export const updateCounselor = `/${environment}/manager/counselor/`
export const deleteCounselor = `/${environment}/manager/counselor/`

// Bus
// BusRoute
export const listBusRoute = `/${environment}/manager/bus/route/`
export const createBusRoute = `/${environment}/manager/bus/route/`
export const updateBusRoute = `/${environment}/manager/bus/route/`
export const deleteBusRoute = `/${environment}/manager/bus/route/`

// BusWay
export const listBusWay = `/${environment}/manager/bus/way/`
export const createBusWay = `/${environment}/manager/bus/way/`
export const updateBusWay = `/${environment}/manager/bus/way/`
export const deleteBusWay = `/${environment}/manager/bus/way/`
//BusStop
export const listBusStop = `/${environment}/manager/bus/stop/`
export const createBusStop = `/${environment}/manager/bus/stop/`
export const updateBusStop = `/${environment}/manager/bus/stop/`
export const deleteBusStop = `/${environment}/manager/bus/stop/`

// Manager Csv Export Template
export const csvExportTemplateList = `/${environment}/manager/csv/export/template/`
export const csvExportTemplateCreate = `/${environment}/manager/csv/export/template/`
export const csvExportTemplateUpdate = `/${environment}/manager/csv/export/template/`
export const csvExportTemplateDelete = `/${environment}/manager/csv/export/template/`
export const csvExportTemplateGenerate = `/${environment}/manager/csv/export/template/generate/`
// Customer Template Read
export const customerTemplateList = `/${environment}/manager/customer/template/`
export const customerTemplateUpdate = `/${environment}/manager/customer/template/`

// Customer Edit Template Read
export const customerEditTemplateRead = `/${environment}/manager/customer/edit/template/`
export const customerEditTemplateUpdate = `/${environment}/manager/customer/edit/template/`
export const customerEditTemplateCreate = `/${environment}/manager/customer/edit/template/`
export const customerEditTemplateDelete = `/${environment}/manager/customer/edit/template/`

// Customer Cancel Reservation 
export const customerCancelReservationDelete = `/${environment}/manager/examination/`

// CSV Import
export const listCsvImport = `/${environment}/manager/csv/import/`;
export const csvImportDownload = `/${environment}/manager/csv/import/download/`;
export const csvImportDeleteList = `/${environment}/manager/csv/import/`
export const csvImportExec = `/${environment}/manager/csv/import/exec/`

// CSV Import Template
export const listCsvImportTemplateList = `/${environment}/manager/csv/import/template`;
export const csvImportTemplateCreate = `/${environment}/manager/csv/import/template/`
export const csvImportTemplateUpdate = `/${environment}/manager/csv/import/template/`
export const csvImportTemplateDelete = `/${environment}/manager/csv/import/template/`
export const csvImportTemplateDownload = `/${environment}/manager/csv/import/template/download/`
// CSV Import Template preview
export const listCsvImportPreviewList = `/${environment}/manager/csv/import/preview/`;
export const listCsvImportUpload = `/${environment}/manager/csv/import/upload/`;

// Broadcast
export const listBroadcast = `/${environment}/manager/broadcast/`
export const broadcastUserCreate = `/${environment}/manager/broadcast/user/`;
export const broadcastTemplateRead = `/${environment}/manager/broadcast/template/`
export const broadcastTemplateUpdate = `/${environment}/manager/broadcast/template/`
export const fileUploadToS3 = `/${environment}/manager/file/upload/s3/`;
