# TypeScript Features

## Decorators

- _functions_ that can be used to modify/change/anything different properties/methods in the _class_

* `tsconfig.json`

```json
"compilerOptions": {
  ...
  /* Experimental Options */
  "experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
  ...
}
```

- use on class property, method, accessor
- _executed only one time when the class is defined_
  - does not get executed when an instance of the class is created

```typescript
function myDecorator(
  target: any /* `prototype` of the object */,
  key: string /* key of the property/method/accessor of the object */,
  desc: PropertyDescriptor /* property descriptor */
): any;
```

- JS translation

```javascript
var __decorate = function (decorators, target, key, desc) {
  var desc = Object.getOwnPropertyDescriptor(target, key);

  for (var decorator of decorators /* list */) {
    decorator(target, key, desc);
  }
};
```

- example

```typescript
class MyClass {
  color: string = 'red';

  get foo(): string {
    return this.color;
  }

  @myDecorator
  bar(): void {
    console.log('foo');
  }
}
```

- `PropertyDescriptor` (`Object.getOwnPropertyDescriptor`)

  |     flag     |             funcionality             |
  | :----------: | :----------------------------------: |
  |   writable   |            allow changes             |
  |  enumerable  |          allows `for...in`           |
  |    value     |            current value             |
  | configurable | definition can be changed or deleted |

- example

```javascript
const car = { maker: 'hyundai', year: 2000 };

Object.getOwnPropertyDescriptor(car, 'maker');
// { value: "hyundai", writable: true, enumerable: true, configurable: true }

Object.defineProperty(car, 'make', { writable: false }); // object no longer writable

car.maker = 'kia';
car.maker; // "hyundai" /* unchanged */
```

- since you cannot change a single object's property with the `prototype`, control its funcionality with `PropertyDescriptor`

- patterns

```typescript
class FactoryPattern {
  @errorMessageFactory('Error Message')
  pilot(): void {
    throw new Error();
  }
}\

function errorMessageFactory(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value; // () => { throw new Error(); }

    desc.value = function () {
      try {
        method(); // () => { throw new Error(); }
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}
```

```typescript
class ParameterDecoratorUsage {
  pilot(
    @parameterDecorator param1: string,
    @parameterDecorator param2: boolean
  ): void {
    // do something
  }
}

function parameterDecorator(
  target: any,
  key: string,
  index: number /* index number of the parameter */
) {
  console.log(key, index);
}

// pilot 1
// pilot 0
```

```typescript
@classDecorator
class ClassDecoratorUsage {}

function classDecorator(
  constructor: typeof ClassDecoratorUsage /* can only use `constructor` on class */
) {
  // do something with the constructor
}
```

## Metadata

- snippets of info that can be tied to a method, property, or class definition
- read and written using `reflect-metadata`

- `tsconfig.json`

```json
"compilerOptions": {
  ...
  "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */
  ...
}
```

```bash
npm install reflect-metadata
```

```typescript
import 'reflect-metadata';
```

- `Reflect` object
  - allows to attach and retrieve metadata to an object or a property of an object
  - reference to another object; similar to the _pointer_

```typescript
const plane = {
  color: 'red',
};

Reflect.defineMetadata('note', 'hi there', plane);
// object `plane` points to the hidden metadata key `note`

const retrieve = Reflect.getMetadata('note', plane);
// `retrieve` object gets the `note`  metadata from `plane`

console.log(retrieve); // hi there
```

```typescript
class Plane {
  @markFunction
  fly(): void {
    // do something
  }
}

function markFunction(target: Plane, key: string) {
  Reflect.defineMetadata('secret', 123, target, key);
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
```

```typescript
class Plane {
  @markFunction('Some additional info!')
  fly(): void {
    // do something
  }
}

function markFunction(info: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', info, target, key);
  };
}
```

- controller pattern

```typescript
@controller
class MyRoute {
  @get('/login')
  login(): void {
    // do something
  }
}

function get(path: string) {
  return function (target: MyRoute, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
}

function controller(target: typeof MyRoute) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);

    router.get(path, target.prototype[key]);
  }
}
```
