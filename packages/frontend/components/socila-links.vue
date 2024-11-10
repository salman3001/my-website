<script setup land="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="d-flex ga-2">
    <v-btn
      icon="mdi-github"
      color="none"
      size="small"
      variant="tonal"
      :href="appConfig.socialLinks.github"
      target="_blank"
    ></v-btn>
    <v-btn
      icon="mdi-youtube"
      color="none"
      size="small"
      variant="tonal"
      :href="appConfig.socialLinks.youtube"
      target="_blank"
    ></v-btn>
    <v-btn
      icon="mdi-linkedin"
      color="none"
      size="small"
      variant="tonal"
      :href="appConfig.socialLinks.linkedIn"
      target="_blank"
    ></v-btn>
    <v-btn
      icon="mdi-web"
      color="none"
      size="small"
      variant="tonal"
      :href="appConfig.socialLinks.website"
      target="_blank"
    ></v-btn>
  </div>
</template>
