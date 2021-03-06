# 네트워크

> 네트워크 개념

## 네트워크 계층

<center><img src="https://t1.daumcdn.net/cfile/tistory/99F6363359FDDC9E1F" width=400></center>

## IP

- 인터넷 망에 접속하기 위해, NIC 공인기관에서 할당하는 공인 IP를 사용해야 함
- 사용자는 ISP(Internet Service Provider) 업체로부터 공인 주소를 임대받아 인터넷에 접속함
- localhost: `127.0.0.1`

> - IPv4 -IP 통신에 필요한 고유 주소
>   - 2^32 == 32비트(8bit $\times$ 4) 10진수로 나타냄
> - IPv6 - IPv4 고갈을 대비해 만듦
>   - 2^128 == 128비트(16bit $\times$ 8) 16진수로 나타냄

```
예약 IP
0.0.0.0 ~ 0.255.255.255 (0.0.0.0/8, common: 0.0.0.0): 임시 IP
10.0.0.0 ~ 10.255.255.255 (10.0.0.0/8): 사설 IP, A class network
100.64.0.0 ~ 100.127.255.255 (100.64.0.0/10): IPv4 고갈 대비 추가 사설 IP
127.0.0.0 ~ 127.255.255.255 (127.0.0.0/8, common: 127.0.0.1): self; aka. loopback
169.254.0.0 ~ 169.254.255.255 (169.254.0.0/16): DHCP 서버를 찾지 못할 경우 클라이언트가 스스로 할당하는 IP; aka APIPA
172.16.0.0 ~ 172.31.255.255 (172.16.0.0/12): 사설 IP, B class network
192.88.99.0 ~ 192.88.99.255 (192.88.99.0/24): IPv6 <=> IPv4 연결용 IP

192.168.0.0 ~ 192.168.255.255 (192.168.0.0/16): 사설 IP, C class network
    - 가장 많이 사용하는 공유기용 대역
```

## 서브넷 마스크

- IPv4 주소의 고갈을 늦추기 위해 각 라우터가 broadcasting하는 로컬 네트워크 영역에 공인 IP 대역을 호스트가 필요한 만큼만 할당하려 한다
- 이러한 요구에 맞춰 로컬 네트워크 내부에서 접속한 호스트의 IP 대역을 외부 네트워크와 명확히 구분할 수 있는 수단을 표준화 한 것이 subnet mask

- IP 주소에 대한 네트워크 아이디와 호스트 아이디를 구분하기 위해 사용

- 서브넷 마스크 계산 방법 - 논리 AND
- 192.168.0.1 == 192.168.0.1 서브넷마스크:255.255.255.0
  - /24 == /255.255.255.0 (앞에서부터 32비트 환산)

```
예: 192.168.0.1/24
1100 0000 . 1010 1000 . 0000 0000 . 0000 0001 - IP주소
1111 1111 . 1111 1111 . 1111 1111 . 0000 0000 - 서브넷 마스크
1100 0000 . 1010 1000 . 0000 0000 . 0000 0000 - 서브넷 네트워크

호스트 개수: 네트워크 주소와 브로드캐스트 주소를 제외한 254개
네트워크 개수 1개
```

```
예2
IP주소: 192.168.1.0
서브넷마스크: 255.255.255.0

서브넷마스크로 논리 AND 연산을 하면
네트워크 아이디: 192.168.1
호스트 아이디: .0

따라서 범위는 192.168.1.0 ~ 192.158.1.255

예3
IP주소: 192.168.1.0
서브넷마스크: 255.255.0.0
=>
네트워크 아이디: 192.168.
호스트 아이디: .0.1

=> 범위: 192.168.0.0 ~ 192.168.255.255
```

## DHCP

> Dynamic Host Configuration Protocol - 동적 호스트 설정 프로토콜

- IP 라우터는 인터페이스 및 호스트에 IP 주소를 할당한다. 초창기엔 각 PC마다 고정 IP를 설정했는데, IP설정에 실수가 있는 경우 인터넷이 안되거나 동일한 IP를 할당하여 충돌이 나는 경우도 비일비재했다. 그 외에 사용하지 않는 호스트까지 IP를 할당하다보니 IP가 모자라는 문제도 있었다. 그래서 나온 것이 DHCP
- 사용할 때만 IP를 할당하는 동적 설정 프로토콜
  - MAC Address로 기록 및 확인
- 라우터는 단지 게이트웨이 역할만 하고, DHCP 서버는 별도로 두는 구성도 있다

- DHCP Server
  - IP를 분배해주는 역할 - 통신사 전화국, 단지 네트워크 장비, 인터넷 공유기 등
- DHCP Client

  - 서버로부터 IP를 할당받아 사용; 임대, 갱신, 반환 동작

