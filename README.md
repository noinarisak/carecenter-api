# Care Center RESTful API
Care Center Database RESTful API Web Service


## Setup:
1. Install NodeJS libraries for the project.
```
$ npm install
```

2a. Install and setup MongoDB locally on c9.io workspace. In the terminal, execute the following command.
```
$ curl -s https://gist.githubusercontent.com/noinarisak/648294937d053b46d1f9cbc8ba2f1730/raw/7f3eb0685125b56bad62b6dbdac71fbc53819a0e/c9-setup-mongodb.sh | sh
```

2b. Once installed run.
```
$ mongodbctl
```

3. Locate the 'host=' in the output and update the environment varible `MONGODB_URI` and `MONGODB_URI_TEST`

example:
```
MONGODB_URI=mongodb://noinarisak-carecenterapi-3342810/bookAPI
```
to
```
MONGODB_URI=mongodb://{OUTPUT_FROM_MONGODBCTL_PASTE_HERE}/bookAPI
```

## Usage:

Run API. Using [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) to validate API (GET, POST, PUT, DELETE).
```
$ gulp
```


Run test.
```
$ gulp test
```

Happy hacking!

--
### ToDo:
- ~~move the PATCH and PUT code block into the Controller.js~~
- ~~commit the to repo with the Book example.~~
- create makefile for mongod start and stop
- create makefile for 'gulp'
- create makefile for 'gulp test'
- ~~refactor app.js to handle mongod connection better.~~
- create agency api endpoint, GET, POST, PATCH, DELETE.
- create service api endpoint,GET, POST, PATCH, DELETE.
- Research Swagger for API discover