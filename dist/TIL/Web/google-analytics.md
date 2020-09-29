# Google Analytics

#### Filters

- create view &rarr; add filters

## React-GA

- initializing

```js
// _app.js
import ReactGA from 'react-ga';

ReactGA.initialize('tracking code from Google Analytics');
```

- visitor tracker

```js
// @ header component
const [prevURL, setPrevURL] = useState('');

useEffect(() => {
  if (prevURL !== window.location.pathname) {
    setPrevURL(window.location.pathname);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
});
```

- event tracker

```js
<Button
  {...props}
  onClick={() => {
    ReactGA.event({
      category: 'Estimate',
      action: 'Button X Pressed',
    });
  }}
/>
```

- conversion tracker
  - admin &rarr; goals &rarr; create