- 임대, 갱신, 반환

  - Discover, Offer, Request, ACKnowledge 패킷
  - 임대(Lease): **DORA**; 정해진 *기간*동안 IP 할당
  - 갱신(Renewal): **RA**; 임대 기간이 끝나기 전 갱신을 통해 불필요한 broadcast 트래픽을 방지
    - `ipconfig /renew`
  - 반환(Release)
    - `ipconfig /release`

- public address(router) &rarr; private address

## Gateway

- OSI 7 Layer 중 Transport(전송) 계층에 해당하는 기기로 서로 다른 프로토콜끼리 네트워크 통신이 가능하도록 연결해주는 기기.
  - 패킷을 대신 보내거나 받는다
  - 주소를 적절한 IP Address로 변환한다

## Proxy Server

> aka _Deric_, 대리 서버

- 클라이언트와 서버 사이에서 데이터를 간접적으로 전달해 주는 서버
- 일부는 요청된 내용을 캐시로 저장한다. 후에 캐시 안의 정보를 요구하는 요청에는 원격 서버에 접속하여 데이터를 가져올 필요가 없으므로 전송 시간 절약 및 트래픽 저감 효과

## SSL (HTTPS)

> Secure Sockets Layer == Transport Layer Security(TLS)

- Netscape사에서 만든 통신 보안을 위한 암호 규약
- TCP/IP 네트워크에서 도청, 간섭, 위조를 방지하기 위함
  1. 지원 가능 암호화 교환
  2. 인증 교환
  3. 대칭키 암호화(symmetric-key: 암호화, 복호화에 같은 키를 사용) 및 인증

## MAC Address

> Media Access Control

- MAC: OSI 모델의 데이터링크 계층 프로토콜
- NIC의 제조업체가 할당
  - `getmac`
- IP 주소로 접근했을 때, 해당 기기를 식별하기 위한 고유 ID
  - 한 번 부여도니 MAC은 바뀌지 않는다
- 가상으로 부여해서 다른 MAC 주소를 가진 것처럼 동작 가능
  - MAC이 차단받으면 우회로 접속 가능

## NIC

> Network Interface Card

- 물리계층 + 데이터링크계층
- 이더넷 카드, 네트워크 어댑터, 랜카드로 불리며 컴퓨터간 신호를 주고받는 하드웨어

## NTP

> Network Time Protocol

- 같은 네트워크 내의 시간을 동기화
- 컴퓨터 클록 시간을 1ms 이하까지 동기화하기 위해 UTC를 사용
- 기준이 되는 서버로부터 장비들의 시간을 동기화

```bash
show ntp status
ntp server 0.0.0.0
```

## WAN

> Wide Area Network (인터넷)

- ## public IP address
- 원거리 통신망
- LAN과 LAN을 연결하는 네트워크; 넓은 범위에서 사용되는 네트워크

&varr; 공유기(gateway(router) address like 192.168.0.1)

## LAN

> Local Area Network

- 사설IP: private IP addresss
- 근거리 통신망
- 특정한 범위 내에 독립된 네트워크를 구축한 것
  - LAN을 구축하면 LAN 외부에서는 LAN 내부에 접근할 수 없음
- 규격: Ethernet(+Wi-Fi)

### NAT

> Network Address Translation

- router에서 private IP address &harr; public IP address 바꾸는 과정(LAN(router) &harr; WAN(internet))
- public outside address와 private inside address의 사이에서 border router로서 역할
- 내부망에서는 사설 IP주소를 사용해 통신하고, 외부망 통신시 NAT을 거쳐 공인 IP 주소로 변환
- 사설 네트워크에 속한 여러 개의 호스트가 하나의 공인 IP주소를 사용해 인터넷에 접속하기 위함

## Port Forwarding

- example) 59.6.66.238:8080 &rarr; 192.168.0.3:80 routing
  - 외부 요청을 내부망의 특정 port로 forward할 수 있다
- router 설정의 포트포워딩: 외부포트 &rarr; 내부포트 지정
  - 서버 포트 ctrl 가능

### PORT

> 0 ~ 65535

- 주요 예약 Port (well-known port: 0 ~ 1023)
  - 22 - SSH
  - 80, 8080 - http(web server listening)
  - 443 - https
  - 1023
- URL format: `scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]`
- port forwarding: routing of request at the gateway according to the connection port

## 가상환경

### VDI

> Virtual Desktop Infrastructure

- 가상 데스크톱 기술
- 사용자는 개인 IO로 작업하지만, 실제 컴퓨팅 환경은 데이터 센터에 구축된 서버에서 운영됨

### RDP

> Remote Desktop Protocol

- MS사의 원격 연결 protocol
- 다른 컴퓨터에 원격 GUI를 제공

### VNC

> Virtual Network Computing

- RFB 프로토콜을 사용하여 다른 컴퓨터의 GUI를 제공
- IO 이벤트를 한 컴퓨터에서 다른 컴퓨터로 전송시켜서 목적지의 GUI를 갱신

## Commands

`nslookup` - name server lookup; get domain name from the dns server
`route` - routing table 편집 및 수정
`netstat` - 네트워크 연결 상태보기
