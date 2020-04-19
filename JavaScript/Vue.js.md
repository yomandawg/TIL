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