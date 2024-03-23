#!/bin/bash

eval $(grep '^REACT_APP_ENVIRONMENT' .env)

echo ""
echo "Last file update time (your local time): "
aws s3 ls manager-${REACT_APP_ENVIRONMENT}-scft-reservation-jp --recursive | sort | tail -n 1 | cut -d ' ' -f 1-2

echo ""
echo "Current deploy task status: "
CLUSTER=k2manager-x86
TASKARN=$(aws ecs list-tasks --cluster $CLUSTER | jq -r '.taskArns[0]')
QUERY="tasks[].{lastStatus:lastStatus, stoppedReason:stoppedReason, createdAt:createdAt, stoppedAt:stoppedAt}"
if [ "$TASKARN" = "null" ]; then
    echo "none"
else
    aws ecs describe-tasks --cluster $CLUSTER --tasks $TASKARN --query "$QUERY"
fi
