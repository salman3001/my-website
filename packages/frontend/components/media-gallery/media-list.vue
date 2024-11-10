<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MediaWindow, type Media, type MediaCategory } from ".";
import MediaCard from "./media-card.vue";
import type { IResType } from "~/utils/types";
import { refDebounced } from "@vueuse/core";

const { data: categories, execute: getCategories } = useFetcherGet<
  IResType<{ data: MediaCategory[]; count: number }>
>(apiRoutes.mediaCategory.index(), {
  immediate: false,
  server: false,
  lazy: true,
});

const categoryId = ref<MediaCategory[]>();
const search = ref("");
const debouncedSearch = refDebounced(search, 1000);
const perPage = ref(5);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));

const { data: medias, execute: getMedias } = useFetcherGet<
  IResType<{ data: Media[]; count: number }>
>(apiRoutes.media.index(), {
  immediate: false,
  server: false,
  lazy: true,
  query: {
    skip: skip,
    take: perPage,
    search: debouncedSearch,
  },
});

const emit = defineEmits<{
  windowChange: [window: MediaWindow];
  edit: [media: Media];
  selected: [values: Media[]];
  delete: [values: Media[]];
}>();

const selected = ref<Media[]>([]);

const anyThingSelected = computed(() => {
  if (selected.value instanceof Array && selected.value.length > 0) {
    return true;
  } else if (
    !(selected.value instanceof Array) &&
    ![undefined, null].includes(selected.value as unknown as null)
  ) {
    return true;
  } else {
    return false;
  }
});

onMounted(async () => {
  getCategories();
  getMedias();
});
</script>
<template>
  <div class="py-2 d-flex ga-2 flex-wrap">
    <VBtn
      text="Add Media"
      variant="tonal"
      prepend-icon="mdi-plus"
      @click="() => emit('windowChange', MediaWindow.ADD_MEDIA)"
    ></VBtn>
    <v-text-field
      v-model="search"
      placeholder="Search Blogs"
      style="max-inline-size: 200px; min-inline-size: 200px"
      hide-details
    />

    <VSelect
      v-if="categories?.data?.data"
      v-model="categoryId"
      :items="categories?.data?.data"
      item-title="name"
      item-value="id"
      placeholder="Select Category"
    />
  </div>
  <div class="d-flex ga-2">
    <v-btn v-if="anyThingSelected" @click="() => emit('selected', selected)">
      Select
    </v-btn>
    <v-btn
      v-if="anyThingSelected"
      @click="() => emit('delete', selected)"
      variant="text"
      color="error"
      icon="mdi-delete"
      size="small"
    >
    </v-btn>
  </div>
  <br />
  <div class="d-flex ga-2 flex-wrap justify-center items-center">
    <div v-if="!medias?.data?.data">Loading..</div>
    <MediaCard
      v-else
      v-for="media in medias?.data?.data"
      v-model="selected"
      :media="media"
      @edit="
        (v) => {
          emit('edit', v);
        }
      "
    />
  </div>
  <br />
  <div v-if="medias" class="text-end">
    <TablePagination
      :page="Number(page)"
      :items-per-page="Number(perPage)"
      :total-items="Number(medias?.data?.count)"
      @update:page="
        (p) => {
          page = p;
        }
      "
    />
  </div>
</template>
