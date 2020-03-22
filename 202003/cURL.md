# cURL

> *c*lient *U*niform *R*esource *L*ocator
> 다양한 통신 프로토콜을 이용하여 데이터를 전송하기 위한 library 및 *CLI*(command-line interface) software
> (github source code)[https://github.com/curl/curl]

```bash
$ sudo apt-get install curl
```

## 특징

* 무료, 오픈소스 software
* URL syntax를 사용해 다양한 프로토콜로 데이터 전송을 가능케 한다.
  * FTP, HTTP(HTTPS), RTSP, LDAP, TELNET 등
  * 예) http 요청 메서드(GET, POST, PUT, DELETE 등)를 cmdline에서 url과 함께 전송할 수 있기 때문에 REST한 웹개발에 매우 유용
    * ex) `curl -X GET https://curl.haxx.se` - 해당 사이트에 GET 메서드로 HTTP document를 받아온다.


## 문법

* **curl** - URL을 보낸다
  * `curl [options / URL]`
* **options**
  * -o (output) : 다운로드
    * `curl -o localpage.html http://www.netscape.com/`
  * -i (interface) : 헤더 및 네트워크 인터페이스 확인
  * -v : request 및 response를 주고받는 과정을 표시
  * -s : 진행 메세지 표시 없애기
  * -H (header): 추가 헤더 설정 및 전달
    * `curl -H "X-you-and-me: yes" www.love.com`
  * -d (data) : http post 데이터 추가
    * `curl -d "name=Rafael%20Sagula&phone=3320780" http://www.where.com/guest.cgi`