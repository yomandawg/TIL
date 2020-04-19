# Vue.js
> `npm install vue`\
> `npm install vue-cli`\
> `vue init webpack-simple {path}`

## .vue
* 전역 컴포넌트는 `Vue.component`를 사용해 정의
  * 모든 페이지의 container를 대상으로 `new Vue({el: '#container'})`가 정의됨

* 복잡한 프로젝트의 경우 `.vue`확장자를 가진 싱글 파일 컴포넌트 사용
```vue
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
module.exports = {
  data: function() {
    return {
      greeting: 'Hello'
    }
  }
}
</script>
```

### Scoped CSS
* `<stype scoped>` - CSS will apply to elements of the current component only


## Vuex
* For real-time elements
* **Vuex** - 애플리케이션 컴포넌트에 대한 중앙 집중식 저장소 관리
  * Without Vuex, 컴포넌트간 부모&rarr;자식의 props, event 등으로 데이터를 주고받아야 되는데 너무 복잡함!
  * Solution: **Vuex**를 사용해 프로젝트 데이터를 `store`에서 관리
* Vuex properties
  1. State - global variables, define properties
  2. Mutations - state 변경 methods; synchronous
  3. Actions - Mutations commit용 methods; asynchronous
  4. Getters - Components 속성 계산, retrieve state