<script setup lang="ts">
import { ref } from "vue";
import { MediaWindow, type Media } from ".";
import MediaList from "./media-list.vue";
import AddMedia from "./add-media.vue";
import ConfirmDelete from "./confirm-delete.vue";
import PreviewSelectedMedia from "./preview-selected-media.vue";
import UpdateMedia from "./update-media.vue";

withDefaults(defineProps<{ name: string }>(), {
  name: "mediaId",
});

const selected = defineModel<Media[]>({ required: true });
const selectedForDelete = ref<Media[]>([]);
const selectedForEdit = ref<Media>();
const mediaWindow = ref<MediaWindow>(MediaWindow.MEDIA_LIST);

const emit = defineEmits<{
  selected: [values: Media[]];
}>();
</script>
<template>
  <v-dialog :max-width="1200">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="d-block mb-2"
        size="small"
        v-bind="activatorProps"
        text="Select Media"
        variant="tonal"
      ></v-btn>
      <div class="d-flex ga-2 flex-wrap">
        <PreviewSelectedMedia v-model:="selected" :name="name" />
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Media Gallery" class="bg-background">
        <template #append>
          <v-btn
            variant="text"
            size="small"
            @click="
              () => {
                isActive.value = false;
              }
            "
            icon="mdi-close"
          ></v-btn>
        </template>
        <v-card-text>
          <div v-if="mediaWindow === MediaWindow.MEDIA_LIST">
            <MediaList
              @windowChange="(v) => (mediaWindow = v)"
              :medias="[1, 2, 3, 4, 5]"
              v-model="selected"
              @selected="
                (v) => {
                  selected = v;
                  isActive.value = false;
                  emit('selected', v);
                }
              "
              @delete="
                (v) => {
                  selectedForDelete = v;
                  mediaWindow = MediaWindow.CONFIRM_DELETE;
                }
              "
              @edit="
                (v) => {
                  selectedForEdit = v;
                  mediaWindow = MediaWindow.UPDATE_NEDIA;
                }
              "
            />
          </div>
          <div v-if="mediaWindow === MediaWindow.CONFIRM_DELETE">
            <ConfirmDelete
              @windowChange="(v) => (mediaWindow = v)"
              :selected-for-delete="selectedForDelete"
            />
          </div>
          <div v-if="mediaWindow === MediaWindow.ADD_MEDIA">
            <AddMedia @windowChange="(v) => (mediaWindow = v)" />
          </div>
          <div
            v-if="mediaWindow === MediaWindow.UPDATE_NEDIA && selectedForEdit"
          >
            <UpdateMedia
              @windowChange="(v) => (mediaWindow = v)"
              :media="selectedForEdit"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
