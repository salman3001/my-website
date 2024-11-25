<script setup lang="ts">
const query = useRoute().query

const { exec, loading, errors } = useFetcher()

const form = {
  jwt: query?.jwt
}

onMounted(async () => {
  await exec(apiRoutes.auth.confirmEmail(), {
    method: 'POST',
    body: form
  }, {
    onSuccess: () => {
      navigateTo(routes.auth.signin())
    }
  })
})

</script>

<template>
  <v-container max-width="1280">
    <div class="py-2">
      Verifying..
    </div>
  </v-container>
</template>
