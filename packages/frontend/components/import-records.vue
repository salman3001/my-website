<script setup lang="ts">
const file = ref<File>();

const { exec, loading, errors } = useFetcher();

const submit = () => {
  const formData = new FormData();
  if (file.value) {
    formData.append("file", file.value);
  }

  exec(
    apiRoutes.backup.blogs(),
    {
      method: "post",
      body: formData,
    },
    {
      onSuccess() {
        file.value = undefined;
      },
    },
  );
};
</script>
<template>
  <div>
    <VFileInput
      title="Select XLSX"
      style="min-width: 25rem"
      v-model="file"
      label="Select XLSX File"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <template #append>
        <VBtn
          :disabled="!file || loading"
          @click="submit"
          variant="tonal"
          size="small"
          prepend-icon="mdi-upload"
          text="Upload XLSX"
          traget="_blank"
        />
      </template>
    </VFileInput>
  </div>
</template>
