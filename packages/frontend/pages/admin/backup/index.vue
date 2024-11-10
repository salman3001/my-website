<script setup lang="ts">
const config = useRuntimeConfig();

const entityList = [
  {
    title: "Users",
    exportUrl: config.public.baseApi + apiRoutes.backup.users(),
  },
  {
    title: "Blogs",
    exportUrl: config.public.baseApi + apiRoutes.backup.blogs(),
  },
  {
    title: "Blog Categories",
    exportUrl: config.public.baseApi + apiRoutes.backup.blogCategories(),
  },
  {
    title: "Blogs Comments",
    exportUrl: config.public.baseApi + apiRoutes.backup.blogComments(),
  },
  {
    title: "Contact Messages",
    exportUrl: config.public.baseApi + apiRoutes.backup.contactMessage(),
  },
  {
    title: "discussions",
    exportUrl: config.public.baseApi + apiRoutes.backup.discussions(),
  },
  {
    title: "Discussion Comments",
    exportUrl: config.public.baseApi + apiRoutes.backup.discussionComments(),
  },
  {
    title: "Email Subscriptions",
    exportUrl: config.public.baseApi + apiRoutes.backup.emailSubscriptions(),
  },
  {
    title: "Media",
    exportUrl: config.public.baseApi + apiRoutes.backup.media(),
  },
  {
    title: "Media Categories",
    exportUrl: config.public.baseApi + apiRoutes.backup.mediaMategory(),
  },
  {
    title: "Projects",
    exportUrl: config.public.baseApi + apiRoutes.backup.projects(),
  },
  {
    title: "Profiles",
    exportUrl: config.public.baseApi + apiRoutes.backup.profiles(),
  },
  {
    title: "Tags",
    exportUrl: config.public.baseApi + apiRoutes.backup.tags(),
  },
];
</script>

<template>
  <br />
  <v-container max-width="1280">
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.web.home()"
      />
      <h1>Backup</h1>
    </div>
    <br />
    <div>
      <v-table style="max-width: 50rem" class="border pa-4 rounded-lg">
        <tbody>
          <!-- blogs -->
          <tr v-for="entity in entityList" :key="entity.title">
            <td class="text-h6">{{ entity.title }}</td>
            <td>
              <export-records :export-url="entity.exportUrl" />
            </td>
            <td>
              <import-records />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>
