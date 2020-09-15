# Non Blocking Google Fonts

- PageSpeed Insights - _Eliminate render-blocking resources_
  - resources are blocking the first paint of the page

```js
// handlers/Font.js
const FontFaceObserver = require('fontfaceobserver');

const Font = (fontFamily, fontProperties) => {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${fontFamily}:${fontProperties}`;
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const font = new FontFaceObserver(fontFamily);

  font.load().then(() => {
    document.documentElement.classList.add(fontFamily);
  });
};

export default Font;
```

```js
// index.js
import React from 'react';
import Font from 'handlers/Font';
import App from 'components/app';

function Preprocessor() {
  useEffect(() => {
    fonts(/* font family */, /* font properties */);
  });

  return <App />;
}
```
