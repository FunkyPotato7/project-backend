# Final-Project-backend (not final name)

This project serves as a backend and is under development, so it has very small (really very) functional.

Currently, you can only get some information from mongo database, but you need login into the server. 

Here is a credential of existing user:

```
email: "admin@gmail.com"
password: "admin"
```

To find out what this project can do and how to use it, open http://localhost:5000/docs.

If you opened the project on a different port, enter this port instead of 5000.

## Running the server
If you wish to run the server, the first step is installing all dependencies from package.json.

Open a terminal and run the following command:

```
npm install 
```

The server is now ready to run. So there is two ways to run. 

The first is default start (without automatic restart):

```
npm run start
```

And the second is with nodemon (automatic restart):

```
npm run start:dev
```

Both ways should result in output such as:

```
Server listen 5000
```

The project is started and now listening at port 5000.

(P.S. you can also start project without my scripts like: node src/app.js or nodemon src/app.js).
