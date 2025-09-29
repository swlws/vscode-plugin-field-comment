import * as vscode from 'vscode';
import { install as installFieldComment } from './field-comment/index';
import { install as installWebview } from './webview';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "field-comment" is now active!');

  installFieldComment(context);
  installWebview(context);
}

export function deactivate() {}
