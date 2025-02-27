FROM nginx:stable-perl AS proxy_base

COPY proxy/nginx.conf /etc/nginx/nginx.conf
COPY proxy/index.html /usr/share/nginx/html/index.html


FROM proxy_base AS proxy_dev