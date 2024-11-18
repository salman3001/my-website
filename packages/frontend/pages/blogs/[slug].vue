<script setup lang="ts">
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

const drawer = ref(false);
const isCommentsDrawerDisabled = ref(true);
const togelDrawer = () => (drawer.value = !drawer.value);

const timeOut = setTimeout(() => {
  isCommentsDrawerDisabled.value = false;
}, 1000);

onUnmounted(() => {
  clearTimeout(timeOut);
});
</script>

<template>
  <Teleport :disabled="isCommentsDrawerDisabled" to="[main-layout]">
    <v-navigation-drawer
      width="500"
      v-model="drawer"
      :location="$vuetify.display.smAndDown ? 'bottom' : 'right'"
      temporary
      sticky
      floating
      :style="{ marginTop: $vuetify.display.smAndDown ? '5rem' : 'auto' }"
    >
      <div :class="$vuetify.display.smAndDown ? 'text-end px-1' : 'px-1'">
        <VBtn
          icon="mdi-close"
          variant="text"
          rounded="sm"
          @click="drawer = false"
        />
      </div>
      <ViewsBlogsComments
        :blog-id="data?.data?.id || ''"
        :comment-count="data?.data?._count?.comment"
      />
    </v-navigation-drawer>
  </Teleport>

  <v-container max-width="1100">
    <br />
    <h1>{{ data?.data?.title }}</h1>
    <p class="text-h6 text-medium-emphasis">{{ data?.data?.shortDesc }}</p>
    <br />
    <div class="d-flex ga-4">
      <v-avatar size="48">
        <v-img
          alt="John"
          src="https://cdn.vuetifyjs.com/images/john.jpg"
        ></v-img>
      </v-avatar>
      <div class="d-flex flex-column text-on-background">
        <NuxtLink
          variant="text"
          @click.stop=""
          :href="apiRoutes.users.publicProfile(data?.data?.author?.userName!)"
          >{{ data?.data?.author.fullName }}</NuxtLink
        >
        <div class="d-flex flex-wrap ga-2 text-medium-emphasis text-caption">
          <div class="">
            Published in
            <NuxtLink v-if="data?.data?.blogCategory?.name">{{
              data?.data?.blogCategory?.name
            }}</NuxtLink>
            <span v-else>No Category</span>
          </div>
          <div>
            6 min read .
            {{ new Date(data?.data?.createdAt || "").toDateString() }}
          </div>
        </div>
      </div>
    </div>
    <br />
    <v-divider></v-divider>
    <div class="d-flex flex-wrap-reverse justify-space-between py-2">
      <div>
        <v-btn variant="text"
          ><v-icon icon="mdi-heart-outline"></v-icon>20</v-btn
        >
        <v-btn variant="text" @click="togelDrawer"
          ><v-icon icon="mdi-chat-outline"></v-icon
          >{{ data?.data?._count?.comment }}</v-btn
        >
      </div>
      <div>
        <v-btn variant="text"
          ><v-icon icon="mdi-export-variant"></v-icon
        ></v-btn>
        <v-btn variant="text"
          ><v-icon icon="mdi-bookmark-outline"></v-icon
        ></v-btn>
      </div>
    </div>
    <v-divider></v-divider>
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
    <DisplayHtmlContent
      :content="data?.data?.longDesc || ''"
      :unique-id="'blog-' + data?.data?.id"
    />
    <br />
  </v-container>
</template>
