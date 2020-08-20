# Github Search Backend

"Search" Backend API endpoint which eventually collect the data from Github & stores it in Redis.

---
## Requirements

For development, you will need Redis server, Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/sa3dwi/github_search
    $ cd github_search
    $ yarn install

## Configure app

Open `github_search/.env` then edit it with your settings:

- Default app port
- Default redis port
- Redis cache expiry in milliscounds

## Api Documentations 

open `http://localhost:5000/api-docs/` for more api documentation 

## Run Redis server

    $ redis-server

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build