FROM nginx:stable-alpine

COPY  ./dist/apps/web/browser /usr/share/nginx/html/