<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import type { IResType } from "~/utils/types";
import type { ContactMessage } from "~/utils/types/modals";

const search = ref("");
const debaouncedSearch = debouncedRef(search, 1000);
const perPage = ref(10);
const page = ref(1);
const skip = computed(() => perPage.value * (page.value - 1));
const orderBy = ref<string>();

const { data, refresh: refreshMessages } = await useFetcherGet<
  IResType<{ data: ContactMessage[]; count: number }>
>(apiRoutes.contactMessage.index(), {
  query: {
    skip: skip,
    take: perPage,
    search: debaouncedSearch,
    select: ["id", "email", "phone", "message", "createdAt"],
    orderBy: orderBy,
  },
});

const { exec: destroy } = useFetcher();

// Data table Headers
const headers = [
  { title: "Email", key: "email", sortable: false },
  { title: "Phone", key: "phone", sortable: false },
  { title: "Message", key: "message", sortable: false },
  { title: "Date", key: "createdAt" },
  { title: "Action", key: "actions", sortable: false },
];
</script>

<template>
  <VContainer>
    <br />
    <VCard>
      <VDivider />

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
          <h1 class="pa-4 text-h5">Contact Messages</h1>
          <div
            class="d-flex justify-sm-space-between justify-start flex-wrap ga-2 pa-4"
          >
            <v-text-field
              v-model="search"
              placeholder="Search Tags"
              style="max-inline-size: 200px; min-inline-size: 200px"
              hide-details
            />

            <div class="d-flex ga-2 align-center">
              <v-select
                v-model="perPage"
                style="min-inline-size: 6.25rem"
                :items="[5, 10, 20, 50, 100]"
                hide-details
              />
              <VBtn variant="tonal" prepend-icon="mdi-upload" text="Export" />
            </div>
          </div>
        </template>

        <!-- Name-->
        <template #item.email="{ item }">
          {{ item.email }}
        </template>

        <!-- Phone-->
        <template #item.phone="{ item }">
          {{ item.phone }}
        </template>

        <!-- Message-->
        <template #item.message="{ item }">
          {{ item.message }}
        </template>

        <!-- Date Time-->
        <template #item.createdAt="{ item }">
          {{ new Date(item.createdAt).toString() }}
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
              <DialogsConfirm
                @confirm="
                  async () => {
                    await destroy(apiRoutes.contactMessage.delete(item.id), {
                      method: 'delete',
                    });
                    refreshMessages();
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
