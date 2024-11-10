<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Tag } from "~/utils/types/modals";

const tagId = ref("");

const { data: tags } = await useFetcherGet<
  IResType<{ count: number; data: Tag[] }>
>(apiRoutes.tags.index(), {
  query: {
    select: ["name", "id"],
    orderBy: "name:asc",
    take: 1000,
    skip: 0,
  },
});
</script>
<template>
  <br />
  <v-container max-width="1280">
    <v-card class="py-10">
      <v-card-item>
        <div
          class="d-flex ga-10"
          :class="{
            'flex-column': $vuetify.display.smAndDown,
            'align-center': $vuetify.display.smAndDown,
            'text-center': $vuetify.display.smAndDown,
          }"
        >
          <div>
            <v-avatar color="grey" rounded="lg" size="150">
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                cover
              ></v-img>
            </v-avatar>
          </div>
          <div class="d-flex flex-column ga-4">
            <h2>Welcome to my Portfolio!</h2>
            <p class="text-medium-emphasis">
              As a full-stack developer with expertise in Node.js, Vue.js, and
              React, I deliver top-tier, production-ready solutions. My
              experience spans building scalable, high-performance applications
              that cater to both client and user needs. From front-end
              interfaces to back-end logic, I provide seamless integration
              across the entire development stack. I thrive on innovation,
              ensuring that every project not only meets expectations but
              exceeds them.
            </p>
            <div
              class="d-flex align-center ga-4 flex-wrap"
              :class="{ 'justify-center': $vuetify.display.smAndDown }"
            >
              <div>
                <socila-links></socila-links>
              </div>
              <div>
                <v-btn append-icon="mdi-download">Resume</v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>
    <br />
    <br />
    <br />
    <div class="d-flex justify-space-between align-center flex-wrap">
      <h1>Projects</h1>

      <div class="d-flex ga-2 align-center flex-wrap">
        <v-select
          style="min-inline-size: 200px"
          placeholder="Topics"
          v-model="tagId"
          :items="(tags?.data?.data || []).concat([{ name: 'By Category', id: '' } as any])"
          item-value="id"
          item-title="name"
          hide-details
        />
      </div>
    </div>
    <br />
    <br />
    <lists-projects :tag-id="tagId" />
  </v-container>
</template>
