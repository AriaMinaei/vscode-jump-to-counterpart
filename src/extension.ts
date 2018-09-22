'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as fs from 'fs'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file

  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'jumpToCounterpart.jump',
    () => {
      const originalFilePath = vscode.window.activeTextEditor.document.fileName
      const pairs = vscode.workspace
        .getConfiguration()
        .get('jumpToCounterpart.pairs')

      if (Object.keys(pairs).length === 0) {
        vscode.window.showErrorMessage(
          `vscode-jump-to-counterpart: Configuration 'jumpToCounterpart.pairs' is empty.` +
            ` Open this extension's readme to learn how to configure it.`,
        )
      }

      let leftExtension: string
      let rightExtension: string
      for (const from of Object.keys(pairs)) {
        const to = pairs[from]
        if (originalFilePath.endsWith(from)) {
          leftExtension = from
          rightExtension = to
          break
        } else if (originalFilePath.endsWith(to)) {
          leftExtension = to
          rightExtension = from
          break
        }
      }

      if (!leftExtension || !rightExtension) {
        return
      }

      const filePathWithoutExtension = originalFilePath.substr(
        0,
        originalFilePath.length - leftExtension.length,
      )

      const counterpartPath = filePathWithoutExtension + rightExtension

      if (!fs.existsSync(counterpartPath)) {
        fs.writeFileSync(counterpartPath, '', 'utf-8')
      }
      show(counterpartPath)
    },
  )

  context.subscriptions.push(disposable)

  function show(otherFilePath: any) {
    vscode.workspace.openTextDocument(otherFilePath).then(doc => {
      vscode.window.showTextDocument(doc)
    })
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
