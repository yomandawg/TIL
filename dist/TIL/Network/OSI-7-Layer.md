# OSI 7 Layer

> Open Systems Interconnections Refernece\
> 컴퓨터 네트워크 프로토콜 디자인과 통신 계층

## 네트워크 계층

<center><img src="https://t1.daumcdn.net/cfile/tistory/99F6363359FDDC9E1F" width=400></center>

## L1 - Physical Layer

- 물리 계층 - 실제 장치들을 연결하기 위한 전기적, 물리적 사항들

단위 - Signal
대표 장치 - Hub

## L2 - Data Link Layer

- 데이크 링크 계층 - point to point 간 신뢰성 있는 정보를 보장하기 위한 계층
- CRC 기반의 오류 제어와 흐름 제어
- 네트워크 위의 개체들 간 데이터를 전달, 물리 계층에서 발생할 수 있는 오류를 찾아내고 수정하는 수단 제공
- 주소값은 물리적으로 할당받음; 네트워크 카드는 만들어질 때부터 MAC Address가 정해져있음
- 이더넷이 여기에 속한다
- 네트워크 브릿지나 스윗치 등이 이 계층에서 동작

단위 - frame
대표 장치 - L2 Switch

## L3 - Network Layer

## L4 - Transport Layer

- 전송 계층 - 사용자들이 신뢰성있는 데이터를 주고 받을 수 있게 해, 상위 계층들이 데이터의 유효성이나 효율성을 생각하지 않게 함
- 송신자와 수신자를 연결하는 통신서비스를 제공하는 계층; 데이터 전달을 담당
- 특정 연결의 밑 패킷들이 유효한지 확인하고, 전송 실패한 패킷들을 다시 전송함
- 오류검출, 복구, 흐름제어, 중복검사 등 수행

단위 - Segment
대표 장치 - L4 Switch
프로토콜 - TCP, UDP

### TCP (Transmission Control Protocol)

> https://mangkyu.tistory.com/15 요약

- 인터넷상에 데이터를 메세지 형태로 보내기 위해 IP와 함께 사용하는 프로토콜
- IP가 데이터의 배달을 처리한다면, TCP는 패킷을 추적 및 관리함
- 연결형 서비스로 가상 회선 방식 지원
- 3-way handshaking으로 연결 / 4-way handshaking으로 해제
  - [참고](https://mindnet.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-22%ED%8E%B8-TCP-3-WayHandshake-4-WayHandshake)
- 흐름 제어 및 혼잡 제어
- 높은 신뢰성 보장 (데이터 흐름제어, 혼잡 제어 등) < UPD 속도
- 서버소켓은 연결만을 담당함
- 스트림 전송
- Streaming 서비스에 불리: 손실된 경우 재전송 요청
- Packet - 인터넷에서 데이터를 보내기 위한 경로배정(routing)을 효율적으로 하기 위해 데이터를 여러 개의 조각들로 나누어 전송함
  - 패킷단위로 같은 목적지로 전송되며, 목적지에서 TCP는 패킷을 조립함

### UDP (User Datagram Protocol)

> 데이터를 데이터그램 단위로 처리

- 비연결형 프로토콜 - 연결을 위해 할당되는 논리경로가 없다
  - 연결을 설정하고 해제하는 과정이 없다
  - 1:N 통신이 가능
- 각각의 패킷은 다른 경로로 전송 (각각 독립적인 관계)
  - 데이터를 서로 다른 경로로 독립적으로 처리
- 정보를 보내거나 받는다는 신호절차를 거치지 않음
- UDP헤더의 `checksum` 필드를 통해 최소한 오류만 확인
  - 신뢰성이 낮지만 TCP보다 빠르다
  - 연속성이 중요한 실시간 서비스에 사용
  - 패킷이 제대로 전송됐는지 오류 확인 불가
- 연결 자체가 없어서 서버 소켓과 클라이언트 소켓의 구분이 없다

#### 흐름제어(Flow Control) vs 혼잡제어(Congestion Control)

흐름제어 - 데이터 송수신의 처리 속도를 조절해 수신자의 버퍼 오버플로우를 방지
혼잡제어 - 네트워크 내 패킷 수가 너무 많지 않도록 조절

## L5 - Session Layer

## L6 - Presentation Layer

## L7 - Application Layer
