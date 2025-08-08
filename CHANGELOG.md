## 3.1.0

- feat: add `keepAfterSesolutionOrRejection` option to `toast.promise()`.

## 3.0.0

### Breaking

- fix: [#1](https://github.com/kbrgl/svelte-french-toast/issues/1) by adding `svelte-hot-french-toast__` prefix to all classes.

## 2.0.0

### Breaking

- Rename `useToasterStore` to `useToasterState`.

### Features

- Add Warning and Info Toasts. https://github.com/kbrgl/svelte-french-toast/issues/92.

### Fixes

- When toast content height changes, change toast height accordingly. https://github.com/kbrgl/svelte-french-toast/pull/75.

## 1.0.0

Migration from [Svelte French Toast](https://github.com/kbrgl/svelte-french-toast):

- [breaking]: Svelte 5 only.
- [breaking]: Uses runes instead of stores.
- [breaking]: `className` prop renamed to `class`.
- [breaking]: `containerClassName` prop renamed to `containerClass`.
- [breaking]: Rename `startPause` to `pause` and `endPause` to `resume`.
- [breaking]: Removed non-logical positions:
    - `"top-left"`
    - `"top-right"`
    - `"bottom-left"`
    - `"bottom-right"`
- [breaking]: Converted `interface` to `type`.
- [breaking]: Possibly some other breaking changes.
