import * as vscode from 'vscode';
import { registerCommand } from './field-comment/command';
import { updateDecorations } from './field-comment/index';
import { addEventListener } from './field-comment/event';

export function mount() {
  updateDecorations();
}

export function activate(context: vscode.ExtensionContext) {
  registerCommand(context, updateDecorations);
  addEventListener(context, updateDecorations);
}

export function deactivate() {}
