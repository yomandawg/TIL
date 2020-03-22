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


## 기능



## 장점

* 막 쌓기에 적합 (log data, session)
* Flexibility: 스키마가 없기 때문에 아무렇게나 저장 가능함
* Performance: 읽기/쓰기 기능이 뛰어나다. Caching 및 트래픽에도 강함
* Scalability: scale-out 구조로 확장 가능
* Conversion/Mapping: BJON 형태로 저장하여 직관적이고 편리함

## 단점

* 정합성이 떨어지므로 transaction이 많을 경우 부적절함
* JOIN의 부재
* 메모리를 OS가 관리함 - 메모리 사이즈의 영향이 크다