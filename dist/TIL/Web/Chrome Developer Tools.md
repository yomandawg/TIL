# Chrome Developer Tools

### Tips

- `location`
  - `location.search` for query strings
- with `debugger`@node.js via `chrome://inspect/#devices`

### Source maps

> Settings(cog) &rarr; General &rarr; Enable JS source maps & Enable CSS source maps

- `//# sourceMappingURL=/path/to/script.js.map` @ the end of compressed file
- `X-SourceMap: /path/to/script.js.map` HTTP header
- bundler generation (webpack development mode)
