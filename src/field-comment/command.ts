import * as vscode from 'vscode';
import state from './state';

export function registerCommand(
  context: vscode.ExtensionContext,
  callback: () => void
) {
  const map: Record<string, () => void> = {
    'fieldComment.enable': () => {
      vscode.window.showInformationMessage('enable field comment!');
      state.setState(true);
      callback();
    },
    'fieldComment.disable': () => {
      vscode.window.showInformationMessage('disable field comment!');
      state.setState(false);
      callback();
    },
    'fieldComment.toggle': () => {
      vscode.window.showInformationMessage('toggle field comment!');
      state.setState(!state.getState());
      callback();
    },
  };
  for (const key in map) {
    const command = vscode.commands.registerCommand(key, map[key]);
    context.subscriptions.push(command);
  }
}
