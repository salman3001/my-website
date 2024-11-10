<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";

const props = defineProps<{
  tagId?: string;
}>();

const perPage = 20;

const page = ref(1);
const skip = computed(() => (perPage || 20) * (page.value - 1));

const tagIdQuery = computed(() => props?.tagId);

const { data, status } = await useFetcherGet<
  IResType<{ count: number; data: Project[] }>
>(apiRoutes.projects.index(), {
  query: {
    select: ["id", "title", "shortDesc", "thumbnail", "tags"],
    take: perPage,
    skip: skip,
    orderBy: "name",
    tagId: tagIdQuery,
  },
});
</script>

<template>
  <div v-if="data">
    <v-row>
      <v-col
        v-if="data?.data?.data"
        v-for="project in data?.data?.data"
        cols="12"
      >
        <ProjectCard :project="project" :horzontal="false" />
      </v-col>
    </v-row>
    <br />
    <TablePagination
      class="pt-5"
      :page="Number(page)"
      :items-per-page="Number(perPage)"
      :total-items="Number(data?.data?.count)"
      @update:page="
        (p) => {
          page = p;
        }
      "
    />
  </div>
  <Loader v-else type="card" />
</template>
