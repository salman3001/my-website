<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Discussion } from "~/utils/types/modals";

const { id } = useRoute().params;
const appConfig = useAppConfig()

const { data } = await useFetcherGet<IResType<Discussion>>(
  apiRoutes.discussions.view(id as string),
  {
    query: {
      select: [
        "id",
        "title",
        "desc",
        "createdAt",
        "user",
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
  <v-container max-width="1000">
    <br />
    <h2>
      {{ data?.data?.title }}
    </h2>

    <div class="d-flex ga-4 mt-2">
      <v-avatar size="48">
        <VImg alt="John" :src="resolveAvatarUrl(data?.data?.user!,$config.public.uploadsPath,appConfig.dummyAvatarUrl)" />
      </v-avatar>
      <div class="d-flex flex-column text-on-background">
        <NuxtLink
          variant="text"
          @click.stop=""
          :href="routes.web.user.index(data?.data?.user?.userName || '')"
          >{{ data?.data?.user?.fullName }}
        </NuxtLink>

        <div class="text-caption">
          {{ new Date(data?.data?.createdAt || "").toDateString() }}
        </div>
      </div>
    </div>

    <br />
    <v-divider></v-divider>
    <div class="d-flex justify-space-between flex-wrap pa-2">
      <VBtnGroup>
        <VBtn
          variant="text"
          rounded="lg"
          icon="mdi-chat-outline"
          :text="data?.data?._count?.comment"
        />
        <VBtn
          variant="text"
          rounded="lg"
          icon="mdi-export-variant"
          :text="data?.data?._count?.comment"
        />
      </VBtnGroup>
      <VChipGroup>
        <VChip
          v-for="tag in data?.data?.tags"
          :text="tag.name"
          variant="tonal"
          size="small"
          :to="routes.web.discussions.index() + `?tag=${tag.id}`"
        />
      </VChipGroup>
    </div>

    <br />
    <DisplayHtmlContent
      :content="data?.data?.desc || ''"
      :unique-id="'discussion-' + data?.data?.id"
    />
    <br />
    <VDivider />
    <br />
    <ViewsDiscussionsComments
      :discussion-id="(id as string)"
      :comment-count="data?.data?._count.comment"
    />
  </v-container>
</template>
