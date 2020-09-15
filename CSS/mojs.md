# mo.js

```bash
npm i @mojs/core
```

```html
<script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script>
```

#### mojs with React HOC example

```js
import React, { useState } from 'react';
import mojs from 'mo-js';

const withAnimation = (WrappedComponent) => {
  return class WithAnimation extends React.Component {
    animationTimeline = new mojs.Timeline();
    state = {
      animationTimeline: this.animationTimeline,
    };

    componentDidMount() {
      const targetHtmlTag = new mojs.Html({
        el: '#target_id',
        opacity: { 0: 1 },
        y: { 0: -30 },
        duration: 300,
        scale: { 1.3: 1 },
        easing: mojs.easing.ease.out,
      }).then({
        opacity: { 1: 0 },
        y: -80,
        delay: 300,
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          animationTimeline={this.state.animationTimeline}
        >
      )
    }
  }
};
```
