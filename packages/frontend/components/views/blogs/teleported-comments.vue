<script setup lang="ts">
import type { Blog } from '~/utils/types/modals';


defineProps<{
    blog:Blog
}>()
const drawer = defineModel<boolean>({required:true})
const {mounted} = useAwaitTeleportTargetMount()


const isCommentsDrawerDisabled = ref(true);

const timeOut = setTimeout(() => {
  isCommentsDrawerDisabled.value = false;
}, 1000);

onUnmounted(() => {
  clearTimeout(timeOut);
});
</script>

<template>
    <Teleport :disabled="isCommentsDrawerDisabled" to="[main-layout]" v-if="mounted">
      <v-navigation-drawer width="500" v-model="drawer" :location="$vuetify.display.smAndDown ? 'bottom' : 'right'"
        temporary sticky floating :style="{ marginTop: $vuetify.display.smAndDown ? '5rem' : 'auto' }">
        <div :class="$vuetify.display.smAndDown ? 'text-end px-1' : 'px-1'">
          <VBtn icon="mdi-close" variant="text" rounded="sm" @click="drawer = false" />
        </div>
        <ViewsBlogsComments :blog-id="blog?.id || ''" :comment-count="blog?._count?.comment" />
      </v-navigation-drawer>
    </Teleport>
</template>