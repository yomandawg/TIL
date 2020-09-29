# DNS

> Domain Name Server

## Host

- 네트워크에 연결된 장치들
- 운영체제 내 `hosts` 파일(전화번호부)로 IP Address에 매핑 가능
  - 해킹(**피싱**)에 위험한 파일 (백신 감시중)
  - https(인증 및 암호화)를 통해 변조 방지
- 초기엔 신뢰할 수 있는 기관(Stanford Research Institute)에서 `hosts`파일 다운로드
  - 수작업, 업데이트 문제 &rarr; **DNS**

### 원리

- 서버 컴퓨터는 DNS 서버에 IP 등록
- 인터넷에 접속하면 ISP(Internet Service Provider)이 **local DNS** IP를 세팅함
- DNS에 접속해서 domain name을 requuest
- 수만대의 DNS가 협력해서 domain name을 제공
- Top-Down으로 구성된 name server들이 협력
  - 예: `yo.man.dawg.`
    - sub(`yo`) &larr; second-level(`man`) &larr; top-level(`dawg`) &larr; root(`.`)
- cache 저장을 통해 중간과정 생략 (`nslookup` Non-authorative answer == cache response)

### Public DNS

- More private and safe DNS Server
- _Google Public DNS Server_: 8.8.8.8, 8.8.8.4(redundancy)
- _CloudFlare_: 1.1.1.1, 1.0.0.1(redundancy)

### DNS record

> `exmaple.com A 93.184.216.34`

- Types
  - _NS_ - name server `example.com NS a.iana-servers.net`
  - _A_ - IP `example.com A 93.184.216.34`
  - **CNAME** - canonical name(alias) `cdn.example.com CNAME iorem-1c6b.kxcdn.com`
    - IP 주소가 자주 바뀌는 도메인에서 alias를 놓아 접근 가능하게 함

### SRV record

- view service(hostname/port) from the DNS
- find services from the same IP
