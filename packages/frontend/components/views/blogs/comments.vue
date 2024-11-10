<script setup lang="ts">
defineProps<{
  blogId: string;
  commentCount: number;
}>();

const { user } = useAuth();
</script>

<template>
  <v-card class="bg-background py-8 border-none">
    <v-card-item class="text-h6 font-weight-bold">
      Join The discussion! ({{ commentCount }} comments)
    </v-card-item>
    <v-card-item v-if="!user">
      Please
      <NuxtLink
        class="text-primary"
        :to="routes.auth.signin() + `?next=${routes.web.blogs.view(blogId)}`"
        >Sign in</NuxtLink
      >
      or
      <NuxtLink class="text-primary" :to="routes.auth.signup()"
        >Sign up</NuxtLink
      >
      for free to join in on the dicussion.
    </v-card-item>
  </v-card>

  <br />
  <ListsComments :blog-Id="blogId" type="blog" :with-reply-form="true" />
</template>
