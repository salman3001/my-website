<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";

const { id } = useRoute().params;
const { setLightBoxSrc } = useLightbox();

const { data } = await useFetcherGet<IResType<Project>>(
  apiRoutes.projects.view(id as unknown as number),
  {
    query: {
      select: [
        "id",
        "title",
        "shortDesc",
        "thumbnail",
        "images",
        "tags",
        "desc",
      ],
      take: 20,
      skip: 0,
    },
  },
);
</script>

<template>
  <br />
  <v-container max-width="1100">
    <h1 class="text-h4 font-weight-bold">{{ data?.data?.title }}</h1>
    <br />
    <p class="text-subtitle-1">{{ data?.data?.shortDesc }}</p>
    <br />
    <div class="tiptap">
      <v-row>
        <v-col
          v-for="img in data?.data?.images || []"
          :key="img?.id"
          class="d-flex child-flex tiptap"
          cols="12"
          sm="6"
          md="4"
        >
          <v-img
            :src="$config.public.uploadsPath + img.url"
            aspect-ratio="1"
            class="bg-grey-lighten-2"
            cover
            @click="() => setLightBoxSrc($config.public.uploadsPath + img.url)"
          >
          </v-img>
        </v-col>
      </v-row>
    </div>
    <br />
    <DisplayHtmlContent
      :content="data?.data?.desc || ''"
      :unique-id="'project-' + data?.data?.id"
    />
  </v-container>
</template>
