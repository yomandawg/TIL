# [TypeScript](https://www.typescriptlang.org/)

> JavaScript that scales.

- [Offical Example](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

* Compiling and executing the code

  - `tsc greeter.ts`

* Type annotations

```typescript
function greeter(person: string) {
  // function accepts string type parameter
  return 'Hello, ' + person;
}

let user = [0, 1, 2];

// will throw an error that states "not assignable to parameter type 'string'"
document.body.textContent = greeter(user);
```

- Interfaces

```typescript
interface Student {
  name: string;
  enrolled: boolean;
  enroll();
}

function greeter(student: Student) {
  return 'Hello, ' + student.name + 'student.enrolled' + student.enroll();
}
```

- Classes

```typescript
class Student {
  fullName: string;
  // the use of `public` is a shorthand to automatically create properties with that name
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

interface Person {
  isAcceptable(s: string): boolean;
}

class Student2 implements Person {
  // ...
}
```

## TSOA

> TypeScript OpenAPI\
> generate OpenAPI-compatible REST endpoints

### Swagger

> API documentation and design tools ~= similar to Django REST Framework

- `mkdir -p api && mkdir -p api/dist`
- `npx tsoa swagger` - create a swagger mount with docker
