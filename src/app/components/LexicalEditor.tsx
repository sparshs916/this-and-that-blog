// src/app/components/LexicalEditor.tsx
"use client";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  HeadingNode,
  QuoteNode,
  $createHeadingNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  CodeHighlightNode,
  CodeNode,
  $createCodeNode,
  $isCodeNode,
} from "@lexical/code";
import {
  AutoLinkNode,
  LinkNode,
  $createLinkNode,
  $isLinkNode,
} from "@lexical/link";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  LexicalEditor,
  $createParagraphNode,
  $createTextNode,
  SELECTION_CHANGE_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  $isElementNode,
  LexicalNode,
  $isRootOrShadowRoot,
  ParagraphNode,
  $isParagraphNode,
  TextNode,
} from "lexical";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode as LexicalListNode,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  FaRotateLeft, // Changed from FaUndo
  FaRotateRight, // Changed from FaRedo
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaLink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa6";

// --- Editor Theme ---
const editorTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote:
    "editor-quote border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2",
  heading: {
    h1: "editor-heading-h1 text-3xl font-bold my-4",
    h2: "editor-heading-h2 text-2xl font-bold my-3",
    h3: "editor-heading-h3 text-xl font-bold my-2",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol list-decimal pl-8",
    ul: "editor-list-ul list-disc pl-8",
    listitem: "editor-listitem my-1",
  },
  image: "editor-image",
  link: "editor-link text-blue-600 hover:underline cursor-pointer",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code bg-gray-100 px-1 rounded font-mono text-sm",
  },
  code: "editor-code bg-gray-100 p-1 rounded font-mono text-sm",
  codeHighlight: {
    atrule: "text-purple-600",
    attr: "text-orange-600",
    boolean: "text-red-600",
    builtin: "text-teal-600",
    cdata: "text-gray-500 italic",
    char: "text-green-600",
    comment: "text-gray-500 italic",
    constant: "text-red-600",
    deleted: "text-red-600",
    doctype: "text-gray-500 italic",
    entity: "text-orange-600",
    function: "text-yellow-600",
    important: "text-purple-600 font-bold",
    inserted: "text-green-600",
    keyword: "text-blue-600",
    namespace: "text-teal-600",
    number: "text-red-600",
    operator: "text-purple-600",
    prolog: "text-gray-500 italic",
    property: "text-red-600",
    punctuation: "text-gray-700",
    regex: "text-orange-600",
    selector: "text-purple-600",
    string: "text-green-600",
    symbol: "text-red-600",
    tag: "text-blue-600",
    url: "text-cyan-600",
    variable: "text-teal-600",
  },
  codeBlock:
    "editor-code-block bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded my-2 overflow-x-auto block",
};

// --- Editor Nodes ---
const editorNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
  ParagraphNode,
];

