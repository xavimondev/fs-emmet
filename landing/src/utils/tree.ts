type Tree = {
  path: string
}

export type TreeFormatted = {
  file: string
  children?: TreeFormatted[]
}

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

export const generateDirectoryTree = ({ tree }: { tree: { path: string }[] | undefined }) => {
  if (!tree) return

  const treeFormatted: TreeFormatted[] = []

  tree.forEach((item: Tree) => {
    buildTreeStructure({ path: item.path, parent: treeFormatted })
  })

  return treeFormatted
}
