<script setup lang="ts">
const { errors, exec, loading } = useFetcher();

const form = reactive({
  email: "",
  phone: "",
  message: "",
});

const createContactMessage = async () => {
  exec(
    apiRoutes.contactMessage.create(),

    {
      method: "post",
      body: {
        ...toRaw(form),
      },
    },
    {
      onSuccess: (res) => {
        form.email = "";
        form.phone = "";
        form.message = "";
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createContactMessage();
      }
    "
  >
    <VRow>
      <!-- Email -->
      <VCol cols="12" md="6">
        <VTextField
          type="email"
          v-model="form.email"
          autofocus
          label="Email"
          placeholder="Your Email"
          :error-messages="errors?.email?._errors"
        />
      </VCol>

      <!-- phone -->
      <VCol cols="12" md="6">
        <VTextField
          type="number"
          v-model="form.phone"
          label="Phone (Optional)"
          placeholder="Phone (Optional)"
          :error-messages="errors?.phone?._errors"
        />
      </VCol>

      <!-- Message -->

      <VCol cols="12">
        <VTextarea
          v-model="form.message"
          label="Message"
          placeholder="Message"
          :error-messages="errors?.message?._errors"
          rows="4"
        />
      </VCol>

      <!-- create  -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading"> Submit </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
