import * as vscode from 'vscode'

import { clearUserInput } from './user-input'

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
      const isFolder = !isFile({ fileName: currentChunk })
      if (!initBatch) {
        if (isFolder) {
          if (isNested) {
            trackingPath += rootPath + currentChunk + '/'
            paths.push(trackingPath)
          } else {
            if (i === 0 && chunks.at(i + 1) === '+') {
              paths.push(currentChunk + '/')
            } else {
              rootPath += currentChunk + '/'
              paths.push(rootPath)
            }
          }
        } else {
          paths.push(rootPath + currentChunk)
        }
      } else {
        if (fileExtension === '') {
          filesInBatch.push(currentChunk)
          continue
        }
        const filesInBatchMapped = filesInBatch.map((file) => {
          return `${rootPath}${file}${fileExtension}`
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

export const initCreationPaths = ({ paths }: { paths: string[] }) => {
  createMultiplePaths({ paths })
}

const isFile = ({ fileName }: { fileName: string }) => fileName.includes('.')

const createFileOrFolder = ({ fileName }: { fileName: string }) => {
  const isValidFile = isFile({ fileName })
  const wsPath = (vscode.workspace.workspaceFolders as vscode.WorkspaceFolder[])[0].uri.fsPath

  const fullPath = vscode.Uri.joinPath(vscode.Uri.file(wsPath), fileName)

  if (isValidFile) {
    vscode.workspace.fs.writeFile(fullPath, Buffer.from(''))
  } else {
    vscode.workspace.fs.createDirectory(fullPath)
  }
  // vscode.window.showInformationMessage(fullPath.toString());
}

const createMultiplePaths = ({ paths }: { paths: string[] }) => {
  try {
    paths.forEach((fileName) => {
      createFileOrFolder({ fileName })
    })

    vscode.window.showInformationMessage('FileSystem created successfully')
  } catch (error) {
    vscode.window.showErrorMessage('Something went wrong! Please report on GitHub')
  }

  setTimeout(() => {
    clearUserInput({ editor: vscode.window.activeTextEditor })
  }, 1500)
}
