# Storefront Backend 


## scripts

```bash
  npm i //install all the packages
  npm run build // to compile the ts files
  npm start // to run the application using nodemon
  npm start:prod // build and run the files
  npm test:build // build and run the tests
  npm test:watch // run and watch the tests
  npm test // run the tests
```

.env file structure 
```env
    PG_USER=application
    PG_PASSWORD=0000
    PG_DB_NAME=store_front_dev
    PG_HOST=localhost
    TEST_PG_USER=test
    TEST_PG_PASSWORD=0000
    TEST_PG_DB_NAME=store_front_test
    TEST_PG_HOST=localhost
    JWT_SECRET=secret
```