import { join } from 'node:path'
import { glob } from 'fast-glob'
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
      const isFolder = !isFile({ resource: currentChunk })
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

const isFile = ({ resource }: { resource: string }) => resource.includes('.')

const transformToFileSystem = async ({ filePath }: { filePath: string }) => {
  const isValidFile = isFile({ resource: filePath })
  const wsPath = (vscode.workspace.workspaceFolders as vscode.WorkspaceFolder[])[0].uri.fsPath
  const fullPath = vscode.Uri.joinPath(vscode.Uri.file(wsPath), `**/${filePath}`)
  const result = await glob(fullPath.fsPath, {
    onlyDirectories: !isValidFile
  })
  const pathFound = result.at(0)

  if (pathFound) return

  const data = await matchPartialDirectory({ cwd: wsPath, pathString: filePath })
  if (!data) {
    const newPathUri = vscode.Uri.joinPath(vscode.Uri.file(wsPath), filePath)
    createFileOrFolder({ uri: newPathUri, isFile: isValidFile })
    return
  }

  // This when user's input match of the part of full wd
  const { partialPath, rest } = data
  const fullNewPathUri = vscode.Uri.joinPath(vscode.Uri.file(partialPath), rest)
  createFileOrFolder({ uri: fullNewPathUri, isFile: isValidFile })
}

const createMultiplePaths = ({ paths }: { paths: string[] }) => {
  try {
    paths.forEach((filePath) => {
      transformToFileSystem({ filePath })
    })

    vscode.window.showInformationMessage('FileSystem created successfully')
  } catch (error) {
    vscode.window.showErrorMessage('Something went wrong! Please report on GitHub')
  }

  setTimeout(() => {
    clearUserInput({ editor: vscode.window.activeTextEditor })
  }, 1500)
}

const createFileOrFolder = ({ uri, isFile }: { uri: vscode.Uri; isFile: boolean }) => {
  if (isFile) {
    vscode.workspace.fs.writeFile(uri, Buffer.from(''))
  } else {
    vscode.workspace.fs.createDirectory(uri)
  }
}

const matchPartialDirectory = async ({ cwd, pathString }: { cwd: string; pathString: string }) => {
  const parts = pathString.split('/')
  let pathMatch = ''
  let partialPath = ''
  let posPartialFound = 0
  for (let i = 0; i < parts.length; i++) {
    const part = parts.at(i) as string
    pathMatch = join(pathMatch, part)
    const search = join(cwd, `**/${pathMatch}`)
    const result = await glob(search, {
      onlyDirectories: true
    })

    if (!result.at(0)) break

    partialPath = result.at(0) ?? ''
    posPartialFound = i
  }

  if (partialPath === '') return

  const rest = parts.slice(posPartialFound == 0 ? posPartialFound + 1 : posPartialFound).join('/')
  return {
    partialPath,
    rest
  }
}
