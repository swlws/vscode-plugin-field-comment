import * as vscode from 'vscode';
import * as path from 'path';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
};

function getWebviewContent(cat: keyof typeof cats) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
            <img src="${cats[cat]}" width="300" />
        </body>
        </html>
    `;
}

/**
 * 更新webview的内容
 * @param panel
 * @param catName
 */
function updateWebviewForCat(
  panel: vscode.WebviewPanel,
  catName: keyof typeof cats
) {
  panel.title = catName;
  panel.webview.html = getWebviewContent(catName);
}

/**
 * 当webview的视图状态发生变化时触发
 * @param e
 * @returns
 */
function onDidChangeViewState(e: vscode.WebviewPanelOnDidChangeViewStateEvent) {
  const panel = e.webviewPanel;
  switch (panel.viewColumn) {
    case vscode.ViewColumn.One:
      updateWebviewForCat(panel, 'Coding Cat');
      return;

    case vscode.ViewColumn.Two:
      updateWebviewForCat(panel, 'Compiling Cat');
      return;

    case vscode.ViewColumn.Three:
      updateWebviewForCat(panel, 'Testing Cat');
      return;
  }
}

/**
 * 当webview被释放时触发
 */
function onDidDispose() {
  console.log('panel.onDidDispose');
  panel = null;
}

let panel: vscode.WebviewPanel | null;

export function createOrUpdateWebviewPanel(context: vscode.ExtensionContext) {
  // context.extensionPath 指向的绝对路径：d:\OpenSource\field-comment

  // 如果面板已经存在则更新内容
  if (!panel) {
    panel = vscode.window.createWebviewPanel(
      // 只供内部使用，这个webview的标识
      'catCoding',
      // 给用户显示的面板标题
      'Cat Coding',
      // 给新的webview面板一个编辑器视图
      vscode.ViewColumn.One,
      // Webview选项。我们稍后会用上
      {
        // 只允许webview加载我们插件的`media`目录下的资源
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'src', 'media')),
        ],
      }
    );
  }

  // 设置 WebView 的内容
  panel.webview.html = getWebviewContent('Coding Cat');

  // 根据视图状态变动更新内容
  panel.onDidChangeViewState(onDidChangeViewState, null, context.subscriptions);

  // 监听当面板被释放的时候将其销毁
  panel.onDidDispose(onDidDispose, null, context.subscriptions);

  return panel;
}
