#!/bin/bash

# Clean up any existing logs
rm -f user-auth.log patient-enrolment.log lab-results.log ward-report.log

# Start port forwarding in background
nohup kubectl port-forward service/user-auth-service 6000:6000 > user-auth.log 2>&1 &
nohup kubectl port-forward service/patient-enrolment-service 6002:6002 > patient-enrolment.log 2>&1 &
nohup kubectl port-forward service/lab-results-service 6003:6003 > lab-results.log 2>&1 &
nohup kubectl port-forward service/ward-report-service 6001:6001 > ward-report.log 2>&1 &

echo "Port forwarding started. Logs are being written to *.log files."

# Optional wait time for services to be up
sleep 5
