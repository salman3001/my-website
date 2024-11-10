<script setup lang="ts">
import { MediaType, type Media } from ".";
import { useClipboard } from "@vueuse/core";

const model = defineModel<boolean | any[]>({ required: true });
const { text, copy, copied, isSupported } = useClipboard();

defineProps<{
  media: Media;
}>();

const emit = defineEmits<{
  edit: [media: Media];
}>();
</script>

<template>
  <label :for="`media-${media.id}`" class="cursor-pointer border rounded-lg">
    <v-card width="200">
      <template #prepend>
        <VCheckbox
          :name="`media-${media.id}`"
          :id="`media-${media.id}`"
          v-model="model"
          :value="media"
          hide-details
          color="primary"
        />
      </template>

      <template #append>
        <VBtn
          icon="mdi-pencil"
          variant="text"
          size="small"
          @click="() => $emit('edit', media)"
        />
        <v-tooltip text="Copy Url" v-if="isSupported">
          <template v-slot:activator="{ props }">
            <VBtn
              v-bind="props"
              :icon="!copied ? 'mdi-content-copy' : 'mdi-check'"
              variant="text"
              size="small"
              @click.stop="
                () => {
                  copy($config.public.uploadsPath + media.url);
                }
              "
            />
          </template>
        </v-tooltip>
      </template>
      <v-img
        v-if="media.type === MediaType.Image"
        class="bg-grey-lighten-2"
        height="125"
        :src="$config.public.uploadsPath + media.url"
        cover
      ></v-img>
      <div v-if="media.type === MediaType.document">Document</div>
      <div v-if="media.type === MediaType.Audio">Audio</div>
      <div v-if="media.type === MediaType.Video">Vidoe</div>
      <v-card-title class="text-body-1"> {{ media.name }} </v-card-title>
    </v-card>
  </label>
</template>
