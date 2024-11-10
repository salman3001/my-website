<script setup lang="ts">
import { AuthMenuItems } from "~/utils/constants/auth-menu-items";

const { user, setAuth } = useAuth();
</script>
<template>
  <v-menu v-if="user">
    <template v-slot:activator="{ props }">
      <v-avatar
        image="/images/dummy-avatar.jpg"
        variant="text"
        v-bind="props"
        class="cursor-pointer"
      ></v-avatar>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(menu, i) in AuthMenuItems"
        :key="i"
        :to="menu.href"
        nuxt
      >
        <v-list-item-title>{{ menu.name }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="() => setAuth(null, null)">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else :to="routes.auth.signin()" color="primary" nuxt>Login</v-btn>
</template>
