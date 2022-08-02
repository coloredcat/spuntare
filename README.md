![alt text](https://github.com/coloredcat/spuntare/blob/main/animation.gif)

# Spuntare

Spuntare is a modal controller for React. It is a simple, easy-to-use, and powerful component for creating stacks of modals that can interact and communicate with each other.

## Features

- Just a wrapper component, works with any existing modal
- Optional enter and exit animations with Framer Motion
- Single config source, instantiate modals with a hook any time you need

## How to use

```
yarn add @ironeko/spuntare
```

Then wrap your app in the context provider:

```jsx
import { SpuntareContextProvider } from '@ironeko/spuntare';

<SpuntareContextProvider>{/* Your app here */}</SpuntareContextProvider>;
```

Pass however many different types of modals you want to use to your configuration.

```jsx
import { SpuntareContextProvider } from '@ironeko/spuntare';

<SpuntareContextProvider
  config={{
    modal: {
      component: Modal,
    },
    overlay: {
      component: Overlay,
    },
  }}
>
  {/* Your app here */}
</SpuntareContextProvider>;
```

Then, somewhere else in your app you can instantiate a modal:

```jsx
import { useSpuntare } from '@ironeko/spuntare';

const App = () => {
  const { create, removeLast } = useSpuntare();
  return (
    <Button
      onClick={() =>
        create('modal', {
          title: 'Woah',
          description: <p>Your first modal!</p>,
          closeProps: {
            onClick: () => removeLast(),
          },
        })
      }
    >
      Open modal
    </Button>
  );
};
```

The first argument to `create` is the name you assigned to your modal type in `config`, the second is whatever props your modal needs. It's not typechecked since we don't know what props your modal takes, so be careful!

Spuntare will also pass its own props to your modal, these can be used to apply styles depending on the modal state. Check the examples for more info.
