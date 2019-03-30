# GoodReads App
A simple GoodReads javascript client web app

## Features
* Should be able to search the books with name
* Interface to list the books with pagination

## Bonus
* Unit test with any framework

Please refer [GoodReads Developer](https://www.goodreads.com/api) for API References.

Don't worry too much about the aesthetics, should be legible that's it!


##Demo Link: https://goodreadsapp.herokuapp.com/

#Highlights
1. Implemented the UI using materialize CSS, React JS and Redux JS
2. Implemented debounce concept in the search help API call
3. Implemented auto fill search box to make the quick search 
4. Implemented pagination, XML to JSON data conversion by pure javascript
5. Implemented axios cache adapter in the api call to reduce redundency
6. Stored userstate (search keyword & page #) in the session storage to make state full while refreshing the useragent


#steps to run the project
1. cd <project directory>
2. npm install
3. npm run start

#steps to run unit test
1. npm run test -- --coverage
2. verify the coverage report under the coverage directory of the project

#This is executed in the below version of node environment
1. Node V10.13.0
2. NPM V6.4.1

## Unit test
unit test are executed and code coverage report added in the outputs directory of this project



