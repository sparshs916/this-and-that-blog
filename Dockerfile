FROM node:18-alpine

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy prisma schema AND migrations
COPY prisma ./prisma/

# Generate Prisma Client based on schema and installed deps
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Default command to run (will be passed to entrypoint.sh)
CMD ["npm", "run", "dev"]