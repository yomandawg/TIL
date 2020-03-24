# Web

> 웹 개념

* Landing page - a single web page that appears in response to clicking on a optimized directive.

* http
  * stateless protocol - 요청 간 사용자 데이터를 저장하는 수단을 제공하지 않는다


## Cache vs. Cookie


## DOM vs BOM

> Javascript Object Model\
> Javascript로 이 객체를 통해 웹브라우저를 제어함

```
객체 계층구조
  window
____|____
|   |   |
DOM BOM JS
```

* **`window`** 객체
  * 모든 브라우저 지원, 브라우저 전체를 뜻하는 전역 객체

```js
window.document.getElementById("header");
// == 
document.getElementById("header");
```

* **DOM**(Document Object Model)
  * HTML, XML 문서의 프로그래밍 interface
  * 렌더링 되기 전 구조화된 html + 헤더 표현 제공
  * 프로그래밍 언어가 DOM 구조에 접근하여 문서 구조 및 스타일 변경 가능
  * 구조화된 nodes와 property와 method를 갖고 있는 objects로 문서를 표현 - 웹페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜줌
  
* **BOM**(Browser Object Model)
  * 브라우저 요소 객체
    * 뒤로가기, 북마크, 즐겨찾기, 히스토리, URL 등
  * 프로그래밍 언어가 BOM 구조에 접근하여 브라우저와 소통 가능
  * 브라우저와 상호작용하는 객체 및 필요 메서드, 속성