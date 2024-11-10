<script setup lang="ts">
import type { Project } from "~/utils/types/modals";

const appConfig = useAppConfig();

defineProps<{
  project: Project;
}>();
</script>

<template>
  <v-card
    class="border-none bg-background pa-4"
    :to="routes.web.portfolio.view(project.id)"
  >
    <v-row
      no-gutters
      :class="{ 'flex-column': $vuetify.display.smAndDown ? true : false }"
    >
      <v-col :cols="$vuetify.display.smAndDown ? 12 : 6">
        <v-img
          height="300px"
          class="rounded-xl elevation-10"
          :src="
            project?.thumbnail
              ? $config.public.uploadsPath + project?.thumbnail?.url
              : appConfig.noImageUrl
          "
          cover
        ></v-img>
      </v-col>
      <v-col :cols="$vuetify.display.smAndDown ? 12 : 6">
        <div>
          <v-card-item>
            <div class="d-flex ga-2 mt-2">
              <v-chip
                v-if="project?.tags"
                v-for="tag in project.tags"
                size="small"
                rounded="md"
                color="info"
                variant="outlined"
              >
                {{ tag.name }}
              </v-chip>
            </div>
          </v-card-item>

          <v-card-title class="text-h5">
            {{ project.title }}
          </v-card-title>

          <v-card-text
            class="text-body-1 line-clamp-4 text-medium-emphasis"
            style="max-height: 90px"
          >
            {{ project.shortDesc }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="text"
              append-icon="mdi-arrow-right"
              :to="routes.web.portfolio.view(project.id)"
              nuxt
            >
              View Project
            </v-btn>
          </v-card-actions>

          <br />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
