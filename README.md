# lab-19

## LAB: Socket.io - Message Queue Server - Assignment 2

### Author: Jonathon Schwamman

### Links and Resources
* [submission PR](https://github.com/Schwamman-401-advanced-javascript/lab-19/pull/1)
* [travis](https://www.travis-ci.com/Schwamman-401-advanced-javascript/lab-19)

#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)


### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db
* `SECRET` - secret string used for JSON web token  

#### Running the app  
* `mongod --dbpath="/PATH_TO_DB/"`
* `npm start` to run app
* `npm run startServer` to run message server
* `npm run startLogger` to run message logger

* Endpoint: `/api/v1/products`
  * `GET` - Gets all products  

  * `POST` - Creates new product 
* Endpoint: `/api/v1/products/:id`
  * `GET` - Gets the product with the matching id 
  * `PUT` - Updates the product with the matching id
  * `DELETE` - Deletes the product with the matching id  

* Endpoint: `/api/v1/categories`
  * `GET` - Gets all category
  * `POST` - Creates new category 
* Endpoint: `/api/v1/categories/:id`
  * `GET` - Gets the category with the matching id 
  * `PUT` - Updates the category with the matching id
  * `DELETE` - Deletes the category with the matching id
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events
