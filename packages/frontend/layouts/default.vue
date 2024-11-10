<script setup lang="ts">
import { useTheme } from "vuetify";
import AuthMenu from "~/components/auth-menu.vue";
import { NavMenus } from "~/utils/constants/nav-menus";

const drawer = ref(false);
const sideMenuGroups = ref([]);
const { user } = useAuth();
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" class="pr-2 glass border-b-md">
      <v-app-bar-nav-icon
        :color="$vuetify.theme.global.name === 'dark' ? 'white' : 'black'"
        @click.stop="drawer = !drawer"
        v-if="$vuetify.display.smAndDown"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer> -->

      <v-row
        style="max-width: max-content"
        v-if="$vuetify.display.mdAndUp"
        no-gutters
      >
        <v-col v-for="(menu, i) in NavMenus">
          <v-menu
            open-on-hover
            v-if="
              menu?.child &&
              (menu?.userAllowed ? menu?.userAllowed(user) : true)
            "
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                append-icon="mdi-chevron-down"
                :color="
                  $vuetify.theme.global.name === 'dark' ? 'white' : 'black'
                "
                variant="text"
                active-color="primary-darken-1"
              >
                {{ menu.name }}
              </v-btn>
            </template>

            <v-list density="compact">
              <template v-for="(subMenu, index) in menu.child">
                <v-list-item
                  v-if="
                    subMenu?.userAllowed ? subMenu?.userAllowed(user) : true
                  "
                  :to="subMenu.href"
                  :key="index"
                  nuxt
                >
                  <v-list-item-title>{{ subMenu.name }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
          <v-btn
            v-else-if="menu?.userAllowed ? menu?.userAllowed(user) : true"
            :to="menu.href"
            nuxt
            :color="$vuetify.theme.global.name === 'dark' ? 'white' : 'black'"
            variant="text"
            active-color="primary"
          >
            {{ menu.name }}
          </v-btn>
        </v-col>
      </v-row>
      <div class="d-flex ga-1 align-center">
        <template v-if="$vuetify.display.mdAndUp">
          <v-btn
            icon="mdi-magnify"
            :color="$vuetify.theme.global.name === 'dark' ? 'white' : 'black'"
            class="text-black"
          ></v-btn>
        </template>
        <ThemeSwitcher />
        <AuthMenu />
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list v-model:opened="sideMenuGroups">
        <template v-for="(menu, i) in NavMenus" :key="i">
          <v-list-group
            v-if="
              menu.child && (menu?.userAllowed ? menu?.userAllowed(user) : true)
            "
            :value="menu.name"
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="menu.name" />
            </template>
            <template v-for="subMenu in menu.child">
              <v-list-item
                v-if="subMenu?.userAllowed ? subMenu?.userAllowed(user) : true"
                :title="subMenu.name"
                :to="subMenu.href"
                nuxt
              />
            </template>
          </v-list-group>

          <v-list-item
            v-else-if="menu?.userAllowed ? menu?.userAllowed(user) : true"
            :to="menu.href"
            nuxt
            >{{ menu.name }}</v-list-item
          >
        </template>
        <!-- <v-list-group value="User">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="User" />
          </template>
          <v-list-item
            v-for="menu in AuthMenuItems"
            :title="menu.name"
            :to="menu.href"
            nuxt
          />
        </v-list-group> -->
      </v-list>
    </v-navigation-drawer>

    <v-main max-height="100vh">
      <div style="min-height: 70vh">
        <slot />
      </div>
      <Footer />
    </v-main>
  </v-layout>
</template>

<style>
.glass {
  background: rgba(var(--v-theme-primary) 0.4) !important;
  /* border-radius: 16px !important; */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}
</style>
