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
    database: "database_name",
    // multipleStatements:true // 한 번의 transaction에 multiple SQL statements 허용 - vulnerable to SQL injection
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

### 보안
```javascript
// ``로 들어온 ?는 query() method에서 [] 인자로 검증된다 - SQL injection 방어
// string ('')으로 인식시켜서 공격 방어
db.query(`SELECT * FROM table_name WHERE id=?`, [?자리], function(error, result) {
    if(error) {
        throw error;
    }
    // Do something
})

// auto-escape(punctuate) on format strings of SQL
db.query(`SELECT * FROM table_name WHERE id=${db.escape(queryData.id)}`, function(error, result) {
    // Do something
}
})
```

---

# node.js
