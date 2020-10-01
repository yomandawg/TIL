# Database

> Group of Spreads

- Tables < Schema == Database < Database Server

## 순기능

- 보안과 권한 지정
- 요구사항에 따라 데이터 저장
- 효율적인 리소스 활용
- 코드로써 데이터를 조작

## 설계

개념적 모델링 &rarr; 논리적 모델링 &rarr; 물리적 모델링

## 개념적 모델링 (Conceptual Data Modeling)

> 현실세계의 개념을 엔티티로 추상화

### Entity Relational Model

- 요구사항 정보를 개체(Entity), 속성(Attribute), 관계(Relation)으로 표현

## 논리적 모델링 (Logical Data Modeling)

> 엔티티의 논리 구조와 규칙을 정의

- 트랜잭션 인터페이스 설계
- 정규화, 참조, 무결성, M:M 관계 정의

## 물리적 모델링 (Physical Data Modeling)

> 컴퓨터에 저장되는 물리적 스키마 작성

- 트랜잭션 설계
- 저장 구조 및 장치 정의
- 접근 방법 정의

### Index

- 단점

```
A column에 index가 걸려 있을 경우
A column에 B 값을 insert
1. index가 없다면 테이블 -> A column으로 바로 B가 insert
2. index가 있다면 테이블에 insert 되기 전 index에 먼저 B가 insert
 2-1. index 정렬
 2-2. 테이블에 B insert
```

## SQL vs NoSQL

- **SQL**
  - Tables, Rows, Columns
- **NoSQL**
  - Collections, Documents, Properties
