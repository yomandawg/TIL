# Redis

### Installation for WSL

`sudo apt install redis-server`

`sudo vi /etc/redis/redis.conf`\
`?supervised no` &rarr; change to `supervised systemd`

- start - `sudo service redis-server start`\
  - `redis-cli`
- restart - `sudo service redis-server restart`

### Node.js Server Implementation

- `npm install redis`, `require('redis')`

```javascript
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.set(key, value);
client.get(key, (err, value) => {
  // do something
});
client.get(key, console.log); // another way to callback
```

- tiny database that runs in the **memory** of local machine
- fast read & write
- all the data is deleted(**memory**) when the system is turned off
- useful for caching layer

- `Mongoose` &rarr; `node-redis` &harr; `redis server`

- a key can point to another nested `object` set (like JSON)

```
[example]
key1 -> |_key1 -> val1|
        |_key2 -> val2|
        |_key3 -> val3|
// hash-set
hset(key1, key2, val1)
// hash-set
hget(key1, key2, (err, val) => {
  // do something
})

// reset redis client memory
client.flushall()
```

- object needs to be first converted into JSON format string and parse when `get`ting the data back

```javascript
client.set('colors', JSON.stringify({ red: 'rojo' })); // Convert to JSON format string
client.get('colors', (err, val) => console.log(JSON.parse(val)));
```

- trick to return a promise instead of a callback

```javascript
const util = require('util'); // promisify function to wrap a function to return a promise
client.get = util.promisify(client.get); // repalce the original client.get with util.promisify function

// const cachedBlog = client.get(req.user.id, () => {});
const cachedBlog = await client.get(req.user.id); // handle async-awaits
```
