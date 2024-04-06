import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // context.subscriptions.push(
  //   vscode.commands.registerCommand("folder-emmet.helloWorld", (_) => {
  //     vscode.window.showInformationMessage("Say hello to my extension!");
  //   })
  // );

  context.subscriptions.push(
    vscode.commands.registerCommand("memfs.addFile", (_) => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const cursorPosition = editor.selection.active; // a vscode.Position
        console.log({ cursorPosition });
        // for text on line up to cursor
        const lineText = editor.document.lineAt(cursorPosition.line).text;
        const textBeforeCursor = lineText.substring(
          0,
          cursorPosition.character
        );
        console.log({ textBeforeCursor });
        vscode.window.showInformationMessage(textBeforeCursor);
        // for text in the file up to cursor
        // const fileTextToCursor = editor.document.getText(
        //   new vscode.Range(0, 0, cursorPosition.line, cursorPosition.character)
        // );
        // console.log({ textBeforeCursor });
      }

      const fileName = "file.text";
      const wsEdit = new vscode.WorkspaceEdit();
      const wsPath = (
        vscode.workspace.workspaceFolders as vscode.WorkspaceFolder[]
      )[0].uri.fsPath;
      const filePath = vscode.Uri.file(wsPath + "/" + fileName);
      vscode.window.showInformationMessage(filePath.toString());
      wsEdit.createFile(filePath, { ignoreIfExists: true });
      wsEdit.insert(filePath, new vscode.Position(0, 0), "This so cool");
      vscode.workspace.applyEdit(wsEdit);
      vscode.window.showInformationMessage("created a new file:" + fileName);
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
