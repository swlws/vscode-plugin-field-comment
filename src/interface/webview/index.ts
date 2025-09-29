import * as vscode from 'vscode';
import { registerCommand } from './command';

export function install(context: vscode.ExtensionContext) {
  registerCommand(context);
}
