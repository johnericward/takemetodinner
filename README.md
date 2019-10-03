# takemetodinner
take me to dinner is group project 2


How to install your own copy of the application.  

This method uses de ```dotenv``` npm package (already saved as a dependency in the package.json file) to save the database connection parameters in a ```.env``` file and read them into 
the ```process.env``` object, making them available to the application without changing the application code (specifically, the config.js file).

1) Clone the master branch into your projects directory:
```git clone <project repo URL>```

2) Create a ".env" file in the project top directory with the following contents:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=<The password for the root user in MySQL>
MYSQL_DBNAME=<Your database name>
```

3) Install dependencies via : 
```npm install```

4) Run the project:
``` node server.js ```

You can connect then to the application via the browser, at http://localhost:3000/.
