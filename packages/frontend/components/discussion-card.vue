<script setup lang="ts">
import type { Blog } from "~/utils/types/modals";

// const appConfig = useAppConfig();

// defineProps<{
//   horzontal: boolean;
//   blog: Blog;
// }>();
</script>

<template>
  <v-card
    class="mx-auto bg-background"
    subtitle="prepend-icon and append-icon"
    :to="routes.web.discussions.view(1)"
  >
    <template #title>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quis
      earum magni, excepturi fugiat ex architecto quas officiis aperiam beatae.
    </template>
    <template #subtitle>
      <div class="d-flex flex-wrap ga-2 alighn-center">
        <div>John Doe</div>
        <div class="text-caption text-center">2 days ego</div>
      </div>
    </template>
    <template #prepend>
      <v-avatar>
        <v-img
          alt="John"
          src="https://cdn.vuetifyjs.com/images/john.jpg"
        ></v-img>
      </v-avatar>
    </template>
    <v-card-text class="line-clamp-4 pa-2" style="max-height: 92px"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis fugiat fuga
      dicta error sed libero quas consequuntur quia, possimus voluptates?
    </v-card-text>
    <v-card-action>
      <div class="pa-3 d-flex justify-space-between flex-wrap-reverse ga-2">
        <div class="d-flex ga-2">
          <v-tooltip text="Likes">
            <template #activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-heart" size="small">
                7
              </v-chip>
            </template>
          </v-tooltip>
          <v-tooltip text="Replies">
            <template #activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-message" size="small">
                2
              </v-chip>
            </template>
          </v-tooltip>
          <v-tooltip text="Impressions">
            <template #activator="{ props }">
              <v-chip v-bind="props" prepend-icon="mdi-eye" size="small">
                2
              </v-chip>
            </template>
          </v-tooltip>
        </div>
        <div>
          <v-chip size="small">Adonis Js</v-chip>
        </div>
      </div>
    </v-card-action>
  </v-card>
</template>
