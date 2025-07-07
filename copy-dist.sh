#!/bin/bash
mkdir -p /frontend_dist
cp -r /opt/kol_frontend/dist/* /frontend_dist/
echo "✅ Build copied to /frontend_dist"
tail -f /dev/null  # или запусти nginx, если нужно
