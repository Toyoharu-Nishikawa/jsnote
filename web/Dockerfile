FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY nginx/conf.d /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY public /usr/share/nginx/html
COPY sample/public /usr/share/nginx/html/sample/public
COPY sample/private/ReadMe.md /usr/share/nginx/html/sample/private/ReadMe.md
