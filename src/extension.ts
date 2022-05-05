import { log } from "console";
import path = require("path");
import * as vscode from "vscode";
import { generateCode } from "./utils/code-generator";
import { writeFile } from "./utils/file-writer";
import { parseModuleInformation } from "./utils/parser";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "angular-auto-dependency-mock.generateCode",
    async () => {
      const file = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectMany: false,
        defaultUri: vscode.window.activeTextEditor?.document.uri,
        filters: { TypeScript: ["ts"] },
        title: "Please open the file that you want to test.",
      });
      let testFilePath;
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
        },
        async (progress) => {
          try {
            progress.report({ message: "Generating code" });
            const filePath = file[0].fsPath;
            const testFilePath = writeFile(filePath, generateCode(filePath));
            const newDoc = await vscode.workspace.openTextDocument(
              vscode.Uri.file(testFilePath)
            );
            await vscode.window.showTextDocument(newDoc);
            await vscode.commands.executeCommand(
              "editor.action.formatDocument"
            );
            // Wait 10 seconds for editor to check for mistakes
            await new Promise((resolve) => setTimeout(resolve, 10000));
            await vscode.commands.executeCommand("editor.action.sourceAction", {
              kind: "source.addMissingImports",
              apply: "first",
            });
            progress.report({ message: "Finished" });
          } catch (err: any) {
            await vscode.window.showErrorMessage(err);
          }
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
