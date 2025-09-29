import * as vscode from 'vscode';

import { createOrUpdateWebviewPanel } from './business/index';

/**
 * 注册命令
 * @param context
 */
export function registerCommand(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel | undefined;
  const openPanelCommand = vscode.commands.registerCommand(
    'catCoding.start',
    () => {
      panel = createOrUpdateWebviewPanel(context);
    }
  );
  context.subscriptions.push(openPanelCommand);

  const sendMessageCommand = vscode.commands.registerCommand(
    'catCoding.sendMessage',
    () => {
      if (!panel) {
        return;
      }

      panel.webview.postMessage({
        command: 'message',
        text: 'Hello World!',
      });
    }
  );
  context.subscriptions.push(sendMessageCommand);
}
