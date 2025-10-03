#!/bin/bash

# Favicon Generation Script for Daunnet Films
# This script helps generate all necessary favicon sizes from your logo

echo "🎬 Daunnet Films Favicon Generator"
echo "=================================="
echo ""

# Check if the logo file exists
if [ ! -f "daunnet-logo.png" ]; then
    echo "❌ Please save your logo as 'daunnet-logo.png' in the public folder first!"
    echo "   The logo should be at least 512x512 pixels for best quality."
    exit 1
fi

echo "📁 Found logo file: daunnet-logo.png"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Please install it to auto-generate favicons:"
    echo ""
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/"
    echo ""
    echo "🌐 Alternatively, use online tools:"
    echo "   • https://favicon.io/favicon-converter/"
    echo "   • https://realfavicongenerator.net/"
    echo "   • https://www.favicon-generator.org/"
    echo ""
    echo "📋 Generate these sizes manually:"
    echo "   • favicon.ico (16x16, 32x32, 48x48)"
    echo "   • 180x180 (Apple touch icon)"
    echo "   • 192x192 (Android icon)"
    echo "   • 512x512 (Large icon)"
    exit 0
fi

echo "✅ ImageMagick found! Generating favicons..."
echo ""

# Generate favicon.ico with multiple sizes
echo "🔄 Generating favicon.ico..."
convert daunnet-logo.png -resize 16x16 favicon-16.png
convert daunnet-logo.png -resize 32x32 favicon-32.png
convert daunnet-logo.png -resize 48x48 favicon-48.png
convert favicon-16.png favicon-32.png favicon-48.png favicon.ico

# Clean up temporary files
rm favicon-16.png favicon-32.png favicon-48.png

echo "✅ Generated favicon.ico"
echo "✅ All favicons ready!"
echo ""
echo "🚀 Your favicon setup is complete!"
echo "   The logo will now appear in browser tabs, bookmarks, and mobile home screens."