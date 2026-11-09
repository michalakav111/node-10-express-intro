# Part 1 - answers

Read the Express documentation (https://expressjs.com/en/5x/api.html) and answer in your own words.

## 1. What is inside the request object (`req`)?

<!-- write your answer here -->
The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In this documentation and by convention, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you’re working.

## 2. What is inside the response object (`res`)?

<!-- write your answer here -->
The res object represents the HTTP response that an Express app sends when it gets an HTTP request.

In this documentation and by convention, the object is always referred to as res (and the HTTP request is req) but its actual name is determined by the parameters to the callback function in which you’re working

## 3. What does `app.use()` do?

<!-- write your answer here -->
The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module: