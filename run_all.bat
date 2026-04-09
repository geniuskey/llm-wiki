@echo off
echo Starting Backend Server (Port 8000)...
start cmd /k "cd backend && venv\Scripts\activate.bat && uvicorn main:app --reload --port 8000"

echo Starting Frontend Server (Vite Port)...
start cmd /k "cd frontend && npm run dev"

echo Done! Servers are starting in separate windows.
