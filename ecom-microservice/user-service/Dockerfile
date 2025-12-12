

# 1. Start with a base image (Node.js)
FROM node:18-alpine

# 2. Create a working directory inside the container
WORKDIR /app

# 3. Copy package.json first (for better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Expose the port the app runs on
EXPOSE 3001

# 7. Command to start the app
CMD ["npm", "start"]