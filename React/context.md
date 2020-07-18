# Context System
> *React v16.3.0*\
* communicate from parent component to any nested arbitrary component
* not to replace *redux*; only to make ease of communicating information

### vs. Props System
* passing down `props` exists in a hierarchy
```javascript
class Parent extends Component {
  render() {
    return <div><Child myProp={'my property'} /></div>;
  }
}
const Child = props => <div>{props.myProp}</div>
```