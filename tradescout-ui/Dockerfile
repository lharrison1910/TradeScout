FROM node:20-alpine AS builder

WORKDIR /usr/src/app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=80
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]