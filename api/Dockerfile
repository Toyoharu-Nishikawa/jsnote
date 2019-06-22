FROM node:alpine
COPY src /usr/src/
COPY sample/public /usr/share/nginx/html/sample/public
COPY sample/private/ReadMe.md /usr/share/nginx/html/sample/private/ReadMe.md
WORKDIR /usr/src
ENTRYPOINT ["npm","start"]
