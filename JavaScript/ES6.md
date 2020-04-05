# ES6



## Arrow Function
* Parameters
```javascript
// no parameters
var foo = () => return 'bar';
foo(); // bar

// one parameter
var foo = x => return x;
foo('bar'); // bar

// many parameters
var foo = (a, b) => return a + b;
foo(1, 2); // 3
```

* With Callbacks
```javascript
var numbers = [1, 2, 3];
var oddNumbers = numbers.filter(x => x % 2) // [1, 3]
```

* `this`
```javascript
let foo = {
    bar: "yo",
    bas: function() {
        setTimeout(() => {
            console.log(this.yo);
        }, 1000);
    }
}
foo.yo(); // 1000ms 후 "yo"
```