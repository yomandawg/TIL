# MySQL
> Database Server

## WAMP
> Window + Apache Web Server + MySQL + PHP Stack


## Queries
```mysql
SHOW DATABASES;

USE database_name;

SHOW TABLES;
SHOW FULL TABLES

SHOW TABLES FROM database_name;

SELECT Host, User FROM mysql.user;

CREATE 'nodejs'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON database_name.* TO 'nodejs'@'%';
FLUSH PRIVILEGES;
```


### Node.js Implementation
```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "database_name"
});

connection.connect();

connection.query("SELECT 2 AS solution", function(error, reuslts, fields) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
});

connection.end();
```