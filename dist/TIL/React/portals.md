# React Portals

> a need for another root-level component to overcome **stacking context** of _CSS_

## Modal

```javascript
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={
        () =>
          history.push(
            '/'
          ) /* redirect if clicked outside of the modal, *used custom `history` */
      }
      className="ui dimmer modals visible active"
    >
      <div
        onClick={
          (e) => e.stopPropagation() /* stop the event from bubbling up */
        }
        className="ui standard modal visible active"
      >
        <div className="header">Delete Stream</div>
        <div className="content">
          Are you sure you want to delete this stream?
        </div>
        <div className="actions">
          <button className="ui button primary">Delete</button>
          <button className="ui button">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};
```

## SSR
