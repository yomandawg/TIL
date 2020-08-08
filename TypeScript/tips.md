# TypeSript Tips

- TS compiler setup

```bash
tsc --init
```

- TS compiler configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    ...
    "outDir": "./build",
    "rootDir": "./src",
    ...
  }
}
```

```bash
tsc
tsc -w
```

- node with concurrently

```bash
npm install nodemon concurrently
```

- node with concurrently npm settings

```json
// package.json
{
  ...
  "scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
  },
  ...
}
```

```bash
npm start
```
