FROM nginx:stable-perl AS ip_proxy_base

COPY proxy/nginx.conf /etc/nginx/nginx.conf
COPY proxy/index.html /usr/share/nginx/html/index.html


FROM ip_proxy_base AS ip_proxy_dev