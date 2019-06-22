FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY conf.d /etc/nginx/conf.d
COPY public /usr/share/nginx/html
COPY sample/public /usr/share/nginx/html/sample/public
COPY sample/private/ReadMe.md /usr/share/nginx/html/sample/private/ReadMe.md
