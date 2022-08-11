FROM node as builder
COPY package.json package-lock.json ./
RUN npm install --force && mkdir /client && mv ./node_modules ./client
WORKDIR /client
COPY . .
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /client/dist/* /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]