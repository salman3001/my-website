<script setup lang="ts">

const modal = ref(false)
const {mounted} = useAwaitTeleportTargetMount()

const form = reactive({
    email: ''
})

const handleSubmit = () => {
    modal.value = true
}

const onClose = () => {
    modal.value = false;
    form.email = ''
}

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <v-text-field placeholder="Email" type="email" label="Subscribe Newsletters" prepend-inner-icon="mdi-email-outline"
            variant="outlined" rounded="lg" v-model="form.email" required>
            <template #append>
                <v-btn type="submit">Submit</v-btn>
            </template>
        </v-text-field>
    </form>
    <Teleport to="#dialog-teleports" v-if="mounted">
        <v-dialog v-model="modal" :width="500">
            <v-card title="Subscribe">
                <template #append>
                    <v-btn variant="text" size="small" @click="onClose" icon="mdi-close"></v-btn>
                </template>
                <v-card-text>
                    <VAlert type="info" variant="text"
                        :text="`Hi ${form.email}! Thank you for subscription request. Unfortunately this feature is still under development. Please come back later.`" />
                </v-card-text>
                <v-card-text>
                    <div class="d-flex justify-end ga-2">
                        <v-btn size="small" @click="onClose" text="Ok"></v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </Teleport>
</template>