## About

### Docker Setup
1. docker run --rm -d --name my-mongo -p 27017:27017 mongo mongod --replSet myReplicaSet
2. docker exec my-mongo mongosh --eval "rs.initiate();"

## Project
This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).


## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`
w
Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
