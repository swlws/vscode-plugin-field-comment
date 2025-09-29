import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from './render';

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
      'reactUI',
      // 给用户显示的面板标题
      'React UI',
      // 给新的webview面板一个编辑器视图
      vscode.ViewColumn.One,
      // Webview选项。我们稍后会用上
      {
        // 只允许webview加载我们插件的`media`目录下的资源。网络资源将被阻止。
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, 'ui', 'react-playground', 'dist')
          ),
        ],
        // 在webview中启用脚本
        enableScripts: true,
        // 保留webview内容，即使webview被隐藏
        retainContextWhenHidden: true,
      }
    );
  }

  const scriptUri = panel.webview.asWebviewUri(
    vscode.Uri.file(
      path.join(
        context.extensionPath,
        'ui',
        'react-playground',
        'dist',
        'webview.js'
      )
    )
  );
  const styleUri = panel.webview.asWebviewUri(
    vscode.Uri.file(
      path.join(
        context.extensionPath,
        'ui',
        'react-playground',
        'dist',
        'webview.css'
      )
    )
  );

  // 设置 WebView 的内容
  panel.webview.html = getWebviewContent(scriptUri, styleUri);

  // 监听当面板被释放的时候将其销毁
  panel.onDidDispose(onDidDispose, null, context.subscriptions);

  return panel;
}
