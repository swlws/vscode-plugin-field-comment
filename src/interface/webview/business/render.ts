import { cats } from './constant';

export function getWebviewContent(cat: keyof typeof cats) {
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
            <p id="message"></p>
            <script>
                    const messageEle = document.getElementById('message');
                    // Handle the message inside the webview
                    window.addEventListener('message', event => {

                        const message = event.data; // The JSON data our extension sent

                        switch (message.command) {
                            case 'message':
                                messageEle.textContent = message.text;
                                break;
                        }
                    });

                    (function() {
                        const vscode = acquireVsCodeApi();

                        let count = 0;
                        setInterval(() => {
                            // Alert the extension when our cat introduces a bug
                            if (Math.random() < 0.5) {
                                count++;
                                vscode.postMessage({
                                    command: 'alert',
                                    text: '🐛  on line ' + count
                                })
                            }
                        }, 100);
                    }())
                </script>
        </body>
        </html>
    `;
}
