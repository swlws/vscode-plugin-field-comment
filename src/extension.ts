import * as vscode from 'vscode';
import { install as installFieldComment } from './interface/field-comment/index';
import { install as installWebview } from './interface/webview/index';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "field-comment" is now active!');

  // 字段注释
  installFieldComment(context);

  // webview
  installWebview(context);
}

export function deactivate() {}
