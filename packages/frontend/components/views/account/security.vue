<script setup lang="ts">


const { exec, loading, errors } = useFetcher()


const updatePasswordForm = reactive({
    old_password: '',
    password: '',
    password_confirmation: ''
})

const updateEmailForm = reactive({
    password: '',
    email: '',
})

const updatePassword = async () => {
    exec(apiRoutes.account.updateUserPassword(), {
        method: 'PATCH',
        body: updatePasswordForm
    }, {
        onSuccess() {
            updatePasswordForm.old_password = ""
            updatePasswordForm.password = ""
            updatePasswordForm.password_confirmation = ""
        },
    })
}

const updateEmail = async () => {
    exec(apiRoutes.account.updateUserEmail(), {
        method: 'PATCH',
        body: updateEmailForm
    }, {
        onSuccess() {
            updateEmailForm.email = ""
            updateEmailForm.password = ""
        },
    })
}
</script>

<template>
    <VCard max-width="800px" class="py-4">
        <VCardText class="pt-2">
            <!-- 👉 Form -->
            <h2>Change Password</h2>
            <br>
            <VForm class="mt-3" @submit.prevent="updatePassword">
                <VRow>
                    <!-- 👉 Old PAssword -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="updatePasswordForm.old_password" placeholder="Old Password"
                            label="Old Password" :error-messages="errors?.old_password?._errors" type="password" />
                    </VCol>

                    <!-- 👉 New PAssword -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="updatePasswordForm.password" placeholder="New Password" label="New Password"
                            :error-messages="errors?.password?._errors" type="password" />
                    </VCol>

                    <!-- 👉 Confirm PAssword -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="updatePasswordForm.password_confirmation" placeholder="Confirm Password"
                            label="Confirm Password" :error-messages="errors?.password_confirmation?._errors"
                            type="password" />
                    </VCol>

                    <!-- 👉 Form Actions -->
                    <VCol cols="12" class="text-end">
                        <VBtn type="submit" :disabled="loading">Save changes</VBtn>
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>
        <VCardText>
            <VDivider />
        </VCardText>
        <VCardText class="pt-2">
            <!-- 👉 Form -->
            <h2>Change Email</h2>
            <br>
            <VForm class="mt-3" @submit.prevent="updateEmail">
                <VRow>
                    <!-- 👉 Old PAssword -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="updateEmailForm.password" placeholder="Password" label="Password"
                            :error-messages="errors?.password?._errors" type="password" />
                    </VCol>

                    <!-- 👉 New PAssword -->
                    <VCol md="6" cols="12">
                        <VTextField type="email" v-model="updateEmailForm.email" placeholder="Email" label="Email"
                            :error-messages="errors?.email?._errors" />
                    </VCol>

                    <!-- 👉 Form Actions -->
                    <VCol cols="12" class="text-end">
                        <VBtn type="submit" :disabled="loading">Save changes</VBtn>
                    </VCol>
                </VRow>
            </VForm>
        </VCardText>
    </VCard>
</template>
