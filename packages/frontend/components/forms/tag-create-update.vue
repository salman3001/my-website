<script setup lang="ts">
import type { Tag } from "~/utils/types/modals";
import type { Media } from "../media-gallery";

const props = defineProps<{
  tag?: Tag;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();

const media = ref<Media[]>(props?.tag?.icon ? [props?.tag?.icon] : []);

const form = reactive({
  name: props?.tag?.name || "",
  desc: props?.tag?.desc || "",
});

const createTag = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.tags.create()
      : apiRoutes.tags.update(props.tag?.id!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: {
        ...toRaw(form),
        iconsMediaId: media.value ? media.value[0]?.id : undefined,
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.tags.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createTag();
      }
    "
  >
    <VRow>
      <!-- Icon -->
      <VCol cols="12">
        <MediaGalleryModal name="mediaIconId" v-model="media" />
      </VCol>

      <!-- Name -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.name"
          autofocus
          label="Tag Name"
          placeholder="Tag Name"
          :error-messages="errors?.name?._errors"
        />
      </VCol>

      <!-- Short Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.desc"
          label="Short Description"
          :error-messages="errors?.desc?._errors"
        />
      </VCol>

      <!-- create tag -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create" : "Update" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
