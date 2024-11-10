<script setup lang="ts">
import { MediaWindow, type Media } from ".";

const props = defineProps<{ selectedForDelete: Media[] | Media | undefined }>();

const { exec, loading } = useFetcher();

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
}>();

const confirmAction = async () => {
  if (props.selectedForDelete) {
    if (Array.isArray(props.selectedForDelete)) {
      const tasks = props.selectedForDelete.map((media) =>
        exec(apiRoutes.media.delete(media.id), { method: "DELETE" }),
      );
      await Promise.all(tasks);
      emit("windowChange", MediaWindow.MEDIA_LIST);
    } else {
      exec(
        apiRoutes.media.delete(props.selectedForDelete.id),
        { method: "DELETE" },
        {
          onSuccess: () => {
            emit("windowChange", MediaWindow.MEDIA_LIST);
          },
        },
      );
    }
  }
};
</script>

<template>
  <v-row>
    <v-col cols="6">
      <v-btn
        prepend-icon="mdi-arrow-left"
        variant="tonal"
        size="small"
        @click="() => emit('windowChange', MediaWindow.MEDIA_LIST)"
      >
        Back
      </v-btn>
    </v-col>
  </v-row>
  <br />
  <v-alert density="compact" title="Confirm  Deletion" type="warning">
    Are your sure your want to delete these items
    <v-list
      v-if="Array.isArray(selectedForDelete)"
      density="compact"
      color="warning"
      :items="selectedForDelete"
      item-title="name"
      item-value="id"
      class="bg-warning"
    ></v-list>
    <span v-else>{{ selectedForDelete?.name }}</span>
  </v-alert>
  <br />
  <div class="d-flex justify-end">
    <v-btn
      color="error"
      prepend-icon="mdi-trash"
      variant="tonal"
      size="small"
      @click="
        () => {
          confirmAction();
        }
      "
    >
      Confirm Delete
    </v-btn>
  </div>
</template>
