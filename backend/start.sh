#!/bin/bash

# FastAPI Development Server Startup Script
echo "🚀 Starting FastAPI development server..."

# Activate virtual environment and start server
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

