type Tree = {
  path: string
}

type TreeFormatted = {
  file: string
  children?: TreeFormatted[]
}

const treeExample = [
  {
    path: 'src'
  },
  {
    path: 'src/components'
  },
  {
    path: 'src/components/users'
  },
  {
    path: 'src/components/users/data.ts'
  },
  {
    path: 'src/components/users/table.tsx'
  },
  {
    path: 'src/components/ai.tsx'
  },
  {
    path: 'src/components/combobox-badges.tsx'
  },
  {
    path: 'editor'
  },
  {
    path: 'editor/bubble-menu'
  },
  {
    path: 'editor/bubble-menu/editor-bubble-item.tsx'
  },
  {
    path: 'README.md'
  }
]

const buildTreeStructure = ({ path, parent }: { path: string; parent: any }) => {
  const pathParts = path.split('/') // [components]
  const segmentString = pathParts[0] // components

  // {file: 'components'}
  let node = parent.find((item: any) => item.file === segmentString)

  if (!node) {
    node = { file: segmentString } // {file: 'components'}
    parent.push(node) // [{file: 'components'}]
  }
  // If there's one segment or file. Ex: ['README.md']
  if (pathParts.length === 1) return

  // Otherwise, add children property to store its directory
  if (!node.children) {
    node.children = [] //{file: app, children: []}
  }
  buildTreeStructure({ path: pathParts.slice(1).join('/'), parent: node.children })
}

export const generateDirectoryTree = () => {
  const treeFormatted: TreeFormatted[] = []

  treeExample.forEach((item: Tree) => {
    buildTreeStructure({ path: item.path, parent: treeFormatted })
  })

  return treeFormatted
}
