<script setup lang="ts">
import { MediaType, MediaWindow, type MediaCategory } from ".";
import type { IResType } from "~/utils/types";

const { data: categories, execute: getCategories } = useFetcherGet<
  IResType<{ data: MediaCategory[]; count: number }>
>(apiRoutes.mediaCategory.index(), {
  immediate: false,
  server: false,
  lazy: true,
  query: {
    take: 1000,
  },
});

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
}>();

const form = reactive({
  file: null,
  name: "",
  type: MediaType.Image,
  mediaCategoryId: "",
});

const { exec, loading, errors } = useFetcher();

const submit = () => {
  const formData = new FormData();
  const formObj = toRaw(form);

  formData.append("name", formObj.name);
  formData.append("mediaCategoryId", formObj.mediaCategoryId);
  formData.append("type", formObj.type);
  if (formObj.file) {
    formData.append("file", formObj?.file);
  }

  exec(
    apiRoutes.media.create(),
    {
      method: "post",
      body: formData,
    },
    {
      onSuccess(resData) {
        emit("windowChange", MediaWindow.MEDIA_LIST);
      },
    },
  );
};

onMounted(() => {
  getCategories();
});
</script>

<template>
  <v-btn
    variant="tonal"
    size="small"
    @click="() => emit('windowChange', MediaWindow.MEDIA_LIST)"
    prepend-icon="mdi-arrow-left"
  >
    Back
  </v-btn>
  <br />
  <br />
  <v-form class="pa-2" @submit.prevent="submit">
    <v-row>
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.type"
          label="Media Type"
          placeholder="Select Media Type"
          :errors="errors?.type?.errors"
          :items="[
            MediaType.Image,
            MediaType.Audio,
            MediaType.document,
            MediaType.Video,
          ]"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.name"
          label="Name"
          placeholder="Media Name"
          :errors="errors?.name?.errors"
        />
      </VCol>
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.mediaCategoryId"
          label="Media Category"
          placeholder="Select Media Category"
          :errors="errors?.mediaCategoryId?.errors"
          :items="categories?.data?.data"
          item-value="id"
          item-title="name"
        />
      </VCol>

      <VCol cols="12" md="6">
        <v-file-input
          v-if="form.type === MediaType.Image"
          v-model="form.file"
          :errors="errors?.file?.errors"
          accept="image/png, image/jpeg, image/bmp, image/webp"
          label="Upload Image"
          placeholder="Upload Image"
          prepend-icon="mdi-camera"
        ></v-file-input>

        <v-file-input
          v-if="form.type === MediaType.document"
          v-model="form.file"
          :errors="errors?.file?.errors"
          accept="application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          label="Upload Document"
          placeholder="Upload Document"
        ></v-file-input>

        <v-file-input
          v-if="form.type === MediaType.Audio"
          v-model="form.file"
          :errors="errors?.file?.errors"
          accept="audio/midi, audio/x-midi, audio/mpeg, audio/aac, audio/ogg"
          label="Upload Document"
          placeholder="Upload Document"
        ></v-file-input>

        <v-file-input
          v-if="form.type === MediaType.Video"
          v-model="form.file"
          :errors="errors?.file?.errors"
          accept="video/3gpp, audio/3gpp, video/mp4, video/mpeg, video/ogg, video/mp2t, video/webm"
          label="Upload Document"
          placeholder="Upload Document"
        ></v-file-input>
      </VCol>
      <br />
    </v-row>
    <div class="text-end">
      <v-btn type="submit" class="btn btn-primary" :disabled="loading">
        Create Media
      </v-btn>
    </div>
  </v-form>
</template>
