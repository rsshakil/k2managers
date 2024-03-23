/*
 * Flag status for
 * Pagination and Input fields are retaining their values after a page refresh.
 * 0 -- means default behavior
 * 1 -- means keep input value or pagination page number after refresh page
 */
export const reloadPagesFlag = {
  listAccounts: {
    retainInput: 1,
    retainPagination: 0,
  },
  listRoles: {
    retainInput: 0,
    retainPagination: 0,
  },
  listLog: {
    retainInput: 1,
    retainPagination: 0,
  },
  listEvent: {
    retainInput: 1,
    retainPagination: 1,
  },
  listCustomer: {
    retainInput: 1,
    retainPagination: 0,
  },
  listCSV: {
    retainInput: 1,
    retainPagination: 1,
  },
  listSchedulerMap: {
    retainInput: 1,
    retainPagination: 1,
  },
  listDomain: {
    retainInput: 1,
    retainPagination: 1,
  },
  listProject: {
    retainInput: 1,
    retainPagination: 1,
  },
  listCategory: {
    retainInput: 1,
    retainPagination: 1,
  },
  listFilter: {
    retainInput: 1,
    retainPagination: 1,
  },
  listField: {
    retainInput: 1,
    retainPagination: 1,
  },
  listItem: {
    retainInput: 1,
    retainPagination: 1,
  },
  // App list
  listApp: {
    retainInput: 1,
    retainPagination: 1,
  },

};
