<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";

const appConfig = useAppConfig();

const search = ref("");
const debaouncedSearch = debouncedRef(search, 1000);
const perPage = ref(10);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));
const orderBy = ref<string>();

const { data, refresh: refreshProjects } = await useFetcherGet<
  IResType<{ data: Project[]; count: number }>
>(apiRoutes.projects.index(), {
  query: {
    skip: skip,
    take: perPage,
    search: debaouncedSearch,
    select: ["id", "title", "images", "tags", "isPublished"],
    orderBy: orderBy,
  },
});

const { exec: destroy } = useFetcher();

// Data table Headers
const headers = [
  { title: "Title", key: "title" },
  { title: "Tags", key: "tags", sortable: false },
  { title: "Status", key: "isPublished" },
  { title: "Action", key: "actions", sortable: false },
];
</script>

<template>
  <VContainer>
    <br />
    <VCard>
      <!-- 👉 Order Table -->
      <VDataTableServer
        v-model:items-per-page="perPage"
        v-model:page="page"
        :headers="headers"
        :items="data?.data?.data"
        item-value="order"
        :items-length="data?.data?.count || 0"
        show-select
        class="text-no-wrap"
        @update:sort-by="
          (v) => {
            if (v?.length > 0) {
              orderBy = `${v[0]['key']}:${v[0]['order']}`;
            }
          }
        "
      >
        <template #top>
          <h1 class="pa-4 text-h5">Projects</h1>
          <div
            class="d-flex justify-sm-space-between justify-start flex-wrap ga-2 pa-4"
          >
            <v-text-field
              v-model="search"
              placeholder="Search Projects"
              style="max-inline-size: 200px; min-inline-size: 200px"
              hide-details
            />

            <div class="d-flex ga-2 align-center flex-wrap">
              <v-select
                v-model="perPage"
                style="min-inline-size: 6.25rem"
                :items="[5, 10, 20, 50, 100]"
                hide-details
              />
              <VBtn variant="tonal" prepend-icon="mdi-upload" text="Export" />
              <VBtn
                prepend-icon="mdi-plus"
                text="Create Project"
                :to="routes.admin.projects.create()"
                nuxt
              />
            </div>
          </div>
        </template>
        <!-- Title-->
        <template #item.title="{ item }">
          <v-card width="200" class="ma-2 ma-0" density="compact">
            <v-card-text class="pa-0">
              <VImg
                v-if="item?.images && item?.images.length > 0"
                :src="$config.public.uploadsPath + item?.images[0].url"
              />
              <VImg v-else :src="appConfig.noImageUrl" />
            </v-card-text>
            <v-card-title class="text-body-2" style="height: 50px">
              {{ item.title }}
            </v-card-title>
          </v-card>
        </template>

        <!-- Tags -->
        <template #item.tags="{ item }">
          <div class="d-flex ga-1">
            <VChip
              v-for="tag in item.tags"
              label
              size="small"
              :text="tag.name"
              color="info"
            />
          </div>
        </template>

        <!-- Status -->
        <template #item.isPublished="{ item }">
          <VChip
            v-if="item.isPublished"
            label
            size="small"
            text="Published"
            color="success"
          />
          <VChip v-else label size="small" text="Draft" color="warning" />
        </template>
        <!-- Actions -->
        <template #item.actions="{ item }">
          <VIcon icon="tabler-dots-vertical" />
          <VMenu activator="parent">
            <template #activator="{ props }">
              <VBtn
                size="small"
                variant="text"
                v-bind="props"
                icon="mdi-dots-vertical"
              >
              </VBtn>
            </template>
            <VList density="compact" slim>
              <VListItem
                slim
                value="view"
                prepend-icon="mdi-eye"
                :to="routes.admin.projects.view(item.id)"
                nuxt
              >
                View
              </VListItem>
              <VListItem
                slim
                value="Edit"
                prepend-icon="mdi-pencil"
                :to="routes.admin.projects.edit(item.id)"
                nuxt
              >
                Edit
              </VListItem>
              <DialogsConfirm
                @confirm="
                  async () => {
                    await destroy(apiRoutes.projects.delete(item.id), {
                      method: 'delete',
                    });
                    refreshProjects();
                  }
                "
              >
                <template #default="{ props }">
                  <VListItem
                    v-bind="props"
                    slim
                    value="Delete"
                    prepend-icon="mdi-delete"
                  >
                    Delete
                  </VListItem>
                </template>
              </DialogsConfirm>
            </VList>
          </VMenu>
        </template>

        <!-- pagination -->
        <template #bottom>
          <TablePagination
            :page="Number(page)"
            :items-per-page="Number(perPage)"
            :total-items="Number(data?.data?.count)"
            @update:page="
              (p) => {
                page = p;
              }
            "
          />
        </template>
      </VDataTableServer>
    </VCard>
    <br />
  </VContainer>
</template>
