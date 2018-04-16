
![npm](https://img.shields.io/npm/v/npm.svg)

![Hex.pm](https://img.shields.io/hexpm/l/plug.svg?style=plastic)


Simple Socialy is a demo on building social network using nodeJS.

# Features List

###  Sign in/Register
- For sign up minimum field required - firstname,lastname,email,password,username,profilepic
- For login - email and password
- Logged in user can update their firstname,lastname, password and profilepic

### User Section
 - Following section - The users who are all followed by will come under this section.
 - Followers section - The users who are all following will come under this section.
 
 ### User Section
 - logged in user can create a post.
 - The post consists of heading,description,image and created by.
 - After creation it will appear in a seperate newsfeed wall with all the details.
 - Every user will have a newsfeed wall, and will list down 
     - The posts created by the user by himself.
     - The posts created by the users whom they are following.
 - User who are viewing it can "like" and "comment" the newsfeed.

### Tech

Simple Social uses a number of open source projects to work properly:

* [ReactJS] - HTML enhanced for web apps!
* [VS Code] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [WebPack] - the bundle service for frontend


### Statergy used for news feed
I have followed a well known statergy "pull-concept" to implement newsfeed. To know more on pull-concept, have a look at the below link.
https://github.com/FreemanZhang/system-design/blob/master/newsFeed.md#pull-based

# Installation

### Backend
Simple Social requires [Node.js](https://nodejs.org/) v4+ to run.
Install the dependencies and devDependencies and start the server.
```sh
$ cd backend
$ npm install 
$ node app
```


### Frontend

Install the dependencies and devDependencies and start the webpack-dev-server.
```sh
$ cd frontend
$ npm install 
$ npm start
```

### Api Documentation:
You can find the API documentation in the below link,
https://documenter.getpostman.com/view/2926617/simple-social/RVu8iSwY#3a21e616-da44-0965-2d05-f61316aa0c69

### Yet to be developed

 - Third party static file mnanagement using s3, cloudnary, etc for more effecient caching static files.
 - Index DB like Elasticsearch to be added for accuracy in newsfeed.
 - Implementing Redis or relavent cache cloud for fast throughput and low latency.
 - Implement any MQTT or Socket.io to provide more realtime update about the feed activities.
 - Code cleaning and improvements.
