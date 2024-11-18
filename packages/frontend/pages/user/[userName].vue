<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Blog, User } from "~/utils/types/modals";

const { userName } = useRoute().params;

const { data } = await useFetcherGet<IResType<User>>(
  apiRoutes.users.publicProfile(userName as string),
  {},
);
</script>

<template>
  <br />
  <v-container max-width="1280">
    <h1 class="text-h4 font-weight-bold">{{ data?.data?.fullName }}</h1>
    <h2 class="text-h4 font-weight-bold">{{ data?.data?.userName }}</h2>
    <br />
    <p class="text-subtitle-1">{{ data?.data?.profile?.avatar }}</p>
    <br />
  </v-container>
</template>
