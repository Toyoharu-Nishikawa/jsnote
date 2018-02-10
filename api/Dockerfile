FROM node:alpine
ADD src /usr/src/
ADD public/sample/private /usr/share/nginx/html/sample/private
WORKDIR /usr/src
ENTRYPOINT ["npm","start"]

