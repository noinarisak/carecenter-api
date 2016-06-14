# Care Center RESTful API
Care Center Database RESTful API Web Service


## c9.io Workspace Setup
Install NodeJS libraries for the project.
```
$ npm install
```
Install and setup MongoDB locally on c9.io workspace. In the terminal, execute the following command. Reference [c9.io](https://community.c9.io/t/setting-up-mongodb/1717) and details of the bash [script](https://gist.github.com/noinarisak/648294937d053b46d1f9cbc8ba2f1730).
```
$ curl -s https://gist.githubusercontent.com/noinarisak/648294937d053b46d1f9cbc8ba2f1730/raw/7f3eb0685125b56bad62b6dbdac71fbc53819a0e/c9-setup-mongodb.sh | sh
```
Once installed run.
```
$ mongodbctl
```
Locate the 'host=' in the output and copy into our clipboard.

Copy `.env.example` as `.env.api` file.
```
$ cp .env.example .env.api
```

Update the environment variable `MONGODB_URI` and `MONGODB_URI_TEST` in `.env.api` file.

*EXAMPLE:*

from
```
MONGODB_URI=mongodb://noinarisak-carecenterapi-3342810/bookAPI
```
to
```
MONGODB_URI=mongodb://{HOST_OUTPUT_FROM_MONGODBCTL_PASTE_HERE}/bookAPI
```

## Usage

Run API. Use [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) or something similar to validate API: GET, POST, PUT, DELETE calls.
```
$ gulp
```


Run test.
```
$ gulp test
```

Happy hacking!

## License

See the [LICENSE]() for the more information about the [Unlicense.org](http://unlicense.org) legal terms.
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