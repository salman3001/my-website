<script setup lang="ts"></script>

<template>
  <v-container max-width="1280" class="my-5 bg-background">
    <h2 class="py-5">
      Contact
      <p class="text-subtitle-1">Lets Connect! Submit your details</p>
    </h2>
    <br />
    <div class="d-flex justify-center">
      <VBtn text="Contact Here" variant="elevated" size="large" prepend-icon="mdi-handshake-outline"
        :to="routes.web.contact()" />
    </div>
  </v-container>
</template>
