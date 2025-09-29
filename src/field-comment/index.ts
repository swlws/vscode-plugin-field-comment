import * as vscode from 'vscode';
import { registerCommand } from './command';
import { addEventListener } from './event';
import { updateDecorations } from './business/index';

// import state from './state';

// const decorationType = vscode.window.createTextEditorDecorationType({
//   before: {
//     margin: '0 1rem 0 0',
//     color: '#999999',
//     contentText: '',
//   },
// });

// const getDefaultComment = (): string => {
//   const config = vscode.workspace.getConfiguration('fieldComment');
//   return config.get<string>('defaultComment') || '';
// };

/**
 * 更新装饰
 * @returns
 */
// export function updateDecorations() {
//   console.log('====================updateDecorations=======================');
//   const editor = vscode.window.activeTextEditor;
//   if (!editor) {
//     return;
//   }
//   if (!state.getState()) {
//     editor.setDecorations(decorationType, []); // 清空
//     return;
//   }

//   const lineCount = editor.document.lineCount;
//   const decorations: vscode.DecorationOptions[] = [];
//   const comment = getDefaultComment();

//   for (let line = 0; line < lineCount; line++) {
//     const lineObj = editor.document.lineAt(line);
//     const range = new vscode.Range(lineObj.range.start, lineObj.range.start);

//     decorations.push({
//       range,
//       renderOptions: {
//         before: {
//           contentText: comment,
//         },
//       },
//     });
//   }

//   editor.setDecorations(decorationType, decorations);
// }

export function install(context: vscode.ExtensionContext) {
  registerCommand(context, updateDecorations);
  addEventListener(context, updateDecorations);
}
