# Node.js


## [PM2](https://pm2.keymetrics.io/)
> a daemon process manager that helps managing and keeping the node.js application online 24/7
* automatically restart the application when a file is modified

### Commands
```bash
# start an app with pm2 (with options)
pm2 start app.js
pm2 start app.js --watch
pm2 start app.js --watch --no-daemon
pm2 start app.js --watch --ignore-watch="data/* sessions/*" --no-daemon

# kill all pm2 processes
pm2 kill

# monitor all processes launched
pm2 monit

# list all processes
pm2 list

# manage a process
pm2 stop
pm2 restrat
pm2 delete

# view logs
pm2 log
```


## Promise
> Notes from https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise\
> 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 표현하는 객체

* 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위함
* 비동기 메서드에서 마치 동기 메서드처럼 값을 반환 가능
  * 최종 결과를 반환하지는 않고, `Promise`를 바로 반환해서 미래의 어떤 시점에 결과를 제공


### 형태
* 대기(*pending*): 이행하거나 거부되지 않은 초기 상태
* 이행(*fulfilled*): 연산 성공
* 거부(*rejected*): 연산 실패

* `fulfilled` or `rejected` 상태의 프로미스는 `then` 메서드로 후속 처리 대기열에 올릴 수 있음
  * `Promise.prototype.then()`, `Promise.prototype.catch()`는 `Promise` 객체를 반환하므로 `then`, `catch` 체인 연결이 가능


* `Promise.resolve(value)`
  * Promise 연산 성공시 이행값(`result`) resolve와 함께 `Promise.then` Promise 객체 반환
  * `then`을 통한 resolve 처리

* `Promise.reject(reason)`
  * Promise 연산 실패(`error`)시 `reason`과 함께 거부된 `Promise` 객체 반환
  * `catch`를 통한 error 처리

```javascript
const oddNumber = function(a, b) {
    return new Promise((resolve, reject) => {
        if ((a + b) % 2) {
            resolve("Odd Number", a + b);
        } else {
            reject("Even Number", a + b);
        }
    })
}
var x = oddNumber(1, 2)
    .then(result => {
        console.log(result)
        return result
    })
    .catch(error => {
        console.log(error)
        return error
    })
console.log(x) // returns `<pending>` before fully processing the `Promise`
```


## Ajax
> Asynchronus JavaScript & XML

* 생산성 향상 - Single Page Application
  * Resouce 재사용
  * Resource 동적 load (DOM 변경)
  * 서버와 자유로운 통신 (`XMLHttpRequest`)

* `fetch` API
  * `response` 객체를 반환하는 `Promise`

### XMLHttpRequest(XHR)
* 서버와 상호작용하기 위해 사용 - 전체 페이지의 reload 없이 URL로부터 데이터를 받아옴
* 모든 종류의 데이터를 받아올 수 있음

### JavaScript polyfill fetch
* 유물 브라우저에서도 `fetch`를 사용할 수 있게 해주는 API

### Axios
* Promise based HTTP client for browser and node.js


## async function
* `AsyncFunction` 객체를 반환하는 비동기 함수 형태
* Event Loop을 통해 비동기적으로 작동하는 함수 &rarr; `Promise`로 결과를 반환함