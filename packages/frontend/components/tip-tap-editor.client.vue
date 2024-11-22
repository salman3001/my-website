<script setup lang="ts">
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  minHeight?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editorRef = ref();
const youtube = reactive({
  width: "640",
  height: "380",
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Placeholder.configure({
      placeholder: props.placeholder ?? "Write something here...",
    }),
    Underline,
    Image,
    Youtube,
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

const addImage = () => {
  const url = window.prompt("URL");

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run();
  }
};

const addVideo = () => {
  const url = prompt("Enter YouTube URL") as string;

  editor.value?.commands.setYoutubeVideo({
    src: url,
    width: Math.max(320, parseInt(youtube.width, 10)) || 640,
    height: Math.max(180, parseInt(youtube.height, 10)) || 380,
  });
};
</script>

<template>
  <div class="border rounded-lg pa-2 tiptap position-relative">
    <div v-if="editor" class="overflow-y-auto" style="max-height: 400px">
      <div
        class="d-flex gap-2 flex-wrap align-center editor position-sticky top-0 bg-background border-b"
        style="z-index: 1"
      >
        <VBtnGroup class="d-flex flex-wrap h-auto ga-1 py-2">
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            :variant="
              editor.isActive('heading', { level: 1 }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            "
            text="H1"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            :variant="
              editor.isActive('heading', { level: 2 }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            "
            text="H2"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            :variant="
              editor.isActive('heading', { level: 3 }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            "
            text="H3"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            :variant="
              editor.isActive('heading', { level: 4 }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive('heading', { level: 4 }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            "
            text="H4"
          />
          <v-divider vertical></v-divider>
          <VBtn
            size="x-small"
            rounded="sm"
            icon="mdi-format-bold"
            type="button"
            :variant="editor.isActive('bold') ? 'tonal' : 'text'"
            :color="editor.isActive('bold') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleBold().run()"
          />

          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-underline"
            :variant="editor.isActive('underline') ? 'tonal' : 'text'"
            :color="editor.isActive('underline') ? 'primary' : 'default'"
            @click.prevent="editor.commands.toggleUnderline()"
          />

          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-italic"
            :variant="editor.isActive('italic') ? 'tonal' : 'text'"
            :color="editor.isActive('italic') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleItalic().run()"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-strikethrough"
            :variant="editor.isActive('strike') ? 'tonal' : 'text'"
            :color="editor.isActive('strike') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleStrike().run()"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-align-left"
            :variant="editor.isActive({ textAlign: 'left' }) ? 'tonal' : 'text'"
            :color="
              editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'
            "
            @click.prevent="editor.chain().focus().setTextAlign('left').run()"
          />
          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-align-center"
            :color="
              editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'
            "
            :variant="
              editor.isActive({ textAlign: 'center' }) ? 'tonal' : 'text'
            "
            @click.prevent="editor.chain().focus().setTextAlign('center').run()"
          />

          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-align-right"
            :variant="
              editor.isActive({ textAlign: 'right' }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'
            "
            @click.prevent="editor.chain().focus().setTextAlign('right').run()"
          />

          <VBtn
            size="x-small"
            rounded="sm"
            type="button"
            icon="mdi-format-align-justify"
            :variant="
              editor.isActive({ textAlign: 'justify' }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().setTextAlign('justify').run()
            "
          />
          <VBtn
            size="x-small"
            rounded="sm"
            icon="mdi-format-quote-close"
            type="button"
            :variant="editor.isActive('blockquote') ? 'tonal' : 'text'"
            :color="editor.isActive('blockquote') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleBlockquote().run()"
          />

          <VBtn
            size="x-small"
            rounded="sm"
            icon="mdi-format-list-bulleted"
            type="button"
            :variant="editor.isActive('bulletList') ? 'tonal' : 'text'"
            :color="editor.isActive('bulletList') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleBulletList().run()"
          />
          <VBtn
            size="x-small"
            icon="mdi-format-list-numbered"
            rounded="sm"
            type="button"
            :variant="editor.isActive('orderedList') ? 'tonal' : 'text'"
            :color="editor.isActive('orderedList') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleOrderedList().run()"
          />

          <VBtn
            size="x-small"
            icon="mdi-code-braces"
            rounded="sm"
            type="button"
            :variant="editor.isActive('codeBlock') ? 'tonal' : 'text'"
            :color="editor.isActive('codeBlock') ? 'primary' : 'default'"
            @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
          />

          <VBtn
            size="x-small"
            icon="mdi-minus"
            rounded="sm"
            type="button"
            variant="text"
            @click.prevent="editor.chain().focus().setHorizontalRule().run()"
          />

          <VBtn
            size="x-small"
            icon="mdi-image"
            rounded="sm"
            variant="text"
            type="button"
            @click.prevent="addImage"
          />
          <v-divider vertical inset></v-divider>
          <div class="d-flex">
            <v-text-field
              id="width"
              type="number"
              v-model="youtube.width"
              placeholder="width"
              density="compact"
              :width="40"
              variant="plain"
              class="small-text-input"
            />
            <v-text-field
              id="height"
              type="number"
              v-model="youtube.height"
              placeholder="height"
              :width="40"
              variant="plain"
              class="small-text-input"
            />

            <VBtn
              rounded="sm"
              variant="tonal"
              type="button"
              @click.prevent="addVideo"
              icon="mdi-youtube"
              size="x-small"
            />
          </div>
        </VBtnGroup>
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

<style scopped>
.small-text-input input {
  font-size: 0.75rem;
}
</style>
