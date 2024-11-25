<script setup lang="ts">
const { errors, exec, loading } = useFetcher();
const { setAuth } = useAuth();

const next = useRoute()?.query?.next;
const isPasswordVisible = ref(false);

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  phone: "",
});

const signup = async () => {
  exec(
    apiRoutes.auth.signup(),
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
  <v-container max-width="1280">
    <div class="py-2">
      <Logo color="dark" />
    </div>
    <VRow no-gutters>
      <VCol md="8" class="d-none d-md-flex">
        <div class="position-relative w-100 me-0 ">
          <div class="d-flex align-center justify-center w-100 h-100" style="padding-inline: 6.25rem">
            <VImg max-width="613" src="/images/bg-1.avif" class="auth-illustration mt-16 mb-2" />
          </div>
        </div>
      </VCol>

      <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h4 class="text-h4 mb-1">
              Signup with
              <span class="text-capitalize"> {{ $config.public.appName }} </span>!
            </h4>
            <p class="mb-0">Please enter your details to sign up!</p>
          </VCardText>

          <VCardText>
            <VForm @submit.prevent="() => {
              signup();
            }
              ">
              <VRow>
                <!-- Full Name -->
                <VCol cols="12">
                  <VTextField v-model="form.fullName" autofocus label="Full Name" placeholder="Your Name"
                    :error-messages="errors?.full?._errors" />
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <VTextField v-model="form.email" label="Email" type="email" placeholder="johndoe@email.com"
                    :error-messages="errors?.email?._errors" />
                </VCol>

                <!-- Phone -->
                <VCol cols="12">
                  <VTextField v-model="form.phone" label="Phone" type="number" placeholder="971XXXXXXXXX"
                    :error-messages="errors?.phone?._errors" />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField v-model="form.password" label="Password" placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'" :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
                      " @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    :error-messages="errors?.password?._errors" />

                  <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                    <!-- <VCheckbox v-model="form.remember" label="Remember me" /> -->
                    <NuxtLink class="text-primary ms-2 mb-1" :to="routes.auth.forgotPassword()">
                      Forgot Password?
                    </NuxtLink>
                  </div>

                  <VBtn block type="submit" color="primary" :disabled="loading">
                    Signup
                  </VBtn>
                </VCol>

                <!-- create account -->
                <VCol cols="12" class="text-center">
                  <span>Already have an account?</span>

                  <NuxtLink class="text-primary ms-2" :to="routes.auth.signin()">
                    Signin
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
