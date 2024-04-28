## Introduction

A extension to create files and folders directly from your editor using Emmet syntax.

## How to use?

1. Keyboard Shortcut: **`ctrl+shift+t`** to create new file system. _(you can override these shortcuts)_

2. Press `ctrl+shift+p` to open command panel and type `Transform to file system`.

## Roadmap

[ ] Add landing page.

[ ] Add support for frameworks routing conventions, examples:

```js
// svelte
src/routes/about/+page.svelte
blog/[slug]/+page.svelte

// remix
routes/_auth.login.tsx
routes/($lang)._index.tsx

// next.js
(marketing)/about/page.js
app/blog/[slug]/page.tsx
app/shop/[...slug]/page.js
app/@auth/[...catchAll]/page.tsx
feed/@modal/(..)photo/[id]/page.js

// and more ...
```

[ ] Add climb-up operator to folders.

## Contributors

<a href="https://github.com/xavimondev/fs-emmet/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xavimondev/fs-emmet" />
</a>

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/fs-emmet/blob/main/LICENSE) file for details.