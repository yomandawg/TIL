### JavaScript Libraries with TypeScript Integration Strategy

1. add basic type annotations when possible
2. use a adapter library (preset helpers)
3. modulate the library to work **with** TypeScript classes

# Express with TypeScript Integration

> modulate the library to work with TypeScript classes

- initialization

```bash
tsc --init
npm install nodemon concurrently
npm install express body-parser cookie-session
npm install @types/express @types/body-parser @types/cookie-session
```

- `tsconfig.json`

```json
"compilerOptions": {
  "outDir": "./build",
  "rootDir": "./src"
}
```

- `package.json`

```json
"scripts": {
  "start:build": "tsc -w",
  "start:run": "nodemon build/index.js",
  "start": "concurrently npm:start:*"
},
```

## middleware

- middlewares processes `req` and `res`, then calls `next`
- _Problem_: TypeScript does not know what kind of processing the middleware is doing
  1. type definition file only tells about the properties of the JS library (no warning on the flow of the properties)
  2. type definition files aren't always accurate
  3. inputs to a server are not guaranteed, or be of the correct type

#### Body Parser

- adds `body` to the `req` object

```typescript
app.use(bodyParser.urlencoded({ extended: true }));
```

```typescript
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.send(email + password);
});
```

- `bodyParser` flow

| Browser  |                      Http Request                       |                      Express                       |
| :------: | :-----------------------------------------------------: | :------------------------------------------------: |
| `<form>` | headers: ...<br/>request body: email=asdf&password=1234 | `req` &rarr; `bodyParser`(middleware) &rarr; `req` |

- by default, express `req` object does not have the `body` property
- `bodyParser` middleware will parse the query string and add it into the `req` object

|                                             |   Express    |                                                                                                      |
| :-----------------------------------------: | :----------: | :--------------------------------------------------------------------------------------------------: |
|                    `req`                    | `bodyParser` |                                                `req`                                                 |
| ip: `number`<br/>hostname: `string`<br/>... |    &rarr;    | ip: `number`<br/>hostname: `string`<br />...<br/>**body**: `{ email: 'asdf', password: 'password' }` |

- **PROBLEM**: no specification on how to use the `req.body` property
  - express assumes that calling `req.body` implies that `bodyParser` is already in use

```typescript
// type definition of `req.body`
body: any; // allows body to be `undefined`

// should be
body: { [key: string]: string | undefined };
```

- **SOLUTION**: extend type definitions

```typescript
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
```

#### Cookie Session

- adds `session` to the `req` object
- `cookie-session` relatively maintains a proper type definition

```typescript
app.use(cookieSession({ keys: ['asdfsaf'] }));
```

```typescript
// type definition of `cookieSession`
declare namespace Express {
  // add in additional properties (extends) onto the `Request`
  interface Request extends CookieSessionInterfaces.CookieSessionRequest {}
}
```

- authentication with `req.session`

```typescript
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next(); // execute the next middleware function
    return;
  }

  res.status(403); // 403 Forbidden
  res.send('Not permitted');
}
```

---

### Singleton Pattern

- allow only one `express.Router`

```typescript
export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
```
