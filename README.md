Simple Rest Server
=========

A rest server that runs base on a directory structure

## Getting Started

```shell
npm install simple-rest-server --save-dev
```

## Usage

By default the server runs at port 5000, and the directory structure must be located at "./services"

```shell
mkdir services
mkdir services/test
echo "{ 'greeting': 'Hello World' }" > services/test/GET.json

node
> var server = require('simple-rest-server');
> server.init(); // start a server at 127.0.0.1:5000
```
Then, at your browser go to http://127.0.0.1:5000/test

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## Release History

* 0.0.1 Initial release

	- Separated concerns
	- Logging support



