# Use the official Node.js image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g typescript
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code
# RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the backend
CMD ["npm", "run", "backend"]