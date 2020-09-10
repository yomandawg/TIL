# Material UI + Next.js SSR

- boilerplate

```bash
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs
cd nextjs
npm install
npm run dev
```

### CRA &rarr; Next.js Migration

- replace `Link`

```js
import { Link } from 'react-router-dom';
import NextLink from 'next/link';

<Link to='/page'>
<NextLink href='/page'>
```
