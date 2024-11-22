<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";
const { id } = useRoute().params;
const appConfig = useAppConfig();

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
        "video",
      ],
      take: 20,
      skip: 0,
    },
  },
);
</script>

<template>
  <v-container max-width="1100">
    <br />
    <h1 class="text-h4 font-weight-bold">{{ data?.data?.title }}</h1>
    <br />
    <p class="text-subtitle-1">{{ data?.data?.shortDesc }}</p>
    <br />
    <div>
      <v-row>
        <EasyLightbox
          v-if="data?.data?.images.length"
          :images="data?.data?.images.map((i) => i.url)"
        >
          <template #default="{ props }">
            <v-col
              v-for="(img, index) in props.images || []"
              :key="index"
              class="d-flex child-flex tiptap"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-img
                :src="$config.public.uploadsPath + img"
                aspect-ratio="1"
                class="bg-grey-lighten-2"
                cover
                @click="() => props.onShow(index)"
              >
              </v-img>
            </v-col>
          </template>
        </EasyLightbox>
        <EasyLightbox
          v-else
          :images="[
            appConfig.noImageUrl,
            appConfig.noImageUrl,
            appConfig.noImageUrl,
            appConfig.noImageUrl,
            appConfig.noImageUrl,
          ]"
        >
          <template #default="{ props }">
            <v-col
              v-for="(img, index) in props.images || []"
              :key="index"
              class="d-flex child-flex tiptap"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-img
                :src="img"
                aspect-ratio="1"
                class="bg-grey-lighten-2"
                cover
                @click="() => props.onShow(index)"
              >
              </v-img>
            </v-col>
          </template>
        </EasyLightbox>
      </v-row>
    </div>
    <div class="mt-6">
      <h3>Video</h3>
      <Youtube
        v-if="data?.data?.video"
        :id="data?.data?.video"
        class="d-flex mt-6"
      />
      <p v-else>No Video Available</p>
    </div>
    <br />
    <DisplayHtmlContent
      :content="data?.data?.desc || ''"
      :unique-id="'project-' + data?.data?.id"
    />
    <br />
    <br />
  </v-container>
</template>
