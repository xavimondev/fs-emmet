import { factoryPaths, initCreationPaths } from '@/model'
import * as vscode from 'vscode'

import { getUserInput } from '@/utils/user-input'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('FSEmmet.createFileSystem', () => {
      const editor = vscode.window.activeTextEditor
      const expression = getUserInput({ editor })
      if (!expression) {
        return
      }
      const paths = factoryPaths({ expression })
      if (paths && paths.length > 0) {
        initCreationPaths({
          paths
        })
      }
    })
  )
}

// This method is called when your extension is deactivated
export function deactivate() {}
