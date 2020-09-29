# PostgreSQL

## node.js

> npm install pg\

```javascript
// @db.js
const PoolClass = require('pg').Pool;

const pool = new PoolClass({
  user: 'postgres',
  host: 'localhost',
  database: 'weatherTiler_development',
  port: 5432,
  password: '',
});

module.exports = {
  query: (queryText, params, callback) => {
    return pool.query(queryText, params, callback);
  },
};
```

```javascript
// @index.js
const db = require('../database/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM city_weathers';
  const scaryDataFromInternet = 36;
  db.query(query, (error, dbResponse) => {
    res.json(dbResponse.rows);
  });
});
```
