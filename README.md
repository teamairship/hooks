# Airship Custom Hooks

## Usage

In `src` dir:

- `universal` hooks can be used anywhere
- `reactNative` hooks can only be used in ReactNative applications

First install:

```
yarn add @airship/hooks
```

Then use in a file:

```
import hooks from "@airship/hooks";

...

const { data, isLoading, isError } = hooks.useDataFetch(
  fetch('http://example.com/movies.json'),
  { movies: [] },
);
```
