# estateably-bank-account

## 1. Install docker and docker-compose

To install these dependencies, you can follow the next links:

https://docs.docker.com/engine/install/ubuntu/\
https://docs.docker.com/compose/install/

## 2. Clone the project

To clone the project go into any directory (in your home) of your choice and run the following command:

`git clone git@github.com:Lucaspvo/estateably-bank-account.git`\
or\
`git clone https://github.com/Lucaspvo/estateably-bank-account.git`

## 3. Install dependencies

To install all the necessary dependencies, first go into the `web` dir under the root folder of the project and run the following command:\
`npm install`\
Once the installation for the web is done go into the `app` folder and run again:\
`npm install`

## 4. Run the app

Go back to the root directory and run `docker-compose up`\
To stop the containers from running type `docker-compose stop`

## 5. Tests

To run the tests, go to the web directory, type `yarn test` and choose the option `a`