// --- Toolbar Plugin ---
function ToolbarPluginContext() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsLink($isLinkNode(anchorNode) || $isLinkNode(anchorNode.getParent()));

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<LexicalListNode>(
            anchorNode,
            LexicalListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          if (type === "bullet") {
            setBlockType("ul");
          } else if (type === "number") {
            setBlockType("ol");
          } else {
            setBlockType("paragraph");
          }
        } else {
          let type: string;
          if ($isHeadingNode(element)) {
            type = element.getTag();
          } else if ($isCodeNode(element)) {
            type = "code";
          } else {
            type = element.getType();
          }

          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          } else {
            setBlockType("paragraph");
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    } else {
      formatParagraph();
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    } else {
      formatParagraph();
    }
  };

  const formatCodeBlock = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode());
        }
      });
    } else {
      formatParagraph();
    }
  };

  const formatAlignment = (type: "left" | "center" | "right" | "justify") => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  };

  const insertLink = useCallback(() => {
    if (!isLink) {
      const url = prompt("Enter the URL:");
      if (url && url.trim() !== "") {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const linkNode = $createLinkNode(url);
            if (selection.isCollapsed()) {
              const textNode = $createTextNode(url);
              linkNode.append(textNode);
              selection.insertNodes([linkNode]);
            } else {
              const nodes = selection.extract();
              nodes.forEach((node) => {
                if ($isElementNode(node) && !node.isInline()) {
                  selection.insertNodes([node]);
                } else {
                  linkNode.append(node);
                }
              });
              selection.insertNodes([linkNode]);
            }
          }
        });
      }
    } else {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode();
          const linkNode =
            $findMatchingParent(node, $isLinkNode) ||
            ($isLinkNode(node) ? node : null);
          if ($isLinkNode(linkNode)) {
            const children = linkNode.getChildren();
            children.forEach((child) => linkNode.insertBefore(child));
            linkNode.remove();
          }
        }
      });
    }
  }, [editor, isLink]);

  return (
    <div
      className="editor-toolbar flex flex-wrap items-center justify-center gap-1 p-2 border-b border-gray-300 bg-gray-100"
      ref={toolbarRef}
    >
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        disabled={!canUndo}
        className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 text-black"
        aria-label="Undo"
        title="Undo (Ctrl+Z)"
      >
        <FaRotateLeft /> {/* Changed from FaUndo */}
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        disabled={!canRedo}
        className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 text-black"
        aria-label="Redo"
        title="Redo (Ctrl+Y)"
      >
        <FaRotateRight /> {/* Changed from FaRedo */}
      </button>
      <select
        value={blockType}
        onChange={(e) => {
          const type = e.target.value as keyof typeof blockTypeToBlockName;
          if (type === "paragraph") formatParagraph();
          else if (type === "h1" || type === "h2" || type === "h3")
            formatHeading(type);
          else if (type === "ul") formatBulletList();
          else if (type === "ol") formatNumberedList();
          else if (type === "quote") formatQuote();
          else if (type === "code") formatCodeBlock();
        }}
        className="p-1 border border-gray-300 rounded text-black bg-white hover:bg-gray-50"
        title="Block Type"
      >
        {Object.entries(blockTypeToBlockName).map(([key, name]) => (
          <option key={key} value={key} className="text-black">
            {name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`p-1 rounded hover:bg-gray-200 ${
          isBold ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Format Bold"
        title="Bold (Ctrl+B)"
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`p-1 rounded hover:bg-gray-200 ${
          isItalic ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Format Italic"
        title="Italic (Ctrl+I)"
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`p-1 rounded hover:bg-gray-200 ${
          isUnderline ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Format Underline"
        title="Underline (Ctrl+U)"
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={`p-1 rounded hover:bg-gray-200 ${
          isStrikethrough ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Format Strikethrough"
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        className={`p-1 rounded hover:bg-gray-200 ${
          isCode ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Insert Code"
        title="Inline Code"
      >
        <FaCode />
      </button>
      <button
        type="button"
        onClick={insertLink}
        className={`p-1 rounded hover:bg-gray-200 ${
          isLink ? "bg-gray-300" : ""
        } text-black`}
        aria-label="Insert Link"
        title="Insert Link"
      >
        <FaLink />
      </button>
      <button
        type="button"
        onClick={() => formatAlignment("left")}
        className="p-1 rounded hover:bg-gray-200 text-black"
        aria-label="Align Left"
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={() => formatAlignment("center")}
        className="p-1 rounded hover:bg-gray-200 text-black"
        aria-label="Align Center"
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={() => formatAlignment("right")}
        className="p-1 rounded hover:bg-gray-200 text-black"
        aria-label="Align Right"
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      <button
        type="button"
        onClick={() => formatAlignment("justify")}
        className="p-1 rounded hover:bg-gray-200 text-black"
        aria-label="Align Justify"
        title="Align Justify"
      >
        <FaAlignJustify />
      </button>
    </div>
  );
}

function $findMatchingParent(
  startingNode: LexicalNode,
  findFn: (node: LexicalNode) => boolean
): LexicalNode | null {
  let node: LexicalNode | null = startingNode;
  while (node !== null && node.getKey() !== "root") {
    if (findFn(node)) {
      return node;
    }
    node = node.getParent();
  }
  return null;
}

function $getNearestNodeOfType<T extends LexicalNode>(
  node: LexicalNode,
  klass: new (...args: never[]) => T
): T | null {
  let parent: LexicalNode | null = node;
  while (parent != null) {
    if (parent instanceof klass) {
      return parent;
    }
    parent = parent.getParent();
  }
  return null;
}

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  paragraph: "Paragraph",
  quote: "Quote",
  ul: "Bullet List",
  ol: "Numbered List",
};

interface LexicalEditorProps {
  initialContent?: string;
  onChange: (htmlContent: string) => void;
  editorRef?: React.MutableRefObject<LexicalEditor | null>;
}

const LexicalEditorComponent: React.FC<LexicalEditorProps> = ({
  initialContent = "",
  onChange,
  editorRef,
}) => {
  const initialConfig = React.useMemo(
    () => ({
      namespace: "MyLexicalEditor",
      theme: editorTheme,
      onError: (error: Error) => {
        console.error("Lexical Error:", error);
      },
      nodes: editorNodes,
    }),
    []
  );

  const handleOnChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        onChange(html);
      });
    },
    [onChange]
  );

  const setEditorRef = useCallback(
    (editor: LexicalEditor | null) => {
      if (editorRef) {
        editorRef.current = editor;
      }
    },
    [editorRef]
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container border border-gray-300 rounded relative bg-white shadow">
        <ToolbarPluginContext />
        <div className="editor-inner relative p-1">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input p-3 min-h-[150px] focus:outline-none text-gray-900 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none block" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin
            onChange={handleOnChange}
            ignoreSelectionChange={true}
          />
          <EditorRefPlugin editorRef={setEditorRef} />
          <InitialContentPlugin initialContent={initialContent} />
        </div>
      </div>
    </LexicalComposer>
  );
};

// --- Initial Content Plugin --- Refined Wrapping Logic
function InitialContentPlugin({
  initialContent,
}: {
  initialContent?: string;
}): null {
  const [editor] = useLexicalComposerContext();
  const isInitialized = useRef(false);
  const initialContentRef = useRef(initialContent);
  const editorId = useRef(
    `editor-${Math.random().toString(36).substring(7)}`
  ).current;

  useEffect(() => {
    if (editor && !isInitialized.current) {
      const contentToLoad = initialContentRef.current;
      const isEffectivelyEmpty =
        !contentToLoad ||
        contentToLoad.trim() === "<p><br></p>" ||
        contentToLoad.trim() === "";

      if (!isEffectivelyEmpty) {
        editor.update(
          () => {
            const root = $getRoot();
            try {
              const parser = new DOMParser();
              const dom = parser.parseFromString(contentToLoad, "text/html");
              const nodes = $generateNodesFromDOM(editor, dom);
              const validRootNodes = nodes.filter($isElementNode);

              if (validRootNodes.length > 0) {
                root.clear();
                root.select();
                root.append(...validRootNodes);
              } else if (nodes.length > 0) {
                console.warn(
                  `[${editorId}] InitialContentPlugin: Generated nodes are not valid root elements. Wrapping in paragraph. Nodes count: ${
                    nodes.length
                  }. First node type: ${nodes[0]?.getType()}`
                );
                root.clear();
                const wrapperParagraph = $createParagraphNode();
                const validChildren = nodes.filter(
                  (node) => node instanceof TextNode || $isElementNode(node)
                );
                if (validChildren.length > 0) {
                  wrapperParagraph.append(...validChildren);
                  root.append(wrapperParagraph);
                } else {
                  console.warn(
                    `[${editorId}] InitialContentPlugin: No valid child nodes found after filtering for wrapping. Falling back to empty.`
                  );
                  root.append($createParagraphNode());
                }
              } else {
                console.warn(
                  `[${editorId}] InitialContentPlugin: Parsing yielded no nodes. Falling back to empty.`
                );
                root.clear();
                root.append($createParagraphNode());
              }
            } catch (e) {
              console.error(
                `[${editorId}] InitialContentPlugin: Error setting initial state:`,
                e
              );
              root.clear();
              root.append($createParagraphNode());
            }
          },
          { tag: `InitialContentPluginLoad-${editorId}` }
        );
      } else {
        editor.update(
          () => {
            const root = $getRoot();
            const firstChild = root.getFirstChild();
            const isAlreadyEmptyParagraph =
              root.getChildrenSize() === 1 &&
              $isParagraphNode(firstChild) &&
              firstChild.getTextContent() === "";
            if (!isAlreadyEmptyParagraph) {
              root.clear();
              root.append($createParagraphNode());
            }
          },
          { tag: `InitialContentPluginEmpty-${editorId}` }
        );
      }
      isInitialized.current = true;
    }
  }, [editor, editorId]);

  return null;
}

// --- Editor Ref Plugin --- Corrected Type Signature
function EditorRefPlugin({
  editorRef,
}: {
  editorRef: (editor: LexicalEditor | null) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editorRef(editor);
    return () => {
      editorRef(null);
    };
  }, [editor, editorRef]);

  return null;
}

export default LexicalEditorComponent;
