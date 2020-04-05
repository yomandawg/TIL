# Promise

> Notes from https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise\
> 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 표현하는 객체


## 설명

* 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위함
* 비동기 메서드에서 마치 동기 메서드처럼 값을 반환 가능
  * 최종 결과를 반환하지는 않고, `Promise`를 바로 반환해서 미래의 어떤 시점에 결과를 제공


## 형태

* 대기(*pending*): 이행하거나 거부되지 않은 초기 상태
* 이행(*fulfilled*): 연산 성공
* 거부(*rejected*): 연산 실패

* `fulfilled` or `rejected` 상태의 프로미스는 `then` 메서드로 후속 처리 대기열에 올릴 수 있음
  * `Promise.prototype.then()`, `Promise.prototype.catch()`는 `Promise` 객체를 반환하므로 `then`, `catch` 체인 연결이 가능


* `Promise.resolve(value)`
  * Promise 연산 성공시 이행값 `value`와 함께 `Promise.then` Promise 객체 반환

* `Promise.reject(reason)`
  * Promise 연산 실패시 `reason`과 함께 거부된 `Promise` 객체 반환