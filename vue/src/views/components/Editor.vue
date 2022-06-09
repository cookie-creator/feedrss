<template>
  <div v-if="editor">
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleBold().run().prevent()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('bold') }">bold</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('italic') }">italic</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('strike') }">strike</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('code') }">code</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('paragraph') }">paragraph</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 1 }) }">h1</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 2 }) }">h2</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 3 }) }">h3</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 4 }) }">h4</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 5 }) }">h5</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('heading', { level: 6 }) }">h6</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('bulletList') }">bullet list</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('orderedList') }">ordered list</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('codeBlock') }">code block</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active bg-indigo-700 border-indigo-700 text-white': editor.isActive('blockquote') }">blockquote</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().setHardBreak().run()">hard break</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().undo().run()">undo</button>
    <button type="button" class="editor-btn text-sm px-1 border-2 border-gray-200 rounded my-1 mx-1" @click="editor.chain().focus().redo().run()">redo</button>
  </div>
  <div class="border-2 py-2 px-2 rounded-md border-gray-200">
    <editor-content :editor="editor" class="ProseMirror" />
  </div>

</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent} from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
.ProseMirror:focus-visible
{
  outline: none;
}

.editor-btn
{

}
</style>
