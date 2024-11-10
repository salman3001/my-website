<script setup lang="ts"></script>

<template>
  <v-container max-width="1280">
    <div class="py-2">
      <Logo color="dark" />
    </div>
    <VRow no-gutters class="bg-surface">
      <VCol md="8" class="d-none d-md-flex">
        <div class="position-relative bg-background w-100 me-0 bg-background">
          <div
            class="d-flex align-center justify-center w-100 h-100"
            style="padding-inline: 6.25rem"
          >
            <VImg
              max-width="613"
              src="/images/bg-1.avif"
              class="auth-illustration mt-16 mb-2"
            />
          </div>
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h4 class="text-h4 mb-1">Please check your email</h4>
          </VCardText>

          <VCardText>
            <VRow>
              <VCol cols="12" class="text-center">
                <VBtn class="ms-2" :to="routes.auth.signin()" nuxt>
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </v-container>
</template>
