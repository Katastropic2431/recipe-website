FROM node:20-alpine
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm ci --no-audit --fund=false

EXPOSE 4200
CMD ["npm", "start"]