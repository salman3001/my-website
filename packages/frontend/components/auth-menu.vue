<script setup lang="ts">
import { AuthMenuItems } from "~/utils/constants/auth-menu-items";
import { googleLogout } from "vue3-google-login"

const { user, setAuth } = useAuth();
const appConfig = useAppConfig()

const logout = () => {
  setAuth(null, null);
  googleLogout()
  navigateTo(routes.web.home())
}
</script>
<template>
  <v-menu v-if="user">
    <template v-slot:activator="{ props }">
      <v-avatar
        :image="resolveAvatarUrl(user,$config.public.uploadsPath,appConfig.dummyAvatarUrl)"
        variant="text" v-bind="props" class="cursor-pointer"></v-avatar>
    </template>

    <v-list density="compact">
      <v-list-item v-for="(menu, i) in AuthMenuItems" :key="i" :to="menu.href" nuxt>
        <v-list-item-title>{{ menu.name }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else :to="routes.auth.signin()" color="primary" nuxt>Login</v-btn>
</template>
