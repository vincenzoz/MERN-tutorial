# Install project dependencies
npm install

# Start server
npm start

# Compile using babel
npm run compile

# App url
http://localhost:2000


# Mongo Docker container
docker build . -t my_mongo_image
docker run --name my_mongo_container -p 27018:27017 my_mongo_image

# Database initialisation
- Execute the interactive container shell
docker exec -it my_mongo_container /bin/bash

- Execute the init script
mongo issuetracker scripts/init.mongo.js

- Open MongoDB compass and connect to
mongodb://127.0.0.1:27018/issuetracker
