# Web

> 웹 개념

* Landing page - a single web page that appears in response to clicking on a optimized directive.

* http
  * stateless protocol - 요청 간 사용자 데이터를 저장하는 수단을 제공하지 않는다


## JavaScript

### History
1995 - Netscape's Brendan Erich created 'JavaSCript'\
1997 - Rise of the Dynamic HTML\
1999 - XMLHttpRequest(XHR), exchanging the text-formatted data made possible to creatively interact with the server\
2001 - JSON, syntax for storing and exchanging data\
2004 - Dojo Toolkit framework made possible to manage\large-scale javascript project\
2005 - Ajax library made possible for web applications to be as versatile as desktop applications\
2005 - Apache CouchDB, a JavaScript based NoSQL DB\
2006 - jQuery API simplified controlling the DOM objects\
2007 - WebKit, the HTML engine started the new era of mobile based web\
2008 - V8; Chrome introduced the faster JavaScript engine\
2009 - Node.js, serverside JavaScript engine Node.js was introduced


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


## 웹 디자인 패턴

> scrapped from https://blog.outsider.ne.kr/672

## MVC
아키텍처의 최상위에 뷰가 있고 그아래 컨트롤러가 있고 그 아래 모델이 있습니다. 때문에 뷰는 컨트롤러만 알고 있고 컨트롤러는 모델을 알고 있습니다. 모델이 변경되었을 때 뷰는 컨트롤러를 통해서 통보를 받습니다.
<center><img src="https://miro.medium.com/max/606/1*smJy5uFyF5qucw6_7svnQA.png" width="300"></center>

## MVP
MVC에서 컨트롤러가 Presenter로 교체된 형태이고 프리젠터는 뷰와 같은 레벨에 있습니다. 프리젠터는 뷰와 모델의 이벤트를 모두 받으면서 둘 사이의 상호작용을 조정합니다.
<center><img src="https://miro.medium.com/max/778/0*8ps4RHy13puZY4dK.png" width="300"></center>

## MVVM
MVC에서 컨트롤러가 뷰모델로 교체된 형테이고 뷰모델은 UI레이어 아래에 위치합니다. 뷰모델은 뷰가 필요로 하는 데이터와 커맨드 객체를 노출해 주기 때문에 뷰가 필요로하는 데이터와 액션은 담고 있는 컨테이너 객체로 볼 수도 있습니다.
<center><img src="https://miro.medium.com/max/3402/1*A3cX-CgXms4wJcGYg4qWVQ.png" width="300"></center>
* MVC와 다른점
  * 뷰모델은 뷰를 지원하고, 뷰가 필요한 데이터와 커맨드를 제공
  * command - behavior을 뷰모델에서 정의한 특정 뷰액션과 연결
  * data binding - 특정한 뷰 속성과 뷰 모델의 속성을 연결; 뷰모델에서 속성이 변경되었을 때 뷰에 즉각 반영