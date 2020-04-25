# Node JS: Advanced Concepts

## Node Architecture
| Javascript Code |
|:-:|
| Node.js |
| V8 |
| libuv |

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
app.listen(...); // the tasks goes into pendingOSTasks which will continuously loads the shouldContinue of the Event Loop
```


## Node Performance

### Cluster mode
* create multiple instances of node to 'multi-thread'


### Worker Thread
* use the thread-pool set up by `libuv`
  * *experimental*