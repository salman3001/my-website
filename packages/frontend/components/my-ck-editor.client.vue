<script setup lang="ts">
import "ckeditor5/ckeditor5.css";

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Image,
  type EditorConfig,
  Link,
  ImageInsert,
  CodeBlock,
  BlockQuote,
  FontColor,
} from "ckeditor5";

const editor = ref(ClassicEditor);
const editorConfig: EditorConfig = {
  plugins: [
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    Heading,
    Image,
    Link,
    ImageInsert,
    CodeBlock,
    BlockQuote,
    FontColor,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "fontfamily",
      "fontsize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "strikethrough",
      "subscript",
      "superscript",
      "code",
      "|",
      "link",
      "ImageInsert",
      "blockQuote",
      "codeBlock",
      "|",
      "alignment",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "outdent",
      "indent",
    ],
    shouldNotGroupWhenFull: true,
  },
};

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="bg-background text-on-background">
    <ckeditor
      v-model="model"
      :editor="editor"
      :config="editorConfig"
      tag-name="textarea"
    />
  </div>
</template>
