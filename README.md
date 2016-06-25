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

## Tips / Issue / Recommendation

### Debugging in c9.io

Debugging in c9.io with this project. Since we are not using the default template but similar custom workspace you have to do the following.
1. In workspace menu, Run > Run Configuration > New Run Configuration. This open a 'New' run tab typically below your workspace.
2. On Run tab, enter the following:
   - **"Run Config Name"**, enter `Express`
   - **"Command"**, enter `app.js`
   - **"Runner:Auto"** dropdown, select `Runner:Nodejs (default)`
3. Place a breakpoint on js file.
4. Use browser or POSTMAN to execute the api endpoint.

### Issues with `gulp test`

If `gulp test` silently fails, it means another gulp process is running and it has to be killed. Execute the following get back to testing.
```
$ kill -9 $(ps -a | grep 'gulp' | awk '{print $1}')
```

### Simpler git/github versioning model approach to follow.
1. Read jbenet [gist](https://gist.github.com/jbenet/ee6c9ac48068889b0912).


## License

See the [LICENSE](https://github.com/noinarisak/carecenter-api/blob/master/LICENSE) for the more information about the [Unlicense.org](http://unlicense.org) legal terms.
