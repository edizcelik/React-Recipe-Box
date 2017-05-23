# Recipe Box

A simple application to create and store recipes. It is built with React and uses LocalStorage. The project uses the [Simple Webpack 2 Config for a React Project](https://github.com/edizcelik/React-project-simpleStarter) development environment.

## Simple Webpack 2 Config for a React Project

A simple module bundler configuration for you to jump start your React projects. Uses [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to simplify creation of index.html and [sass-loader](https://github.com/webpack-contrib/sass-loader) to compile your Sass codes into CSS. With the help of [babel](https://babeljs.io/), it lets you use jsx and es6 syntax in your javascript files. All you need to do for starting out building your React project is to *git clone* or *download as zip* to your project and run,

```
npm install
```

This will install all the necessary packages for you. 

## Development and Building

This project uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to update the browser on changes.

```
npm run dev
```

This will start a server, listening on connection from `localhost` on port `8080`.

To build, you need to run the following code on your terminal:

```
npm run prod
```

This will first delete everything in the destination folder `dist` and then build your project in it by bundling up your assets from the source folder, `src`.
