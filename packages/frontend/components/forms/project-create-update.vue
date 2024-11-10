<script setup lang="ts">
import type { Media } from "~/components/media-gallery";
import type { IResType } from "~/utils/types";
import type { Project, Tag } from "~/utils/types/modals";

const props = defineProps<{
  project?: Project;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();

const { data: tags } = await useFetcherGet<
  IResType<{ data: Tag[]; count: number }>
>(apiRoutes.tags.index(), {
  query: {
    take: 1000,
  },
});

const images = ref<Media[]>(
  props?.project?.images ? props?.project?.images : [],
);

const thumbnails = ref<Media[]>(
  props?.project?.thumbnail ? [props?.project?.thumbnail] : [],
);

const form = reactive({
  title: props?.project?.title || "",
  shortDesc: props?.project?.shortDesc || "",
  desc: props?.project?.desc || "",
  isPublished: props?.project?.isPublished || false,
  video: props?.project?.video || "",
  tagIds: props?.project?.tags?.map((tag) => tag.id) || [],
});

const createProject = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.projects.create()
      : apiRoutes.projects.update(props.project?.id!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: {
        ...toRaw(form),
        imagesIds: images.value ? images.value.map((m) => m.id) : [],
        thumbnailId:
          thumbnails.value.length > 0 ? thumbnails.value[0]?.id : undefined,
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.projects.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createProject();
      }
    "
  >
    <VRow>
      <!-- Thumbnails -->
      <VCol cols="12">
        <div class="pb-1">Thumbnail</div>
        <MediaGalleryModal name="thumbnailId" v-model="thumbnails" />
      </VCol>

      <!-- Images -->
      <VCol cols="12">
        <div class="pb-1">Images</div>
        <MediaGalleryModal name="imagesIds" v-model="images" />
      </VCol>

      <!-- Title -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.title"
          autofocus
          label="Title"
          placeholder="Project Title"
          :error-messages="errors?.title?._errors"
        />
      </VCol>

      <!-- tags -->
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.tagIds"
          label="Tags"
          placeholder="Select Tags"
          :error-messages="errors?.tagIds?._errors"
          :items="tags?.data?.data || []"
          item-title="name"
          item-value="id"
          multiple
        />
      </VCol>

      <!-- Publish -->
      <VCol cols="12" md="6">
        <VCheckbox
          v-model="form.isPublished"
          :error-messages="errors?.isPublished?._errors"
          label="Pusblish"
        />
      </VCol>

      <!-- video -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.video"
          label="Video Url"
          placeholder="Video Url"
          :error-messages="errors?.video?._errors"
        />
      </VCol>

      <!-- Short Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.shortDesc"
          label="Short Description"
          :error-messages="errors?.shortDesc?._errors"
        />
      </VCol>

      <!-- Long Desc -->
      <VCol cols="12">
        <TipTapEditor v-model="form.desc" />
      </VCol>

      <!-- create project -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create Project" : "Update Project" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
