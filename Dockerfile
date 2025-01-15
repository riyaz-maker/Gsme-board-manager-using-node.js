FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code into the container
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
