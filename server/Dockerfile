# Select the base image
FROM node:20

# Create the working directory
WORKDIR /app

# Copy dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 8080

CMD ["npm", "run", "dev"]
