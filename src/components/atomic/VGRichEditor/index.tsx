import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Undo from '@mui/icons-material/UndoOutlined';
import Redo from '@mui/icons-material/RedoOutlined';
import Bold from '@mui/icons-material/FormatBoldOutlined';
import Italic from '@mui/icons-material/FormatItalicOutlined';
import Strikethrough from '@mui/icons-material/StrikethroughSOutlined';
import FormatClear from '@mui/icons-material/FormatClearOutlined';
import Ordered from '@mui/icons-material/FormatListNumberedRounded';
import Unordered from '@mui/icons-material/FormatListBulletedOutlined';
import Quote from '@mui/icons-material/FormatQuoteRounded';

const EditorToolbar = (
  { editor, enable }:
    {
      editor: Editor | null,
      enable: boolean
    }
) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Undo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Redo />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Strikethrough />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <FormatClear />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Ordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Unordered />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
          disabled={!enable}
          style={{ cursor: enable ? "pointer" : "default" }}
        >
          <Quote />
        </button>
      </div>
    </div>
  );
}

export default function VGRichEditor({
  isToolbar = true,
  enable = true,
  content,
  onChange,
}: {
  isToolbar?: boolean,
  enable?: boolean,
  content?: string;
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: enable,
    onUpdate({ editor }) {
      onChange(editor?.getHTML())
    }
  })

  return (
    <div className='vg-rich-editor'>
      {
        isToolbar && (
          <EditorToolbar editor={editor} enable={enable} />
        )
      }
      <EditorContent
        editor={editor}
      />
    </div>
  )
}