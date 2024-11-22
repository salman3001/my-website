<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Tag } from "~/utils/types/modals";

const { errors, exec, loading } = useFetcher();

const { data: tags } = await useFetcherGet<
  IResType<{ data: Tag[]; count: number }>
>(apiRoutes.tags.index(), {
  query: {
    take: 1000,
  },
});

const form = reactive({
  title: "",
  desc: "",
  tagIds: [],
});

const createBlog = async () => {
  exec(
    apiRoutes.discussions.create(),

    {
      method: "post",
      body: {
        ...toRaw(form),
      },
    },
    {
      onSuccess: (res) => {
        navigateTo(routes.web.discussions.index());
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
      <!-- Title -->
      <VCol cols="12" md="6">
        <VTextField
          v-model="form.title"
          autofocus
          label="Title"
          placeholder="Discussion Title"
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

      <!--  Desc -->
      <VCol cols="12">
        <Suspense>
          <template #fallback> loading.. </template>
          <LazyTipTapEditor v-model="form.desc" :min-height="200" />
        </Suspense>
      </VCol>

      <!-- create Discussion -->
      <VCol cols="12" class="text-end">
        <VBtn
          type="submit"
          color="primary"
          :disabled="loading"
          text="Start Disucssion"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
