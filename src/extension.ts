import * as vscode from 'vscode';
import { install as installFieldComment } from './interface/field-comment/index';
import { install as installWebview } from './interface/webview/index';
import { install as installWebUi } from './interface/web-ui/index';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "field-comment" is now active!');

  // 字段注释
  installFieldComment(context);

  // webview
  installWebview(context);

  // web-ui
  installWebUi(context);
}

export function deactivate() {}
