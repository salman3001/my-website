<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import type { IResType } from "~/utils/types";
import type { Discussion } from "~/utils/types/modals";

const props = defineProps<{
  perPage?: number;
  select?: string[];
  orderBy?: string;
  tagId?: string;
  showPagination?: boolean;
  isPublished?: boolean;
}>();

const search = defineModel<string>("search");
const page = ref(1);
const skip = computed(() => (props?.perPage || 20) * (page.value - 1));
const debaouncedSearch = debouncedRef(search, 1000);

const isPublishedQuery = computed(() =>
  props?.isPublished ? props?.isPublished : undefined,
);

const tagIdQuery = computed(() => props?.tagId);

const { data, status } = await useFetcherGet<
  IResType<{ count: number; data: Discussion[] }>
>(apiRoutes.discussions.index(), {
  query: {
    select: [
      "id",
      "title",
      "desc",
      "seo",
      "user",
      "tags",
      "createdAt",
      "count:comment",
    ].concat(props?.select ? props.select : []),
    take: props.perPage,
    skip: skip,
    search: debaouncedSearch,
    orderBy: props.orderBy,
    tagId: tagIdQuery,
    isPublished: isPublishedQuery,
  },
});
</script>

<template>
  <div v-if="data?.data?.data && data?.data?.data?.length > 0">
    <v-row>
      <v-col v-if="data?.data?.data" v-for="blog in data?.data?.data" cols="12" sm="6" md="4">
        <DiscussionCard :disicussion="blog" />
      </v-col>
    </v-row>
    <br />
    <TablePagination class="pt-5" v-if="showPagination" :page="Number(page)" :items-per-page="Number(perPage)"
      :total-items="Number(data?.data?.count)" @update:page="(p) => {
          page = p;
        }
        " />
  </div>

  <v-card v-else-if="data?.data?.data && data?.data?.data?.length === 0"
    class="bg-background text-center border-none py-10">
    <v-card-item>
      <v-icon icon="mdi-chat-alert-outline" size="64" color="info"></v-icon>
    </v-card-item>
    <v-card-item>
      No Discussion yet! Be the first one to start a discussion
    </v-card-item>
    <VCardActions class="d-flex justify-center py-2">
      <VBtn text="Start Discussion" variant="flat" :to="routes.web.discussions.create()" />
    </VCardActions>
  </v-card>
  <Loader v-else type="card" />
</template>
