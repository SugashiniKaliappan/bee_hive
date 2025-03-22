# Use official Node.js image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install concurrently --save
RUN cd user_authentication && npm install && \
    cd ../modules/patient_enrolment && npm install && \
    cd ../ward_report && npm install && \
    cd ../lab_results && npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 6000

# Start the application
CMD ["npm", "start"]
