# HTTP Caching

```python
if reusable response:
  if revalidate each time:
    # revalidate with the server before using cached data
    set 'Cache-Control: no-cache'
  else:
    if cacheable by intermediate caches:
      # response cached by browser and intermediary (e.g. proxy)
      set 'Cache-Control: public'
    else:
      # response cached by the browser only
      set 'Cache-Control: private'

    # 600 for 10 minutes / 31536000 for a full year
    set f'Cache-Control: max-age=${maximum cache lifetime}'

    # identifer for a specific version of a resource
    set f'Etag: ${etag value}'
else:
  # response not allowed to be cached; must fetch on every request
  set 'Cache-Control: no-store'
```

### Etag vs. Last-Modified

- sematntic difference
- `Etag`: checksum
- `Last-Modified`: _interpretable by clients_
  - behavior control on client-side
  - i.e. the client checks the Last-Modified stamp to decide whether to re-fetch or not
- if the page changes frequently &rarr; `Last-Modified`
