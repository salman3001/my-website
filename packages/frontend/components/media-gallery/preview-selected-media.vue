<script setup lang="ts">
import { MediaType, type Media } from ".";

const config = useRuntimeConfig();

const selectedMedia = defineModel<Media[]>({ required: true });

defineProps<{
  name: string;
}>();

const deleteAtIndex = (index: number) => {
  const newMedias = selectedMedia.value;
  newMedias.splice(index, 1);

  selectedMedia.value = newMedias;
};
</script>

<template>
  <div class="card bg-base-100 shadow-xl" v-for="(media, i) in selectedMedia">
    <input type="text" :name="name" style="display: none" :value="media?.id" />
    <v-card width="200">
      <template #append>
        <v-btn
          icon="mdi-delete"
          variant="text"
          size="small"
          color="error"
          @click="() => deleteAtIndex(i)"
        ></v-btn>
      </template>
      <v-card-text>
        <v-img
          v-if="media.type === MediaType.Image"
          class="bg-grey-lighten-2"
          height="125"
          :src="config.public.uploadsPath + media.url"
          cover
        ></v-img>
        <div v-if="media.type === MediaType.document">Document</div>
        <div v-if="media.type === MediaType.Audio">Audio</div>
        <div v-if="media.type === MediaType.Video">Vidoe</div>
      </v-card-text>

      <v-card-title class="text-body-1"> {{ media.name }} </v-card-title>
    </v-card>
  </div>
</template>
