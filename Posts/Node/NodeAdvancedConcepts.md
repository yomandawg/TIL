# Node JS: Advanced Concepts

## Node Architecture
| Javascript Code |
| :-------------: |
|     Node.js     |
|       V8        |
|      libuv      |

### Event Loop
* Node Event Loop &rarr; Single Threaded\
* Some of Node Framework/Std Lib &rarr; Not Single Threaded

### Thread Pool
> Node.js `libuv` make use of the thread pool with **4 threads** when there's *designated* or *custom* tasks with intensive computations
  * `pendingOperations` in the Event Loop outbounds to the thread pool
  * `fs` module
  * some `crypto` methods
  * customize the threadpool - `process.env.UV_THREADPOOL_SIZE = 2;`

### OS delegation
* `libuv` delegates certain tasks to the underlying OS &rarr; no blocking of the JavaScript code inside the Event Loop
* the OS decides whether to make a new thread to compute the task or however needed to *async* &rarr; no manual handling of `libuv` thread pool
  * Networking Library
    * `https` module
  * `pendingOSTasks` in the Event Loop
```javascript
// example
const app = http.createServer((req, res) => {
  // do something
}
// the tasks goes into pendingOSTasks which will continuously loads the shouldContinue of the Event Loop
app.listen(...);
```


## Node Performance
> benchmark by ApacheBench - `ab -c <concurrent connections> -n <number of requests> url:port`
* Previous request to the Node server may be blocking the following request
* Need a solution to mitigate such problem
* Performance boost is limited by the CPU power, obviously.

### Cluster mode
* create multiple instances of node to 'multi-thread'
* **PM2** - monitor the 'health' of the multiple instances within an application
* `node index.js` &rarr; `cluster.fork()` &rarr; `index.js` &rarr; `worker instance` - control with `cluster.isMaster`
  * 최적화(handling number of `cluster.fork()` slaves) 필요 with CPU performance (`logical cores`)
  * logical cores = physical cores * number of threads that can run on each cores
* manage with PM2 (number of clusters == number of logical acores)
  * `pm2 start -i 0 <node.js file>`

#### Clustering Workflow
> Master & Slave\
1. RUN `node index.js`
2. `node.js` instance is created
   1. the first instance ran automatically creates the **cluster manager**
   2. the **cluster manager** handles **worker instances**
   3. **worker instance** is responsible for processing incoming requests
3. **cluster manager**(*master*) utilize the node.js standard library module `cluster`
   1. whenever `cluster.fork()` is called, node.js internally goes back to `index.js` and executes it the second time
   2. this time though, it is produced with a new **worker instance**(*slave*)
```javascript
const cluster = require('cluster');

cluster.isMaster // checks if the instance is a cluster manager

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in slave mode
  cluster.fork(); // child - every child make use of its own thread pool
  cluster.fork(); // child - every child make use of its own thread pool
  ... // multiple forks -> computational power goes up!
} else {
  // Child instance - do routine and nothing else
}
```

### Worker Thread (experimental stage)
* node 10.5+부터 내장된 method
* use the thread-pool set up by `libuv`
* utilize `webworker-threads`
```javascript
// example
// use the `function` semeantics on purpose, not arrow function
// to route `this` keyword to the nested function object
const worker = new Worker(function() {
// delegate to outside of Node.js process and into the worker threads
this.onmessage = function() {
    let counter = 0;
    while (counter < 1e9) {
      counter++;
    }
    postMessage(counter); // Worker communication interface
  }
});

// Worker communication interface
worker.onmessage = function (message) {
  console.log(message.data); // returned callback
}
worker.postMessage();
```


## Web Application

### Architecture
1. `View` &larr; `Express.js App` &larr; `Mongoose API` &harr; `MongoDB`
2. `View` &larr; `Express.js App` &larr; `Mongoose API` &harr; `Cache Server` &harr; `MongoDB`

### Cache Server
* Caching layer
* No need for additional indices
  1. Check if query has been executed before
  2. Store query + result
* collection of the query and `key: value` pair

### Redis
* `npm install redis`, `require('redis')`
```javascript
const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.set(key, value)
client.get(key, (err, value) => {
  // do something
})
client.get(key, console.log) // another way to callback
```
* tiny database that runs in the **memory** of local machine
* fast read & write
* all the data is deleted(**memory**) when the system is turned off
* useful for caching layer

* `Mongoose` &rarr; `node-redis` &harr; `redis server`

* a key can point to another nested `object` set (like JSON)
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

// reset redis
client.flushall()
```
* object needs to be first converted into JSON format string and parse when `get`ting the data back
```javascript
client.set('colors', JSON.stringify({ red: 'rojo' })) // Convert to JSON format string
client.get('colors', (err, val) => console.log(JSON.parse(val)))
```

* trick to return a promise instead of a callback
```javascript
const util = require('util'); // promisify function to wrap a function to return a promise
client.get = util.promisify(client.get); // repalce the original client.get with util.promisify function

// const cachedBlog = client.get(req.user.id, () => {});
const cachedBlog = await client.get(req.user.id); // handle async-awaits
```