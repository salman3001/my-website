<script setup lang="ts">
import { onMounted } from "vue"
import { googleOneTap } from "vue3-google-login"

const { user } = useAuth()

onMounted(() => {

     if (!user.value) {
          console.log('ran');

          googleOneTap({ autoLogin: true })
               .then(((response) => {
                    // This promise is resolved when user selects an account from the the One Tap prompt
                    console.log("Handle the response", response)
               }))
               .catch((error) => {
                    console.log("Handle the error", error)
               })
     }
})

</script>

<template>
     <span></span>
</template>