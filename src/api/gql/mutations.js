/* eslint-disable */

export const createLog = /* GraphQL */ `
  mutation CreateLog(
    $input: CreateLogInput!
    $condition: ModelLogConditionInput
  ) {
    createLog(input: $input, condition: $condition) {
      logId
      projectId
      accountId
      customerId
      accountName
      ipAddress
      logFunction
      logType
      logFlag
      logUserFlag
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
export const updateLog = /* GraphQL */ `
  mutation UpdateLog(
    $input: UpdateLogInput!
    $condition: ModelLogConditionInput
  ) {
    updateLog(input: $input, condition: $condition) {
      logId
      projectId
      accountId
      customerId
      accountName
      ipAddress
      logFunction
      logType
      logFlag
      logUserFlag
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
export const deleteLog = /* GraphQL */ `
  mutation DeleteLog(
    $input: DeleteLogInput!
    $condition: ModelLogConditionInput
  ) {
    deleteLog(input: $input, condition: $condition) {
      logId
      projectId
      accountId
      customerId
      accountName
      ipAddress
      logFunction
      logType
      logFlag
      logUserFlag
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
