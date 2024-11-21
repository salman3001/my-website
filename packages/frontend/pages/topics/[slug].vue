<script setup lang="ts">
const { slug } = useRoute().params;

const search = ref("");



</script>
<template>
  <v-container max-width="1280">
    <div class="d-flex justify-space-between align-center ga-4 flex-wrap">
      <h1 style="text-transform: capitalize;">{{ (slug as string).replace('-', ' ') }}</h1>

      <div class="d-flex ga-2 align-center flex-wrap">
        <v-text-field v-model="search" placeholder="Search Blogs" style="max-inline-size: 200px; min-inline-size: 200px"
          hide-details append-inner-icon="mdi-magnify" />
      </div>
    </div>
    <br />
    <br />
    <ListsBlogs :per-page="20" :is-published="true" show-pagination v-model:search="search" :tag-id="(slug as string)" />
  </v-container>
</template>
