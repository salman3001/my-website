<script setup lang="ts">
     const appConfig = useAppConfig()
     const basePath = window.location.origin
</script>
<template>
<div id="g_id_onload"
     :data-client_id="appConfig.auth.googleClientId"
     data-context="signin"
     data-ux_mode="popup"
     :data-login_uri="basePath+routes.auth.signin()"
     data-itp_support="true">
</div>
</template>