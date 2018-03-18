This is the user management app, here you can preform CRUD operations.

## How to start

### You need a server on
```
localhost:8181
```
If it's somewere else, change api adress in App.js

### Clone or download this repo

### Open the project folder in terminal

### Install node packages
```
sh npm install
```
If you don't have node.js installed on your computer, download and install it (https://nodejs.org/en/)

### Start app
To start, execute terminal command
```
sh npm start
```
It should start test server on localhost:3000
and open app in your browser

### Test app
To run tests, execute
```
sh npm test
```

## What I've used
I've used react-create-app tool, it's awesome and helps to bootstrap projects without pain

For styling I've used Material UI components and LESS for my own styles.

For testing -- Jest and Enzyme, pretty standart tools for testing React apps

## Why it looks so
Cards layout helps to fit in all information I need, it's also pretty flexible scaliable thing.
It works for small scales of data which are returned by the api. For some big amount of users the table layout 
would fit better.

## Code
All components are in respective files for the sake of clarity and modularity.
Components are grouped in folders, not sure that this hierarchy is good, but it works on the small scale. I think that it's better to group by components, not by extensions and keep respective folders for .js .css .less and so on.

Also I've tried to reduce the number of API calls, so when you delete or edit users, the App would send respective request on server and update itself with actual data, without requesting new user list from server.
If you add the user, the list would be requested straight after the POST request,that's because App needs user id, and only server can attach it to the new user. Without respective id other operations with newly created user could lead to bugs.

Most errors are handled and user should be able to receive feedback about all of them. All usecases should work without App being crashed.
