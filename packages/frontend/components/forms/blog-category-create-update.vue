<script setup lang="ts">
import type { BlogCategory } from "~/utils/types/modals";
import type { Media } from "../media-gallery";

const props = defineProps<{
  blogCategory?: BlogCategory;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();

const media = ref<Media[]>(
  props?.blogCategory?.icon ? [props?.blogCategory?.icon] : [],
);

const form = reactive({
  name: props?.blogCategory?.name || "",
  desc: props?.blogCategory?.desc || "",
});

const createBlogCategory = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.blogCategory.create()
      : apiRoutes.blogCategory.update(props.blogCategory?.id!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: {
        ...toRaw(form),
        iconsMediaId: media.value ? media.value[0]?.id : undefined,
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.blogCategories.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createBlogCategory();
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
          label="Category Name"
          placeholder="Category Name"
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

      <!-- create blogCategory -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create" : "Update" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
