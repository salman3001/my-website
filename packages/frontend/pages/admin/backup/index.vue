<script setup lang="ts">
const config = useRuntimeConfig();

const entityList = [
  {
    title: "Blogs",
    exportUrl: config.public.baseApi + apiRoutes.backup.blogs(),
  },
];
</script>

<template>
  <br />
  <v-container>
    <div class="d-flex justify-space-between align-center ga-4 flex-wrap">
      <h1>Backup</h1>
    </div>
    <br />
    <div>
      <v-table style="max-width: 50rem" class="border pa-4 rounded-lg">
        <tbody>
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
