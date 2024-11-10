<script setup lang="ts">
const { errors, exec, loading } = useFetcher();

const next = useRoute()?.query?.next;
const isPasswordVisible = ref(false);

const form = reactive({
  email: "",
});

const forgotPassword = async () => {
  exec(
    apiRoutes.auth.forgotPassword(),
    { method: "post", body: toRaw(form) },
    {
      onSuccess: (res) => {
        navigateTo(routes.auth.checkEmail());
      },
    },
  );
};
</script>

<template>
  <v-container>
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
            <h4 class="text-h4 mb-1">Forgot Password?</h4>
            <p class="mb-0">Please enter your email to reset</p>
          </VCardText>

          <VCardText>
            <VForm
              @submit.prevent="
                () => {
                  forgotPassword();
                }
              "
            >
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.email"
                    autofocus
                    label="Email"
                    type="email"
                    placeholder="johndoe@email.com"
                    :error-messages="errors?.email?._errors"
                  />
                </VCol>

                <VCol cols="12">
                  <VBtn block type="submit" color="primary" :disabled="loading">
                    Get OTP
                  </VBtn>
                </VCol>

                <!-- create account -->
                <VCol cols="12" class="text-center">
                  <span>New on our platform?</span>

                  <NuxtLink
                    class="text-primary ms-2"
                    :to="routes.auth.signup()"
                  >
                    Create an account
                  </NuxtLink>
                </VCol>
                <VCol cols="12" class="d-flex align-center">
                  <VDivider />
                  <span class="mx-4">or</span>
                  <VDivider />
                </VCol>

                <!-- auth providers -->
                <VCol cols="12" class="text-center">
                  <!-- <ViewsWebAuthenticationAuthProvider /> -->
                  <SocialAuth />
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </v-container>
</template>
