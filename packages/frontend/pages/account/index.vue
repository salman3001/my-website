<script setup lang="ts">
import type { IResType } from '~/utils/types';
import type { User } from '~/utils/types/modals';


const activeTab = ref<'Account' | 'Security' | 'Notifications' | 'Wishlist' | 'Settings'>("Account")

const { data } = await useFetcherGet<IResType<User>>(apiRoutes.account.getUserDetails(), {})


// tabs
const tabs = [
  { title: 'Account', icon: 'tabler-users', tab: 'account', },
  { title: 'Security', icon: 'tabler-lock', tab: 'security' },
  {
    title: 'Notifications',
    icon: 'tabler-bell',
    tab: 'notification',

  },
  {
    title: 'Likes',
    icon: 'tabler-heart',
    tab: 'likes',

  },
  {
    title: 'Settings',
    icon: 'tabler-settings',
    tab: 'settings',
  },
]



</script>



<template>
  <VContainer max-width="1280px">
    <br />
    <div>
      <VTabs v-model="activeTab" class="v-tabs-pill" slider-color="primary" align-tabs="start">
        <VTab v-for="item in tabs" :key="item.icon" :value="item.title">
          <VIcon size="20" start :icon="item.icon" />
          {{ item.title }}
        </VTab>
      </VTabs>
      <br />


      <ClientOnly>
        <VWindow v-model="activeTab" class="mt-6 disable-tab-transition" :touch="false" v-if="data?.data">
          <!-- Account -->
          <VWindowItem value="Account">
            <ViewsAccountEdit :user="data?.data" />
          </VWindowItem>

          <VWindowItem value="Security">
            <ViewsAccountSecurity />
          </VWindowItem>

          <VWindowItem value="Notifications">
            <VAlert type="info" text="Comming soon..." variant="tonal" />
          </VWindowItem>

          <VWindowItem value="Likes">
            <VAlert type="info" text="Comming soon..." variant="tonal" />

          </VWindowItem>

          <VWindowItem value="Likes">
            <VAlert type="info" text="Comming soon..." variant="tonal" />
          </VWindowItem>

          <VWindowItem value="Settings">
            <VAlert type="info" text="Comming soon..." variant="tonal" />
          </VWindowItem>
        </VWindow>
      </ClientOnly>
    </div>
    <br>
    <br>
  </VContainer>
</template>
