# SyntheticEvent

> wrapper for native browser events for consistent behavior across various browsers

- event handlers in React are passed as instances of `SyntheticEvent`
- `nativeEvent` attribute for accessing underlying browser event

## Performance

> every `SyntheticEvent` wrapper instance needs to be GC'ed eventually.

### Synthetic Instance Pool (Event Pooling)

> **React v17 - event pooling removed**<br/>can read the event fields whenever needed

- whenever an event is triggered, it takes an `SyntheticEvent` instance from the pool and reuse it
- after event handler has run, all properties will be nullified and the instance will be released back into the pool
- properties of the event pool only exist while the callback is active

### `event.persist`

> **React v17 - event pooling removed**<br/>`event.persist` does not do anything

- event pooling (nullifying & releasing instances for reuse) prevents accessing the event in an asynchronous way
- `event.persist()` will remove the synthetic event from the pool and allow _references_ to the event
