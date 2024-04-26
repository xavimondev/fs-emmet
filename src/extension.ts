import * as vscode from "vscode";
import { getUserInput } from "./utils/user-input";
import { factoryPaths, initCreationPaths } from "./utils/model";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("memfs.addFile", (_) => {
      const editor = vscode.window.activeTextEditor;
      const expression = getUserInput({ editor });
      if (!expression) {
        return;
      }
      const paths = factoryPaths({ expression });
      if (paths && paths.length > 0) {
        initCreationPaths({
          paths,
        });
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
