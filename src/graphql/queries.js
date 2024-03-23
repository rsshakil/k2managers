/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLog = /* GraphQL */ `
  query GetLog($logId: ID!) {
    getLog(logId: $logId) {
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
export const listLogs = /* GraphQL */ `
  query ListLogs(
    $logId: ID
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLogs(
      logId: $logId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const logByLogDateTime = /* GraphQL */ `
  query LogByLogDateTime(
    $type: String!
    $logDateTime: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    logByLogDateTime(
      type: $type
      logDateTime: $logDateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const byCustomerByLogDateTime = /* GraphQL */ `
  query ByCustomerByLogDateTime(
    $customerId: Int!
    $logDateTime: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byCustomerByLogDateTime(
      customerId: $customerId
      logDateTime: $logDateTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
