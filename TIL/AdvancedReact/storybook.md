# Storybook

- development environment and playground for UI components
- showcase components in an isolated environment without business logic

* simple way to initialize Storybook (works well with CRA)

```bash
npx sb init
```

## Structure

- `.storybook/`
  - `main.js` - configuration for Storybook
  - `preview.js` - configuration for the stories
- `src/stories/`
  - `Introduction.stories.mdx` - landing page of Storybook
    - `npm run storybook`
  - `[Component].stories.js` - story for the corresponding component
    - `[Component].js` - the component
    - `[Component].css` - css for the component

## \*.stories.js

- `Button.stories.js` example

```js
import { Button } from './Button'; // the component

// default export
export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

// named exports - single visual state of the component (story)
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
...
```

## Storybook App

```bash
npm run storybook
```

- landing page (`Introduction.stories.mdx`)
  - resources and configurations
- side-menu
  - created stories (customizable with _named exports_)
    - visual states of the component

### Story composition

- `[Component].stories.js` - stories, or states of the component
- `[Component].js` - the component
- `[Component].css` - style of the component

#### `components/Button/` example

- `Button.js`

```js
import './Button.css';

function Button(props) {
  const { variant = 'primary', children, ...rest } = props;
  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
```

- `Button.css`

```css
.button {
  /* component style */
}

.primary {
  /* variant */
}
.secondary {
  /* variant */
}
.success {
  /* variant */
}
.danger {
  /* variant */
}
```

- `Button.stories.js`

```js
import Button from './Button';

// meta-data for the component
export default {
  title: '[hierarchy]/[classification]/Button', // unique name for the project
  component: Button,
};

// stories (state of the component)
export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Success = () => <Button variant="success">Success</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;

Primary.storyName = 'custom story name';
```

## Creating Stories

### template args example

```js
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // overwrites the component level args
  variant: 'primary',
  children: 'Primary Args',
};

// reusability and extendibility with object destructuring
export const LongPrimaryA = Template.bind({});
LongPrimaryA.args = {
  ...PrimaryA.args,
  children: 'Long Primary Args',
};
```

#### component level args

```js
// Button.stories.js
export default {
  title: 'Form/Button',
  component: Button,
  args: {
    // default args here
    children: 'default text',
  },
};
```

## configuration

#### sorting stories

```js
// .storybook/preview.js
export const parameters = {
  options: {
    storySort: sortFunc,
  },
};
```

## decorators

```js
export const Button = () => (
  <Center>
    <Button />
  </Center>
);
```

- using decorators

```js
// [component].stories.js
export default {
  ...
  decorators: [(story) => <Center>{story()}</Center>]
}
```

- apply to all components

```js
// .storybook/preview.js
import React from 'react';
import { addDecorator } from '@storybook/react';
import Center from '../src/components/Center/Center';

addDecorator((story) => <Center>{story()}</Center>);
```

- apply theming

```js
// .storybook/preview.js
import { ThemeProvider, theme, CSSReset, Box } from '@chakra-ui/core';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box m="4">
        <Story />
      </Box>
    </ThemeProvider>
  ),
];
```

- using a ui library

```js
import { Button } from '@chakra-ui/core';

export default {
  title: 'Chakra/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Success = Template.bind({});
Success.args = {
  variantColor: 'green',
  children: 'Success',
};
```

## Addons

### Controls

```js
// [component].stories.js
export default {
  // ...
  argTypes: {
    // arg you want to control: { control: 'text' }
    exampleVariant: { control: 'text' },
  },
};
```

### Actions

- display data received by event handlers in components

```js
// [component].stories.js
export default {
  // ...
  argTypes: {
    // action name: { action: 'custom log' }
    onClick: { action: 'clicked' },
  },
};
```

```js
import { action, actions } from '@storybook/addon-actions';

// log an action
const Template = (args) => (
  <Button onClick={action('log this comment')} {...args} />
);

// log actions
const Template = (args) => (
  <Button {...action('onClick', 'onMouseOver')} {...args} />
);
```

### Console

```js
// .storybook/preview.js
import '@storybook/addon-console'; // console.log on actions
import { withConsole } from '@storybook/addon-console'; // console.log with the Story

export const decorators = [(Story, context) => withConsole()(Story)(context)];
```

### Knobs

```js
// .storybook/main.js
module.exports = {
  addons: ['@storybook/addon-knobs'],
};
```

```js
// .storybook/preview.js
import { withKnobs } from '@storybook/addon-knobs';
export const decorators = [withKnobs];
```

```js
// Button.stories.js
// knob(prop name, initial value)
export const KnobsButton = () => (
  <Button disabled={boolean('Disabled', false)}>
    {text('Label', 'Button Label')}
  </Button>
);
```

### Viewport

```js
// .storybook/preview.js
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
```

### a11y (accessibility)

```js
// .storybook/preview.js
import { withA11y } from '@storybook/addon-a11y';
export const decorators = [withA11y];
```

## Environment Settings

### scripts

```json
"scripts": {
  "storybook": "set VARIABLE=1 && start-storybook -p 6006 -s public",
}
```

- `process.env.VARIABLE === '1'`
