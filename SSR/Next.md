# Next.js

- `curl` as Googlebot

```bash
curl --user-agent "Googlebot/2.1 (+http://www.google.com/bot.html)" -v \$@
```

## File-system Routing

- serve each file in `/pages`

## Automatic code splitting

- load only the necessacities

## Optimized Images

> `npm i next-optimized-images next-compose-plugins imagemin-mozjpeg imagemin-optipng`

```js
// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([[optimizedImages, {}]]);
```

## SSR
