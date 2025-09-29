import * as vscode from 'vscode';
import { registerCommand } from './field-comment/command';
import { updateDecorations } from './field-comment/index';
import { addEventListener } from './field-comment/event';

import { install } from './webview';

export function mount() {
  updateDecorations();
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "field-comment" is now active!');
  registerCommand(context, updateDecorations);
  addEventListener(context, updateDecorations);

  install(context);
}

export function deactivate() {}
