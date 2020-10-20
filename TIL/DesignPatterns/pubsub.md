# PubSub

```js
function PubSub() {
  this.subscriptions = {};
}

PubSub.prototype.subscribe = function (message, subscriber) {
  this.subscriptions[message]
    ? this.subscriptions[message].push(subscriber)
    : (this.subscriptions[message] = [subscriber]);
};

PubSub.prototype.unsubscribe = function (message, subscriber) {
  if (this.subscriptions[message]) {
    this.subscriptions[message].filter((candidate) => {
      candidate !== subscriber;
    });
  }
};

PubSub.prototype.publish = function (message, callback) {
  if (this.subscriptions[message]) {
    callback(); // TODO: check this.subscription[message].length
    this.subscriptions[message].forEach((subscriber) => subscriber());
  }
};
```

- example usage with custom Vue component

```js
const Vue = function (options) {
  this.el = document.querySelector(options.selector);
  this.data = options.data;
  this.ref = null;
  this.template = options.template;
  this.pubsub = new PubSub();
  this.pubsub.subscribe('dataChange', this.render.bind(this)); // render on prop change
};

Vue.prototype.render = function () {
  if (this.ref !== JSON.stringify(this.data) /* conditional re-rendering */) {
    console.log('rendering!');
    this.el.innerHTML = this.template(this.data);
    this.ref = JSON.stringify(this.data);
  }
};
```

```js
const TodosComponent = new Vue({
  selector: '.todos',
  data: {
    header: 'My Todos',
    todos: ['swim', 'climb'],
  },
  template: (props) => {
    return `
      <h1>${props.header}</h1>
      <ul>
        ${props.todos.map((todo) => `<li>${todo}</li>`).join('')}
      </ul>
    `;
  },
});

TodosComponent.pubsub.publish(
  'dataChange',
  () => (TodosComponent.data.header = 'Complete Todos')
);
```
