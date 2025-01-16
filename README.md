# module10challenge
Solved code for the module 10 challenge

## Video Link

https://drive.google.com/file/d/1H602Sp5dizHXtcXDxga8KCwibel5qZ3p/view

## Description

This project solves the challenge for Module 10 using relational Databases made with postgres, typescript async functions and the 'pg', 'inquirer', 'dotenv' npm packages. 

## Installation

You may need to install NPM packages:
  npm i

You may have to create a .env file on the main directory of the project with this content:
  DB_NAME=enterprise_db
  DB_USER=XXXX
  DB_PASSWORD=YYYY

You may create the database and populate it with the files on .\db:
  schema.sql
  seeds.sql

## Usage

Run the following command: 
  npm run start
(The start script runs "npm run build && node dist/index.js")

## Credits

Fabian Saldierna.

## License

An MIT standard license was used. You may refer to it from the repo.

## Features

Implemented async functions to query a postgres database depending on the presented menu.
