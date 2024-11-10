<script setup lang="ts">
import RenderMarkdown from "~/components/render-markdown.vue";
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const { slug } = useRoute().params;

const { data } = await useFetcherGet<IResType<Blog>>(
  apiRoutes.blogs.view(slug as string),
  {
    query: {
      select: [
        "title",
        "id",
        "shortDesc",
        "longDesc",
        "createdAt",
        "views",
        "image",
        "blogCategory",
        "author",
        "seo",
        "tags",
        "count:comment",
      ],
      take: 20,
      skip: 0,
    },
  },
);
</script>

<template>
  <br />
  <v-container max-width="1280">
    <h1 class="text-h4 font-weight-bold">{{ data?.data?.title }}</h1>
    <br />
    <p class="text-subtitle-1">{{ data?.data?.shortDesc }}</p>
    <br />
    <v-card class="bg-background border-none">
      <v-row justify="start" class="pa-2 text-center py-8">
        <v-col cols="12" sm="4" class="d-flex justify-center">
          <div class="d-flex ga-6">
            <v-avatar
              image="https://cdn.vuetifyjs.com/images/john.jpg"
              size="64"
              rounded="lg"
            />
            <div>
              <div class="text-subtitle-1">Author</div>
              <div class="text-medium-emphasis">
                {{ data?.data?.author.fullName }}
              </div>
            </div>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6" sm="3">
          <div class="text-subtitle-1">Published</div>
          <div class="text-medium-emphasis">
            {{ new Date(data?.data?.createdAt!).toLocaleString() }}
          </div></v-col
        >

        <v-divider vertical></v-divider>
        <v-col cols="6" sm="3">
          <div class="text-subtitle-1">Comments</div>
          <div class="text-medium-emphasis">
            {{ data?.data?._count?.comment || 0 }}
          </div></v-col
        >
      </v-row>
    </v-card>
    <br />
    <!-- <div class="d-flex justify-center">
      <v-img
        :src="
          data?.data?.image
            ? $config.public.uploadsPath + data.data?.image?.url
            : appConfig.noImageUrl
        "
        max-width="700"
        max-height="400"
        cover
      ></v-img>
    </div> -->
    <DisplayHtmlContent :content="data?.data?.longDesc || ''" />
    <br />
    <ViewsBlogsComments
      :blog-id="data?.data?.id || ''"
      :comment-count="data?.data?._count?.comment"
    />
  </v-container>
</template>
