#!/bin/bash

echo "⚠️  WARNING: This script will trigger multiple errors and crash the server."
echo "Make sure the server is running on http://localhost:3000"
echo "Waiting 2 seconds..."
sleep 2

echo "1. Triggering ReDoS (Regular Expression Denial of Service)..."
curl -X POST -H "Content-Type: application/json" -d '{"email":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"}' http://localhost:3000/validate-email
echo -e "\n"

echo "2. Triggering Path Traversal..."
curl "http://localhost:3000/download-receipt?file=../../../../../../../../etc/passwd"
echo -e "\n"

echo "3. Triggering Async Error..."
curl "http://localhost:3000/bad-async"
echo -e "\n"

echo "4. Triggering Unhandled Promise Rejection..."
curl "http://localhost:3000/async-bug"
echo -e "\n"

echo "5. Triggering Division by Zero / Logic Error..."
curl "http://localhost:3000/calculate-average/100/0"
echo -e "\n"

echo "6. 💥 Triggering Server Crash (Uncaught Exception)..."
curl "http://localhost:3000/crash"
echo -e "\n"

echo "Done! Check your Sentry Dashboard."