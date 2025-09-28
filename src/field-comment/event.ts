import * as vscode from 'vscode';

export function addEventListener(
  context: vscode.ExtensionContext,
  callback: () => void
) {
  vscode.window.onDidChangeActiveTextEditor(
    () => {
      callback();
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        callback();
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (
        event.affectsConfiguration('fieldComment.enabled') ||
        event.affectsConfiguration('fieldComment.defaultComment')
      ) {
        callback();
      }
    },
    null,
    context.subscriptions
  );
}
