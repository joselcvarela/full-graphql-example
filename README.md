# Full Graphql Example

This is a simple e-commerce to test GraphQL

## Getting Started

Following this steps, you should be able to test and run this application in production or development mode on your system.
**Note**: If you just want to run this application with the API, jump to "Production with API" section

### Prerequisites

You should have latest [Node.js LTS](https://nodejs.org/en/download/)

### Installing

Clone this repo, enter in folder and install the dependencies using npm command:
```
$ git clone git@github.com:joselcvarela/full-graphql-example.git
$ cd full-graphql-example
$ npm install
```

## Development

After dependencies are installed, run the application:
```
$ npm start
```

## Production

After dependencies are installed, it's possible to generate a new production version by doing:
```
$ npm run build
```
Ther result will be in dist/ folder.
**Note**: There is already the latest version on dist/ folder.

## Production with API
After dependencies are installed, run the application and the API server:
```
$ npm run start-with-api
```
After that open in you browser:
* http://localhost:4000/public
**Note**: To simply run the API server visit [server/README.md](https://github.com/joselcvarela/full-graphql-example/blob/master/server/README.md)

### Testing

After dependencies are installed, we can do the tests:
```
$ npm test
```

## Built With

* [Webpack](https://webpack.js.org/) - Module Bundler
* [React](https://reactjs.org//) - Web framework
* [Sass](https://sass-lang.com/) - CSS Preprocessor

## Contributing
To contribute you need to install the following linter extensions on your favorite code editor:

* Eslint (For VSCode use: [vscode-eslint](https://github.com/Microsoft/vscode-eslint))
  * Custom Airbnb style
* Sass-lint (For VSCode use: [vscode-sass-lint](https://github.com/glen-84/vscode-sass-lint))


## Authors

* **José Varela** - [joselcvarela](https://github.com/joselcvarela)
