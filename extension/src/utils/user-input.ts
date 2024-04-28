import * as vscode from 'vscode'

import { extractExpression } from './extract-expression'

export const getUserInput = ({ editor }: { editor: vscode.TextEditor | undefined }) => {
  let userInput = undefined
  if (editor) {
    const cursorPosition = editor.selection.active // a vscode.Position
    // for text on line up to cursor
    const lineText = editor.document.lineAt(cursorPosition.line).text
    userInput = lineText.substring(0, cursorPosition.character).trim()
  }

  if (userInput && userInput.length > 0) {
    userInput = extractExpression({ input: userInput })
  }
  return userInput
}

export const clearUserInput = ({ editor }: { editor: vscode.TextEditor | undefined }) => {
  if (!editor) {
    return
  }

  const cursorPosition = editor.selection.active // a vscode.Position
  const rangeToDelete = new vscode.Range(
    new vscode.Position(cursorPosition.line, 0),
    new vscode.Position(cursorPosition.line, cursorPosition.character)
  )

  editor.edit((selectedText) => selectedText.delete(rangeToDelete))
}