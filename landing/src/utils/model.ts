export const factoryPaths = ({ expression }: { expression: string }) => {
  const regex = /([^\+>()]+|\+|>|[()])/g
  const chunks = expression.match(regex) || []
  const symbols = ['+', '>', '(', ')']
  if (chunks.length === 0) {
    return
  }

  let trackingPath = ''
  let rootPath = ''
  let isNested = false
  let initBatch = false
  const paths = []
  const filesInBatch = []
  let fileExtension = ''

  for (let i = 0; i < chunks.length; i++) {
    const currentChunk = chunks.at(i)
    if (!currentChunk) {
      return
    }

    const isSymbol = symbols.includes(currentChunk)

    if (currentChunk.includes('.') && chunks.at(i - 1) === ')') {
      fileExtension = currentChunk
    }
    if (isSymbol) {
      if (currentChunk === '>') {
        isNested = true
      } else if (currentChunk === '+' && !initBatch) {
        isNested = false
        trackingPath = ''
      } else if (currentChunk === '(') {
        initBatch = true
      }
    } else {
      const isFolder = !isFile({ resource: currentChunk })
      if (!initBatch) {
        if (isFolder) {
          if (isNested) {
            trackingPath += rootPath + currentChunk + '/'
            paths.push({ path: trackingPath })
          } else {
            if (i === 0 && chunks.at(i + 1) === '+') {
              paths.push({ path: currentChunk + '/' })
            } else {
              rootPath += currentChunk + '/'
              paths.push({ path: rootPath })
            }
          }
        } else {
          paths.push({ path: rootPath + currentChunk })
        }
      } else {
        if (fileExtension === '') {
          filesInBatch.push(currentChunk)
          continue
        }
        const filesInBatchMapped = filesInBatch.map((file) => {
          return { path: `${rootPath}${file}${fileExtension}` }
        })
        paths.push(...filesInBatchMapped)
        initBatch = false
        fileExtension = ''
        filesInBatch.length = 0
      }
    }
  }
  return paths
}

const isFile = ({ resource }: { resource: string }) => resource.includes('.')
