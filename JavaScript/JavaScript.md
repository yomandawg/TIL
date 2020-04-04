# JavaScript Notes

## First-class Citizen
> 1급 시민
* 변수(variable), 매개변수(parameter), 반환값(return value) 등으로 사용될 수 있는 데이터
  * 대부분의 언어에서 숫자가 대표적인 1급 시민
* runtime 생성이 가능함
* 익명(anonymous) 생성이 가능함
* *first-class object* (1급 객체)
  * 객체를 1급 시민으로 취급
* *first-class function* (1급 함수)
  * 함수를 1급 시민으로 취급
  * 보통 function은 런타임 생성 또는 익명 생성이 불가능하여 1급 객체가 아니지만 JavaScript에서는 가능
    
### **higher-order function** (고차 함수)
* 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수
* 인자로 받은 함수를 필요 시점에 호출함
* JavaScript의 함수는 일급 객체이므로 인자로 전달 또는 반환 가능
```javascript
// higher-order function example
function higherOrder(func) { // 함수 인자
    var temp = 0;
    return function() { // 함수 런타임 생성
        temp = func(temp); // 함수 변수
        return temp; // 함수 반환
    }
}
```


## **Execution Context**
> notes from https://poiemaweb.com/js-execution-context \
> scope, hoisting, this, function, closure 동작원리 \
> 실행 가능한 코드를 형상화하고 구분하는 개념
```javascript
// 실행 컨텍스트 stack 생성 후 소멸
var x = 'xxx';

function foo() {
    var y = 'yyy';

    function bar() {
        var z = 'zzz';
        console.log(x+y+z);
    }
    bar();
}
foo();
```


## closure
* 외부함수 내에서 내부함수를 정의하고 사용할 때 접근 영역
* 내부함수가 외부함수의 전체 맥락을 접근할 수 있게 함
```javascript
function closureFunc() {
    var innerText = 'Hello';
    return function() {
        return innerText;
    };
}

var clousure = closureFunc(); // var closure 에 closureFunc의 반환값인 function을 싫는다
console.log(closure()); // closureFunc의 생명주기가 끝나서 var innerText도 참조하지 못할텐데, closure()는 innerText를 반환한다!
```

* **private variable**
  * closure을 사용해 private variable 생성
```javascript
function externFunc(param) {
    return {
        get : function() { // 반환
            return param;
        },
        set : function(_param) { // 할당
            param = _param
        }
    }
}
a = externFunc('aa') // a에 externFunc의 반환 객체1를 할당
b = externFunc('bb') // b에 externFunc의 반환 객체2를 할당
console.log(a.get()); // get을 통해 반환 객체1의 param을 간접적으로 반환
console.log(a.get()); // get을 통해 반환 객체2의 param을 간접적으로 반환
a.set('cc') // a의 param에 'cc'를 간접적으로 할당
```
* 즉, "variable에 객체를 저장할 수 있다"는 사실로 새로운 객체를 만들어 할당할 때, closure을 이용해 외부함수 영역에 접근 가능하게 함
  * 외부함수에 closure로 간접적 접근하여 private variable을 생성

* Example to think about
```javascript
var arr = []

for(var i = 0; i < 5; i++) {
    arr[i] = function(id) {
        return function() {
            return id; // closure로 외부함수의 variable에 접근 (id)
        }
    }(i); // 인자로 i를 id에 전달
}

for(var index in arr) {
    console.log(arr[index]());
}
```


## Callback


## Async/Await
> 비동기 처리
* 기존 웹 처리에선 페이지 reload시 전체 리소스를 다시 불러와야 하는 비효율이 있었는데, 비동기식으로 필요한 부분만 불러옴

### Ajax
> Asynchronous JavaScript & XML
* 비동기로 가져온 result를 매개변수로 전달
* 전체 페이지를 새로고침하지 않고 일부만 로드하는 기법
  * JavaScript를 통해 client에서 server에 데이터 요청
* htttp는 client에서 request를 보내고, server에서 response를 받으면 연결이 끊긴다
  * request &harr; response를 다시 하여 페이지 전체 갱신을 해야함 &rarr; 자원낭비
  * AJAX를 통해 HTML 일부분만 갱신할 수 있도록 XMLHttpRequest객체로 server에 request
* JSON & XML 형태로 필요한 데이터만 갱신으로 자원 효율화

* XMLHttpRequest Object &rarr; callback method &rarr; server response &rarr; HTML update



## Prototype-Based Programming


## this

### 전역객체
* 최상위 객체, the universe
  * browser에선 `window`
  * node에서 `global`
* 함수의 this는 그 함수가 속한 객체를 가리키기 때문에, 전역 영역에서 this는 `window` 또는 `global`을 가리킴


### 리터럴
> 편리하게 객체를 만들 수 있게 해주는 것
```javascript
// fucntion을 선언하는 것은 사실상 Function 객체를 생성하는 것과 같음
var sum2 = new Function('x', 'y', 'return x + y;'); // 실제 function 객체가 만들어지는 방법
// 함수를 만드는 리터럴
function sum(x, y) {
    return x + y;
}

// 객체를 만드는 리터럴
var obj1 = {}
// 리스트를 만드는 리터럴
var list1 = []
```

### apply, call, bind
* `apply`: JavaScript의 함수는 동등한 레벨의 객체이기 때문에 해당 함수의 this 객체를 지정함
```javascript
var a = {}
function func() {}
func.apply(a) // 함수의 소속을 a로 지정함
```
* `call`
* `bind`

 
## prototype (원형)
> JavaScirpt의 OOP 개념의 핵심
* 객체의 원형이 정의되어 있는 곳
  * `Object1.prototype = new Object1()`을 통해 `Object1` 상속 가능
  * `Object1.prototype.name = my객체`을 통해 property 설정 가능
  * `new` 키워드는 `prototype`이 가리키는 객체의 복사본을 불러오는 것
    * 복사본을 불러오지 않으면 자식 객체의 prototype을 수정했을 때 부모 객체의 prototype 또한 바뀜
* prototype chaining 가능
* 다중상속: 


### 표준 내장 객체 (Standard Built-in Object)
> Object, Array, Function, String, Boolean, Number, Math, Date, RegExp
* JavaScript는 표준 내장 객체+사용자 정의 객체 API를 통해 Host환경에 새로운 객체들을 만들어가는 방식으로 동작함
* `prototype`을 통해 표준 내장 객체의 property 또한 수정 가능
  * `Array.protytpe.random = function() {}`
* 표준 내장 객체는 이미 생성돼있기 때문에, 멤버 메서드를 바로 사용 가능 (static 메서드)


## Object 객체 API
* 원시적 형태의 객체; 모든 객체의 부모; 모든 객체의 원형(prototype)
* 모든 객체가 공통적으로 가지고 있는 property 추가 가능
```javascript
// Object.keys = function() {} - Object 메서드 지정
Object.keys() // index 정보 - Object 메서드로 사용

// Object.prototype.toString = function() {} - 객체 메서드 지정
Array.toString() // string representation - 객체(new Array()) 메서드로 사용
```