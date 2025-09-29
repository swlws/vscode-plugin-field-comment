import * as vscode from 'vscode';

import { createOrUpdateWebviewPanel } from './business/index';

/**
 * 注册命令
 * @param context
 */
export function registerCommand(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('catCoding.start', () => {
    const panel = createOrUpdateWebviewPanel(context);
  });

  context.subscriptions.push(command);
}
