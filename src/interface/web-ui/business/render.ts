import * as vscode from 'vscode';

export function getWebviewContent(jsUri: vscode.Uri, cssUri: vscode.Uri) {
  const nonce = getNonce();
  return /* html */ `
  <!DOCTYPE html>
  <html lang="zh">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Security-Policy"
        content="default-src 'none'; img-src ${jsUri.scheme}: https: data:; 
                 style-src ${cssUri} 'unsafe-inline'; 
                 script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${cssUri}" rel="stylesheet">
      <title>表格</title>
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}" src="${jsUri}"></script>
    </body>
  </html>`;
}

function getNonce() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
