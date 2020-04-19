# [Firebase](https://console.firebase.google.com/u/1/)

## Firestore
> Cloud Firestore is a flexible, scalable database

### Snapshot
* Any time you read a data from the database, a snapshot of the data is returned
* `onSnapshot()` - 문서를 수신 대기할 수 있음: asynchronous
  * 최초 콜백: 현재 snapshot 생성
  * 내용이 변경될 때: 콜백 호출, updated snapshot