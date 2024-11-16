<script setup lang="ts">
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  minHeight?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editorRef = ref();

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder ?? "Write something here...",
    }),
    Underline,
  ],
  onUpdate() {
    if (!editor.value) return;

    emit("update:modelValue", editor.value.getHTML());
  },
});

watch(
  () => props.modelValue,
  () => {
    const isSame = editor.value?.getHTML() === props.modelValue;

    if (isSame) return;
    editor.value?.commands.setContent(props.modelValue);
  },
);
</script>

<template>
  <div class="border tiptap position-relative">
    <div v-if="editor" class="overflow-y-auto" style="max-height: 300px">
      <div
        class="d-flex gap-2 flex-wrap align-center editor position-sticky top-0 border-b bg-background"
        style="z-index: 1"
      >
        <v-btn-group class="d-flex flex-wrap h-auto ga-1 py-2">
          <v-btn
            size="x-small"
            icon="mdi-format-bold"
            rounded="sm"
            type="button"
            :variant="editor.isActive('bold') ? 'tonal' : 'text'"
            :color="editor.isActive('bold') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleBold().run()"
          >
          </v-btn>

          <v-btn
            size="x-small"
            icon="mdi-format-underline"
            rounded="sm"
            type="button"
            :variant="editor.isActive('underline') ? 'tonal' : 'text'"
            :color="editor.isActive('underline') ? 'primary' : 'default'"
            @click.prevent="editor.commands.toggleUnderline()"
          >
          </v-btn>

          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-italic"
            :variant="editor.isActive('italic') ? 'tonal' : 'text'"
            :color="editor.isActive('italic') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleItalic().run()"
          />

          <v-btn
            size="x-small"
            icon="mdi-format-strikethrough"
            rounded="sm"
            type="button"
            :variant="editor.isActive('strike') ? 'tonal' : 'text'"
            :color="editor.isActive('strike') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleStrike().run()"
          >
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn
            size="x-small"
            icon="mdi-code-braces"
            rounded="sm"
            type="button"
            :variant="editor.isActive('codeBlock') ? 'tonal' : 'text'"
            :color="editor.isActive('codeBlock') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
          >
          </v-btn>
        </v-btn-group>
      </div>
      <div style="z-index: 0" class="bg-background">
        <EditorContent
          ref="editorRef"
          :editor="editor"
          :style="{ minHeight: `${minHeight || 50}px` }"
        />
      </div>
    </div>
  </div>
</template>
