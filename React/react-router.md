# react-router

## react-router-dom
> `npm install --save react-router-dom`\
> navigtaion for dom-based browser web apps
```javascript
const Index = () => {
  return <div>Index Page</div>;
};

const Main = () => {
  return <div>Main Page</div>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/main" exact component={Main} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```