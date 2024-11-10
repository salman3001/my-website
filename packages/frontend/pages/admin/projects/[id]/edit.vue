<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";

const { id } = useRoute().params;

const { data } = await useFetcherGet<IResType<Project>>(
  apiRoutes.projects.view(Number(id)),
  {
    query: {
      select: [
        "id",
        "title",
        "shortDesc",
        "desc",
        "isPublished",
        "thumbnail",
        "images",
        "video",
        "tags",
      ],
    },
  },
);
</script>

<template>
  <v-container>
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.admin.projects.index()"
      />
      <h1 class="text-h6">Edit Project</h1>
    </div>
    <br />
    <FormsProjectCreateUpdate :project="data?.data" type="update" />
  </v-container>
</template>
