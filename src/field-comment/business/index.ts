import * as vscode from 'vscode';
import state from './state';
import KeyNoteMapping from './dictionary';

const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
    margin: '0 1rem 0 0',
    color: '#999999',
    contentText: '',
  },
});

const getMapping = (): Record<string, string> => {
  const config = vscode.workspace.getConfiguration('fieldComment');
  const configMap = config.get<Record<string, string>>('mapping') || {};

  return { ...configMap, ...KeyNoteMapping };
};

/**
 * 更新装饰
 */
export function updateDecorations() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  if (!state.getState()) {
    editor.setDecorations(decorationType, []); // 清空
    return;
  }

  const lineCount = editor.document.lineCount;
  const decorations: vscode.DecorationOptions[] = [];
  const mapping = getMapping();

  for (let line = 0; line < lineCount; line++) {
    const lineObj = editor.document.lineAt(line);
    const text = lineObj.text;

    for (const [key, note] of Object.entries(mapping)) {
      const index = text.indexOf(key);
      if (index !== -1) {
        // 定位到 key 结尾
        const startPos = lineObj.range.start.translate(0, index + key.length);
        const range = new vscode.Range(startPos, startPos);

        decorations.push({
          range,
          renderOptions: {
            after: {
              contentText: ` /* ${note} */`, // 紧跟 key 后面
            },
          },
        });
      }
    }
  }

  editor.setDecorations(decorationType, decorations);
}
