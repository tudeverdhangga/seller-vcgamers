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

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div className="menuBar-category">
        <button onClick={() => editor.chain().focus().undo().run()}>
          <Undo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <Redo />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <Strikethrough />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          <FormatClear />
        </button>
      </div>
      <div className="menuBar-category">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <Ordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <Unordered />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <Quote />
        </button>
      </div>
    </div>
  );
}

export default function VGRichEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
  })

  return (
    <div className='vg-rich-editor'>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}