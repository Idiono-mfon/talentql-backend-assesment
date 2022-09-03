# Backend Assessment

Build and deploy a very simple API that does the following

1.  Calculate and return the age of a person, given their date of birth (dob) as query parameters to `GET /howold`

2.  Limit calls to `GET /howold` and prevent excessive usage from potentially ill-configured or malicious integrators. Only allow a maximum of 3 calls per second for each API client/caller

See full details and instructions in this [Google Doc](https://docs.google.com/document/d/1ma5vKz0j34gwI9WYrZddMM1ENlQddGOVFJ5qdSq2QlQ)

# How does this work

The assesment backend services is developed with nodejs and NestJs framework, and it follows the Model View Controller (MVC) design pattern. The application as stated aboved is scaffolded using nestjs - a scalable framework for building Nodejs server-side applications. The backend service has a single app module which comprises of app.controller.ts, and app.service.ts classes. The controller class implements the request-reponse lifecycle while interacting with the app.service class for executing the underlying logic for required in processing each request.

# App.controller.ts

This is the generic controller of the application, and it has two underlying methods: the **getHello()** and **getAge()** methods. The **getHello()** method returns the welcome message to the user visiting the base endpoint of the API. It handles this by interacting with the **getHello()** method of the app.service class. For processing request from **/howold** endpoint, the controller method **getAge()** interacts with **getAge()** method of the app.service and returns the required response based on the dob value passed as a query parameter.

# App.service.ts

This service class similarly has two methods: the **getHello()** method and the **getAge()** method. The **getHello()** method returns the welcome message back to the controller which forwards the message to the client. The **getAge()** method compute the age of the user based on the date of birth (dob) parameter passed to the request. Moreover, the getAge() method accepts either string formatted timestamp or numeric formatted timestamp, and it first validate whether the dob query parameter is a valid string/numeric timestamp. It returns a 400 Bad request error when an invalid paramter is passed. For verifying the validity of the paramater, the service converts the dob value to unix timestamp and calls an **isNumeric()** helper method to verify the validity of the conversion result. After verifying the validity, the method calls **computeAge()** helper method which calculate user's age by computing the difference between year value of the current timestamp and valid dob timestamp. Furthermore, the service ensures that the age is not negative, and returns a 400 Bad request error for defaulting circumstances. Finally the service returns the age to the controller, which forwards the reponse back to the client.

# Rate Limiting

For implementing the rate limiting functionality, the application leverages @nestjs/throttler package. The ttl (time-to-live) as specified is set to 1s while the number of request is set to 3. The throttling class at default is configured in the app.module.ts file while custom configuration is done on the getAge() method to align with the rate limiting requirement stated in the assementation documentation.
