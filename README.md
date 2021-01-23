# Invoice App

Invoice App using ReactJS

* [ReactJS] - JavaScript library for building user interfaces from Facebook
* [yarn] - package manager for the JavaScript Language

### Installation
Clone this repo and install the dependencies and devDependencies and start the server.

```sh
$ git clone git@github.com:akashaf/invoice-system.git
$ cd invoice-system
$ yarn
```
Invoice app require **authorization key** to access.
1. create `.env` file on the root project.
2. use `process.env` use `REACT_APP_` prefix as a key and your **authorization key**.

For production environments...

```sh
$ yarn build
```