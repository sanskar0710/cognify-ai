#!/bin/bash

# This script helps you get started with Cognify AI

echo "🚀 Cognify AI - Setup Script"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org"
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install it from https://www.python.org"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ Python found: $(python --version)"
echo ""

# Setup Backend
echo "Setting up Backend..."
cd backend

# Create virtual environment
python -m venv venv
echo "✓ Virtual environment created"

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi
echo "✓ Virtual environment activated"

# Install dependencies
pip install -r requirements.txt
echo "✓ Backend dependencies installed"

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  .env file created. Please update it with your MongoDB URI"
fi

cd ..

# Setup Frontend
echo ""
echo "Setting up Frontend..."
cd frontend

# Install dependencies
npm install
echo "✓ Frontend dependencies installed"

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ .env file created"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Update backend/.env with your MongoDB URI"
echo "2. Terminal 1: cd backend && python -m venv venv && source venv/bin/activate && python -m uvicorn app.main:app --reload"
echo "3. Terminal 2: cd frontend && npm run dev"
echo ""
echo "Happy studying! 🎓"
