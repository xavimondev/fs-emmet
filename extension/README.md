[![demo]](https://github.com/xavimondev/fs-emmet/assets/68721455/e52f0ecf-dd0f-4a16-b2ce-d66f8f01f0e5)

# Create Files & Folders Easily

A extension to create files and folders directly from your editor using Emmet syntax.

## How to use?

Press `ctrl+shift+p` to open command panel and type `Transform to file system` or press **`ctrl+alt+t`** to create new file system. _(you can override this shortcut)_

## Examples

```js
> 'components+services'

// outputs
├──components
└──services

> 'use-debounce.tsx+use-response.tsx'

// outputs
├──use-debounce.tsx
└──use-response.tsx

> '(db+services).ts'

// outputs
├──db.ts
└──services.ts

> 'components/ui>input.vue+divider.vue'

// outputs
├──components
    └──ui
       ├──input.vue
       └──divider.vue

> 'utils>(print+fetch).js'

// outputs
├──utils
     ├──print.js
     └──fetch.js

> 'hooks/ui>(use-mobile+use-responsive).tsx+data>(use-fetch+use-list).tsx'

// outputs
├──hooks
     ├──ui
     │   ├── use-mobile.tsx
     │   └── use-responsive.tsx
     └──data
          ├── use-fetch.tsx
          └── use-list.tsx

> 'pages>landing>(hero+cta).astro'

// outputs
pages
└── landing
    ├── hero.astro
    └── cta.astro

```

## Installation

Open VSCode Editor and Press `ctrl+P`, type `ext install fs-emmet`.

## Changelog

See the [**CHANGELOG**](./CHANGELOG.md).

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/fs-emmet/blob/main/LICENSE) file for details.
