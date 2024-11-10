<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const props = defineProps<{
  perPage?: number;
  select?: string[];
  orderBy?: string;
  blogCategoryId?: string;
  tagId?: string;
  showPagination?: boolean;
  isFeatured?: boolean;
  isPublished?: boolean;
}>();

const search = defineModel<string>("search");
const page = ref(1);
const skip = computed(() => (props?.perPage || 20) * (page.value - 1));
const debaouncedSearch = debouncedRef(search, 1000);

const isFeaturedQuery = computed(() =>
  props?.isFeatured ? props?.isFeatured : undefined,
);

const isPublishedQuery = computed(() =>
  props?.isPublished ? props?.isPublished : undefined,
);

const categoryIdQuery = computed(() => props?.blogCategoryId);
const tagIdQuery = computed(() => props?.tagId);

const { data, status } = await useFetcherGet<
  IResType<{ count: number; data: Blog[] }>
>(apiRoutes.blogs.index(), {
  query: {
    select: ["title", "id", "image", "blogCategory", "shortDesc"].concat(
      props?.select ? props.select : [],
    ),
    take: props.perPage,
    skip: skip,
    search: debaouncedSearch,
    orderBy: props.orderBy,
    blogCategoryId: categoryIdQuery,
    tagId: tagIdQuery,
    isFeatured: isFeaturedQuery,
    isPublished: isPublishedQuery,
  },
});
</script>

<template>
  <div v-if="data">
    <v-row>
      <v-col
        v-if="data?.data?.data"
        v-for="blog in data?.data?.data"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <BlogCard :blog="blog" :horzontal="false" />
      </v-col>
    </v-row>
    <br />
    <TablePagination
      class="pt-5"
      v-if="showPagination"
      :page="Number(page)"
      :items-per-page="Number(perPage)"
      :total-items="Number(data?.data?.count)"
      @update:page="
        (p) => {
          page = p;
        }
      "
    />
  </div>
  <Loader v-else type="card" />
</template>
