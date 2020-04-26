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


### Worker Thread (experimental stage)
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
* `npm install redis`
* tiny database that runs in the **memory** of local machine
* fast read & write
* all the data is deleted(**memory**) when the system is turned off
* useful for caching layer

* `Mongoose` &rarr; `node-redis` &harr; `redis server`