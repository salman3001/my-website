<script setup lang="ts">
import { usePreferredColorScheme } from "@vueuse/core";
import { useTheme } from "vuetify";

const veutifyTheme = useTheme();
const prefredScheme = usePreferredColorScheme();
const theme = useCookie("theme");

function toggleTheme(themeName: "light" | "dark" | "system") {
  if (themeName === "system") {
    veutifyTheme.global.name.value = prefredScheme.value ? "dark" : "light";
  }
  veutifyTheme.global.name.value = themeName;
  theme.value = themeName;
}

const themes: { name: "light" | "dark" | "system"; icon: string }[] = [
  {
    name: "light",
    icon: "mdi-white-balance-sunny",
  },
  {
    name: "dark",
    icon: "mdi-weather-night",
  },
  {
    name: "system",
    icon: "mdi-laptop",
  },
];

const selectedItem = ref([theme.value]);

// Update icon if theme is changed from other sources
watch(
  theme,
  () => {
    selectedItem.value = [theme.value];
  },
  { deep: true },
);
</script>

<template>
  <v-btn
    icon
    :color="$vuetify.theme.global.name === 'dark' ? 'white' : 'grey-700'"
  >
    <VIcon :icon="themes.find((t) => t.name === theme)?.icon" size="24" />

    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ theme }}</span>
    </VTooltip>

    <VMenu activator="parent" offset="12px" :width="180">
      <VList v-model:selected="selectedItem" mandatory>
        <VListItem
          v-for="{ name, icon } in themes"
          :key="name"
          :value="name"
          :prepend-icon="icon"
          color="primary"
          class="text-capitalize"
          @click="toggleTheme(name)"
        >
          {{ name }}
        </VListItem>
      </VList>
    </VMenu>
  </v-btn>
</template>
