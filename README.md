# Storefront Backend 

## How to run?
1. install db-migrate globally `npm i -g db-migrate`
1. you need to create 2 databases(you can change the names just make sure to update database.json and .env files)
    1. **store_front_dev** this we be used in the application to store the data  
    ```sh
        CREATE DATABASE store_front_dev;
    ```
    1. **store_front_test** this we be used in tests
    ```sh
        CREATE DATABASE store_front_test;
    ```

1. create postgres users through shell 
    ```sh
        CREATE USER application WITH PASSWORD '0000'; 
        CREATE USER test WITH PASSWORD '0000';
        GRANT ALL PRIVILEGES ON DATABASE store_front_dev TO application; 
        GRANT ALL PRIVILEGES ON DATABASE store_front_test TO test; 
    ```
1. put the databases data in the database.json
   similar to this:
    ```json
        {
            "dev": {
                "driver": "pg",
                "user": {"ENV":"PG_USER"},
                "password": {"ENV":"PG_PASSWORD"},
                "database":{"ENV":"PG_DB_NAME"},
                "host":{"ENV":"PG_HOST"}
            },
            "test": {
                "driver": "pg",
                "user": {"ENV":"TEST_PG_USER"},
                "password": {"ENV":"TEST_PG_PASSWORD"},
                "database":{"ENV":"TEST_PG_DB_NAME"},
                "host":{"ENV":"TEST_PG_HOST"}
            },
            "sql-file" : true
        }

    ```
1. install all the required packages `npm i`
1. run the program either with  `npm start` to watch the ts files
or  `npm run start:prod` build and run the js files

the application will run on port 3000
the database should be running on port 5432
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