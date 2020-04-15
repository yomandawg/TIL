# Web Security

## SSL/TLS
> Secure Socket Layer (Netscape) / Transport Layer Security
* TCP/IP 네트워크에서 도청, 간섭, 위조를 방지하기 위함
  1. 지원 가능 암호화 교환
  2. 인증 교환
  3. 대칭키 암호화(symmetric-key: 암호화, 복호화에 같은 키를 사용) 및 인증
* SSL 인증서 (CA - certificate authority)
  * 클라이언트와 서버의 통신을 제3자가 보증해주는 전자 인증 문서
  * 서버.인증서 &harr; 클라이언트.인증서
```bash
d700 root root .
300 root root ca.pem # root CA 인증서
300 root root ssl.crt # 인증서 정보 + public key
300 root root ssl.key  # 서버 private key
300 root root sub.class1.server.ca.pem # root CA 중계자 체인
```

## HTTPS
> HTTP Over Secure Socket Layer
* SSL 암호화로 HTTP 전송
* 공개키(public key) handshake &rarr; 대칭키 session

## Cookie
> Personalization of the Web\
> Part of the HTTP protocol
* attach it on *header* for:
  * session management
  * personalization
  * tracking the user
* request cookie vs response cookie
```
HTTP/1.0 OK
Content-type: text/html
Set-cookie: yummy_cookie=choco
Set-cookie: tasty-cookie=strawberry

[page content]
```
* Node.js example with npm `cookie` handler
```javascript
http.createServer((req, res) => {
    var cookies = {};
    if(req.headers.cookie !== undefined) {
        cookies = cookie.parse(req.headers.cookie);
    }
    res.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie',
            'Domain=Domain; Domain=o2.org'
        ]
    });
    res.end('cookie example');
});
```
### Session Management
* *session cookie* - server에 접속한 client 구분용 세션 식별 정보 (브라우저를 종료시 삭제)
* *session id* - server에 로그인된 사용자 식별값; session cookie에 저장되어있는 값
* permanent cookie - `Max-Age`, `Expires`
* **TODO** - session을 활용한 로그인 상태 유지

### Security options
* `Secure` - HTTPS를 쓸 때만 해당 cookie를 전송
* `HttpOnly` - javascript로 해당 cookie에 접근하지 못하게 함

### Other options
* `path` - 해당 url path 경로에 접근시에만 cookie 활성
* `domain` - 해당 domain 경로 접근시에만 cookie 활성

---

### Local Storage

### Indexed DB

### Hash, Salt, Key Stretching
* `PBKDF2`
* `bcript`


## 암호화
* 대칭 vs 비대칭
  * 대칭(symmetric) - same key for encrypting and decrypting
  * 비대칭(asymmetric) - private key(encrypting) &harr; public key(decrypting)

### AES
> 대칭 암호화

### RSA
> 비대칭 암호화 using *modular* and *phi* function\
> [real life example](https://www.youtube.com/watch?v=wXB-V_Keiu8)
* SSH example
```bash
Server `random key`-> Client

Client uses `private key` to encrypt `random key`

Client `encrypted key` -> Server

Server uses `public key` to decrypt `encrypted key`

if `encrypted key` == `random key`: pass
```

### SQL injection
* example: `SELECT * FROM ${table_name};` &rarr; `SELECT * FROM table_name;DROP table_name;`
* solve by escaping or stringifying the formatted area: `SELECT * FROM 'table_name;DROP table_name';`


### XSS