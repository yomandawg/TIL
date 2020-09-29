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
    /* Basic Options */
    ...
    "outDir": "./build", /* Redirect output structure to the directory. */
    "rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
    /* Strict Type-Checking Options */
    "strict": false, /* Enable all strict type-checking options. */
    ...
    "strictNullChecks": true, /* Enable strict null checks. */
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

---

- node.js with TypeScript support
  - use built-in node.js library with TS

```bash
npm install @types/node
```
