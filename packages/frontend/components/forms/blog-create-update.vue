<script setup lang="ts">
import type { Media } from "~/components/media-gallery";
import type { IResType } from "~/utils/types";
import type { Blog, BlogCategory, Tag } from "~/utils/types/modals";

const props = defineProps<{
  blog?: Blog;
  type: "update" | "create";
}>();

const { errors, exec, loading } = useFetcher();

const { data: categories } = await useFetcherGet<
  IResType<{ data: BlogCategory[]; count: number }>
>(apiRoutes.blogCategory.index(), {
  query: {
    take: 1000,
  },
});

const { data: tags } = await useFetcherGet<
  IResType<{ data: Tag[]; count: number }>
>(apiRoutes.tags.index(), {
  query: {
    take: 1000,
  },
});

const media = ref<Media[]>(props?.blog?.image ? [props?.blog?.image] : []);

const form = reactive({
  title: props?.blog?.title || "",
  shortDesc: props?.blog?.shortDesc || "",
  longDesc: props?.blog?.longDesc || "",
  isPublished: props?.blog?.isPublished || false,
  isFeatured: props?.blog?.isFeatured || false,
  blogCategoryId: props?.blog?.blogCategoryId || "",
  tagIds: props?.blog?.tags?.map((t) => t.id) || [],
  seo: {
    title: props?.blog?.seo?.title || "",
    keyword: props?.blog?.seo?.keyword || "",
    desc: props?.blog?.seo?.desc || "",
  },
});

const createBlog = async () => {
  exec(
    props.type === "create"
      ? apiRoutes.blogs.create()
      : apiRoutes.blogs.update(props.blog?.id!),
    {
      method: props.type === "create" ? "post" : "patch",
      body: {
        ...toRaw(form),
        mediaId: media.value ? media.value[0]?.id : undefined,
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.admin.blogs.index());
      },
    },
  );
};
</script>

<template>
  <VForm
    @submit.prevent="
      () => {
        createBlog();
      }
    "
  >
    <VRow>
      <!-- Thumbnail -->
      <VCol cols="12">
        <MediaGalleryModal name="mediaId" v-model="media" />
      </VCol>

      <!-- Title -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.title"
          autofocus
          label="Title"
          placeholder="Blog Title"
          :error-messages="errors?.title?._errors"
        />
      </VCol>

      <!-- Category -->
      <VCol cols="12" md="6">
        <VSelect
          v-model="form.blogCategoryId"
          label="Category"
          placeholder="Select Category"
          :error-messages="errors?.blogCategoryId?._errors"
          :items="categories?.data?.data || []"
          item-title="name"
          item-value="id"
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

      <!-- Featured -->
      <VCol cols="12" md="6">
        <VCheckbox
          v-model="form.isFeatured"
          :error-messages="errors?.isFeatured?._errors"
          label="Featured"
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
        <!-- <MarkDownEditor v-model="form.longDesc" /> -->
        <MyCkEditor v-model="form.longDesc" />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.seo.title"
          label="Seo Title"
          placeholder="Seo Title"
          :error-messages="errors?.seo?.title?._errors"
        />
      </VCol>

      <VCol cols="12" md="6">
        <VTextField
          v-model="form.seo.keyword"
          label="Seo Keywords"
          placeholder="Seo Keywords"
          :error-messages="errors?.seo?.keyword?._errors"
        />
      </VCol>

      <!-- Seo Desc -->
      <VCol cols="12">
        <VTextarea
          v-model="form.seo.desc"
          label="SEO Description"
          :error-messages="errors?.seo?.desc?._errors"
        />
      </VCol>

      <!-- create Blog -->
      <VCol cols="12" class="text-end">
        <VBtn type="submit" color="primary" :disabled="loading">
          {{ type === "create" ? "Create Blog" : "Update Blog" }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
