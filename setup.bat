@echo off
REM This script helps you get started with Cognify AI on Windows

echo 🚀 Cognify AI - Setup Script
echo ==============================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed. Please install it from https://www.python.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i

echo ✓ Node.js found: %NODE_VERSION%
echo ✓ Python found: %PYTHON_VERSION%
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

REM Create virtual environment
python -m venv venv
echo ✓ Virtual environment created

REM Activate virtual environment
call venv\Scripts\activate.bat
echo ✓ Virtual environment activated

REM Install dependencies
pip install -r requirements.txt
echo ✓ Backend dependencies installed

REM Copy environment file
if not exist .env (
    copy .env.example .env
    echo ⚠️  .env file created. Please update it with your MongoDB URI
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

REM Install dependencies
call npm install
echo ✓ Frontend dependencies installed

REM Copy environment file
if not exist .env (
    copy .env.example .env
    echo ✓ .env file created
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo To start the application:
echo 1. Update backend\.env with your MongoDB URI
echo 2. Terminal 1: cd backend ^&^& python -m venv venv ^&^& venv\Scripts\activate.bat ^&^& python -m uvicorn app.main:app --reload
echo 3. Terminal 2: cd frontend ^&^& npm run dev
echo.
echo Happy studying! 🎓
