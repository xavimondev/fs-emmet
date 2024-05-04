[![demo]](https://github.com/xavimondev/fs-emmet/assets/68721455/e52f0ecf-dd0f-4a16-b2ce-d66f8f01f0e5)


## Introduction

A extension to create files and folders directly from your editor using Emmet syntax.

## How to use?

Press `ctrl+shift+p` to open command panel and type `Transform to file system` or press **`ctrl+alt+t`** to create new file system. _(you can override this shortcut)_

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
