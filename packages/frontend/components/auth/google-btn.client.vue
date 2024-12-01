<script setup lang="ts">
import { type CallbackTypes, GoogleLogin } from "vue3-google-login";

const callback: CallbackTypes.CredentialCallback = (response) => {
     // This callback will be triggered when the user selects or login to
     // his Google account from the popup
     console.log("Handle the response", response)
}
</script>

<template>
     <GoogleLogin :callback="callback" />
</template>