# MongoDB

> NoSQL(non-relational SQL) 데이터베이스\
> 문서(document) 지향 DBMS

* [Install](https://docs.mongodb.com/manual/installation/)
* [CRUD tutorial](https://docs.mongodb.com/manual/crud/)


## 특징

* PaaS + 오픈 소스 개발 모델
* 테이블 기반 relational-DBMS와 달리 JSON과 같은 동적 document를 이용한 DB
* 확장성을 확보함으로 쉽고 빠르게 데이터 통합을 가능케 함
* database--collections--document(key-value) 구조
  * document는 BSON(Binary JSON) 형태로 저장

**vs. RDBMS**
| **RDBMS** | **MongoDB** |
| --- | --- |
| Table | Collection |
| Tuple/Row | Document |
| Column | Key/Field |
| Table Join | Embedded Documents |
| Primary Key | Primary Key (_id) |