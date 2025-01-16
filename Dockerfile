# Stage 1
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG ENVIRONMENT=docker
RUN npm run build -- --configuration=$ENVIRONMENT

# Stage 2
FROM nginx:alpine
COPY --from=build /app/dist/swk5-nextstop/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf