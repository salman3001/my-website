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
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editorRef = ref();
const youtube = reactive({
  width: "640",
  height: "480",
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
    height: Math.max(180, parseInt(youtube.height, 10)) || 480,
  });
};
</script>

<template>
  <div class="border tiptap position-relative">
    <div class="overflow-y-auto" style="max-height: 800px">
      <div
        v-if="editor"
        class="d-flex gap-2 py-2 px-6 flex-wrap align-center editor position-sticky top-0 bg-background"
        style="z-index: 1"
      >
        <v-btn-group variant="outlined" divided>
          <v-btn
            size="small"
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
          >
            H1
          </v-btn>
          <v-btn
            size="small"
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
          >
            H2
          </v-btn>
          <v-btn
            size="small"
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
          >
            H3
          </v-btn>
          <v-btn
            size="small"
            rounded="sm"
            type="button"
            :variant="
              editor.isActive('heading', { level: 3 }) ? 'tonal' : 'text'
            "
            :color="
              editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'
            "
            @click.prevent="
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            "
          >
            H3
          </v-btn>
        </v-btn-group>
        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('bold') ? 'tonal' : 'text'"
          :color="editor.isActive('bold') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleBold().run()"
        >
          <VIcon icon="mdi-format-bold" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('underline') ? 'tonal' : 'text'"
          :color="editor.isActive('underline') ? 'primary' : 'default'"
          @click.prevent="editor.commands.toggleUnderline()"
        >
          <VIcon icon="mdi-format-underline" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('italic') ? 'tonal' : 'text'"
          :color="editor.isActive('italic') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
        >
          <VIcon icon="mdi-format-italic" class="font-weight-medium" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('strike') ? 'tonal' : 'text'"
          :color="editor.isActive('strike') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleStrike().run()"
        >
          <VIcon icon="mdi-format-strikethrough" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive({ textAlign: 'left' }) ? 'tonal' : 'text'"
          :color="
            editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'
          "
          @click.prevent="editor.chain().focus().setTextAlign('left').run()"
        >
          <VIcon icon="mdi-format-align-left" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :color="
            editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'
          "
          :variant="editor.isActive({ textAlign: 'center' }) ? 'tonal' : 'text'"
          @click.prevent="editor.chain().focus().setTextAlign('center').run()"
        >
          <VIcon icon="mdi-format-align-center" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive({ textAlign: 'right' }) ? 'tonal' : 'text'"
          :color="
            editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'
          "
          @click.prevent="editor.chain().focus().setTextAlign('right').run()"
        >
          <VIcon icon="mdi-format-align-right" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="
            editor.isActive({ textAlign: 'justify' }) ? 'tonal' : 'text'
          "
          :color="
            editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'
          "
          @click.prevent="editor.chain().focus().setTextAlign('justify').run()"
        >
          <VIcon icon="mdi-format-align-justify" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('blockquote') ? 'tonal' : 'text'"
          :color="editor.isActive('blockquote') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleBlockquote().run()"
        >
          <VIcon icon="mdi-format-quote-close" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('bulletList') ? 'tonal' : 'text'"
          :color="editor.isActive('bulletList') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
        >
          <VIcon icon="mdi-format-list-bulleted" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('orderedList') ? 'tonal' : 'text'"
          :color="editor.isActive('orderedList') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
        >
          <VIcon icon="mdi-format-list-numbered" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          :variant="editor.isActive('codeBlock') ? 'tonal' : 'text'"
          :color="editor.isActive('codeBlock') ? 'primary' : 'default'"
          @click.prevent="editor.chain().focus().toggleCodeBlock().run()"
        >
          <VIcon icon="mdi-code-braces" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          type="button"
          variant="text"
          @click.prevent="editor.chain().focus().setHorizontalRule().run()"
        >
          <VIcon icon="mdi-minus" />
        </v-btn>

        <v-btn
          size="small"
          rounded="sm"
          variant="text"
          type="button"
          @click.prevent="addImage"
        >
          <VIcon icon="mdi-image" />
        </v-btn>
        <v-divider vertical inset></v-divider>
        <div class="d-flex ga-2 pa-2">
          <v-text-field
            id="width"
            type="number"
            v-model="youtube.width"
            placeholder="width"
            density="compact"
            :width="80"
          />
          <v-text-field
            id="height"
            type="number"
            v-model="youtube.height"
            placeholder="height"
            :width="80"
          />

          <v-btn
            rounded="sm"
            variant="tonal"
            type="button"
            @click.prevent="addImage"
          >
            <VIcon icon="mdi-youtube" />
          </v-btn>
        </div>
        <v-divider vertical inset></v-divider>
      </div>

      <div style="z-index: 0">
        <EditorContent ref="editorRef" :editor="editor" />
      </div>
    </div>
  </div>
</template>
