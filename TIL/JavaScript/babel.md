# Babel

> Use next generation JavaScript, today.

```bash
npm init # 'package.json'
npm install @babel/core @babel/cli --save-dev
npm install @babel/preset-env --save-dev # set of plug-ins to support latest JS features

touch .babelrc # a Babel config file; register the `preset`
```

```bash
node_modules/.bin/babel src/index.js -o dist/assets/bundle.js

# @package.json for shortcut cmd
# "scripts": {
#    "babel" : "node_modules/.bin/babel src/index.js -o dist/# # assets/bundle.js"
# }
# `npm run babel` to use

# @for enabling 'watch'
# "scripts": {
#    "babel" : "node_modules/.bin/babel src/index.js -w -o dist/# # assets/bundle.js"
# }
```
