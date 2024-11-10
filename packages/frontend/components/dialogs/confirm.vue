<script setup lang="ts">
const open = ref<boolean>(false);

defineEmits<{
  confirm: [];
  reject: [];
}>();
</script>

<template>
  <v-dialog v-model="open" :width="500">
    <template #activator="{ props }">
      <slot :props="props" />
    </template>
    <v-card title="Confirm Action">
      <template #append>
        <v-btn
          variant="text"
          size="small"
          @click="
            () => {
              open = false;
            }
          "
          icon="mdi-close"
        ></v-btn>
      </template>
      <v-card-text>
        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="outlined"
            size="small"
            @click="
              () => {
                $emit('reject');
                open = false;
              }
            "
            text="Cancle"
          ></v-btn>
          <v-btn
            size="small"
            @click="
              () => {
                $emit('confirm');
                open = false;
              }
            "
            text="Confirm"
          ></v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
