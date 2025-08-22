FROM node:20-alpine AS build
WORKDIR /app


COPY package*.json ./
RUN npm ci --no-audit --fund=false


COPY . .
ENV NG_CLI_ANALYTICS=false
RUN npm run build -- --configuration production


FROM node:20-alpine AS serve
WORKDIR /app
RUN npm i -g http-server

COPY --from=build /app/dist /app/dist

EXPOSE 4200

CMD ["sh","-c","ROOT=$(ls -d dist/*/browser 2>/dev/null || ls -d dist/* 2>/dev/null); \
  echo \"Serving $ROOT\"; \  
  http-server \"$ROOT\" -p 4200 -a 0.0.0.0 -c-1"]