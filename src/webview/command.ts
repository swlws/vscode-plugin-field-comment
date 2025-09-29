import * as vscode from 'vscode';

export function registerCommand(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // 创建并显示新的webview
      const panel = vscode.window.createWebviewPanel(
        'catCoding', // 只供内部使用，这个webview的标识
        'Cat Coding', // 给用户显示的面板标题
        vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
        {} // Webview选项。我们稍后会用上
      );
    })
  );
}
