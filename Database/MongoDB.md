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



### 장점
* *Availability, Faster Development, Scalablity*
* 막 쌓기에 적합 (log data, session)
* Flexibility: 스키마가 없기 때문에 아무렇게나 저장 가능함
* Performance: 읽기/쓰기 기능이 뛰어나다. Caching 및 트래픽에도 강함
* Scale-out 구조로 확장이 쉬움
* Conversion/Mapping: BJON 형태로 저장하여 직관적이고 편리함
* data의 일관성이 중요하지 않고 join을 embed로 할 수 있는 경우 장점 극대화

### 단점
* 정합성이 떨어지므로 transaction이 많을 경우 부적절함
* JOIN의 부재
* 메모리를 OS가 관리함 - 메모리 사이즈의 영향이 크다
* 속도를 얻은 대신 일정 부분 ACID를 포기했다
  * ACID - Atomicity, Consistency, Isolation, Durability
* 은행 데이터처럼 정합성이 중요한 경우 사용 불가능


## [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
> cloud MongoDB service
* able to deploy full managed MongoDB across various cloud platform services

### Express.js App Architecture
1. `View` &larr; `Express.js App` &larr; `Mongoose API` &harr; `MongoDB`
2. `View` &larr; `Express.js App` &larr; `Mongoose API` &harr; `Cache Server` &harr; `MongoDB`

## Cache Server

### Cache Server
* Caching layer
* No need for additional indices
  1. Check if query has been executed before
  2. Store query + result
* collection of the query and `key: value` pair


## [Mongoose ODM](https://mongoosejs.com/docs/index.html)

---

# node.js
> npm install mongodb\
* with `express.js`
```javascript
const express = require('express');
const app = expresss();

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const mongoUrl = 'mongo://localhost:27017'

mongoClient.connect(mongoUrl, (error, databaseConn) => {
  const db = databaseConn.db('electricOrNOt');
});

app.get('/', (req, res) => {
  db.collection('cars')
    .find({imgSrc: 'tesla.jpg'})
    .toArray((queryError, carsResult) => {
      res.json(carsResults);
    });
})
```

---

## Usage
```javascript
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017' // mongodb protocol
const databaseName = 'task-manager' // create a database if non-exist

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    // do something
  }

  const db = client.db(databaseName)
  // create new collection if non-exist
  db.collection('users').insertOne({
    _id: /* customizable or default */
    name: 'Yoman',
    age: 10
  }, (error, result) => {
    // do something
    // result.ops
  }))

  db.collection('users').findOne({ 
    _id: new ObjectID("5ee4a1bd810f9e3734d89168"), // wrap it around the `ObjectID` class
    name: 'Jen',
    age: 1 
    }, (error, user) => {
    // do something
  })

  // find returns a cursor to manually handle returned value
  const findValues = db.collection('users').find({
    age: 27
  })
  findValues.toArray((error, users) => {
    // do something
  })

  // updates handled by `Promise`s
  db.collection('users').updateOne({
    // search criteria
    _id: new ObjectID("5ee484927c74370b5802a2d7")
  }, {
    // update operators
    $set: {
      name: 'Mike'
    },
    $inc: { // increment
      age: 1
    }
  }).then((result) => {
    // do something
  }).catch((error) => {
    // do something
  })

  db.collection('users').deleteMany({
    // search criteria
    age: 27
  }).then(res => {
    // do something
  }).catch(err => {
    // do something
  })
})
```
#### GUID
> global unique identifiers\
* ability to scale well in distributed system (non-incremental)
* can handle heavy traffic without collision of id's
```javascript
// object destructuring
const { MongoClient, ObjectID } = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const id = new ObjectID() // new keyword creates a new `{}` upon the `constructor` function and binds `this` to it.

const id = new ObjectID("5ee4a1bd810f9e3734d89168")
id.toHexString() // stringify
```

## Robo 3T
```bash
${MONGO PATH}/bin/mongod.exe --dbpath=${DB PATH}
```

## Connection Pool
* More connections opened behind the scenes
* "lend" already made connections to clients when requested, return them back to the *connection pool* after use