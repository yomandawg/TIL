# cURL

> *c*lient *U*niform *R*esource *L*ocator
>
> 다양한 통신 프로토콜을 이용하여 데이터를 전송하기 위한 library 및 _CLI_(command-line interface) software

- [github source code](https://github.com/curl/curl)
- [tutorial](https://curl.haxx.se/docs/manual.html)

```bash
# Linux
$ sudo apt-get install curl
```

## 특징

- 무료, 오픈소스 software
- URL syntax를 사용해 다양한 프로토콜 요청을 가능케 한다.
  - FTP, HTTP(HTTPS), RTSP, LDAP, TELNET 등
- http 메서드(GET, POST, PUT, DELETE 등)를 cmdline에서 url과 함께 전송할 수 있기 때문에 웹개발에 유용
  - ex) `curl -X GET https://curl.haxx.se` - 해당 url에 GET request를 보낸다

## 문법

- **curl** - URL을 보낸다
  - `curl [options / URL]`
- **options**

  - -# (progress) : 상태 바 표시
  - -o (output) : output 파일 write
    - `curl -o localpage.html http://www.netscape.com/`
  - -i (include) : http 헤더 표시
  - -v (verbose): request 및 response를 주고받는 과정을 표시; 추가 정보 표시
  - -s : 진행 메세지 표시 없애기
  - -u : http에 user 및 password 전송
    - `curl -u name:passwd http://machine.domain/full/path/to/file`
  - -k (insecure) : SSL 강제 허가

- **-X** (request)

  - curl에 request를 함께 전송할 때
  - `-X POST` / `-X PUT`

- **-H** (header)

  - curl에 header를 추가할 때
  - `-H "Content-Type: application/json"`

- **-d** (data)
  - curl에 데이터를 포함할 때
  - `-d '{"key: "value"}` / `-d @data.json`

## 예제

1. `curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data`

2. `curl -d "@data.txt" -X POST http://localhost:3000/data`

3. `curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data`
