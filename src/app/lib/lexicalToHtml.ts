import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';
import { JSDOM } from 'jsdom';

// Import specific nodes
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { MarkNode } from '@lexical/mark';
// If you use tables:
// import { TableNode, TableRowNode, TableCellNode } from "@lexical/table";

const editorConfig = {
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    CodeNode,
    CodeHighlightNode,
    MarkNode,
    // If you use tables:
    // TableNode,
    // TableRowNode,
    // TableCellNode,
  ],
  onError: (error: Error) => {
    console.error('Lexical editor error in HTML conversion:', error);
    throw error;
  },
};

export function convertLexicalToHtml(lexicalJsonString: string): string {
  let dom: JSDOM | undefined;

  const originalGlobals: {
    window?: typeof window;
    document?: typeof document;
    DocumentFragment?: typeof DocumentFragment;
    Element?: typeof Element;
    // We are intentionally not touching global.navigator due to potential issues.
  } = {};

  let polyfilled = false;

  if (typeof window === 'undefined') {
    polyfilled = true;
    dom = new JSDOM();

    // Store originals before overwriting
    if ('window' in global) originalGlobals.window = global.window;
    if ('document' in global) originalGlobals.document = global.document;
    if ('DocumentFragment' in global) originalGlobals.DocumentFragment = global.DocumentFragment;
    if ('Element' in global) originalGlobals.Element = global.Element;

    // Polyfill necessary globals for Lexical HTML generation
    // @ts-ignore
    global.window = dom.window;
    // @ts-ignore
    global.document = dom.window.document;
    // @ts-ignore
    global.DocumentFragment = dom.window.DocumentFragment;
    // @ts-ignore
    global.Element = dom.window.Element;
    // Note: We are not attempting to polyfill global.navigator directly here,
    // as it was causing "only a getter" errors. Lexical should use window.navigator.
  }

  const editor = createEditor(editorConfig);

  try {
    const editorState = editor.parseEditorState(lexicalJsonString);
    let html = '';
    editor.setEditorState(editorState);
    editor.update(() => {
      html = $generateHtmlFromNodes(editor, null);
    });

    return html;
  } catch (error) {
    console.error('Error converting Lexical JSON to HTML:', error);
    return '<p>Error converting content.</p>';
  } finally {
    if (polyfilled) {
      // Restore original globals to prevent side-effects
      if (originalGlobals.hasOwnProperty('window')) {
        // @ts-ignore
        global.window = originalGlobals.window;
      } else {
        // @ts-ignore
        delete global.window;
      }
      if (originalGlobals.hasOwnProperty('document')) {
        // @ts-ignore
        global.document = originalGlobals.document;
      } else {
        // @ts-ignore
        delete global.document;
      }
      if (originalGlobals.hasOwnProperty('DocumentFragment')) {
        // @ts-ignore
        global.DocumentFragment = originalGlobals.DocumentFragment;
      } else {
        // @ts-ignore
        delete global.DocumentFragment;
      }
      if (originalGlobals.hasOwnProperty('Element')) {
        // @ts-ignore
        global.Element = originalGlobals.Element;
      } else {
        // @ts-ignore
        delete global.Element;
      }
    }
  }
}
