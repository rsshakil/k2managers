/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLog = /* GraphQL */ `
  mutation CreateLog(
    $input: CreateLogInput!
    $condition: ModelLogConditionInput
  ) {
    createLog(input: $input, condition: $condition) {
      logId
      _code
      _result
      _target
      _type
      type
      projectId
      accountId
      logDateTime
      ipAddress
      eventId
      customerId
      logData
      logGroupName
      logStreamName
      createdAt
      updatedAt
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
      _code
      _result
      _target
      _type
      type
      projectId
      accountId
      logDateTime
      ipAddress
      eventId
      customerId
      logData
      logGroupName
      logStreamName
      createdAt
      updatedAt
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
      _code
      _result
      _target
      _type
      type
      projectId
      accountId
      logDateTime
      ipAddress
      eventId
      customerId
      logData
      logGroupName
      logStreamName
      createdAt
      updatedAt
    }
  }
`;
