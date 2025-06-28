#!/bin/bash

echo "🚀 Starting deployment process..."

# Build the React app
echo "📦 Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Start the server
    echo "🌐 Starting server..."
    npm run server
else
    echo "❌ Build failed!"
    exit 1
fi 