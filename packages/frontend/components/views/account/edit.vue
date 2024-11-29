<script setup lang="ts">
import type { User } from '~/utils/types/modals';

const appConfig = useAppConfig()
const props = defineProps<{
    user: User
}>()

const { exec, loading, errors } = useFetcher()


const form = reactive({
    avatar: undefined as File | undefined,
    user: {
        fullName: props.user.fullName,
        phone: props.user.phone,
    }
})

const updateProfile = async () => {
    const formData = new FormData();
    const formObj = toRaw(form);

    formData.append("user[fullName]", formObj.user.fullName);
    formData.append("user[phone]", formObj.user.phone || '');
    if (formObj.avatar) {
        formData.append("avatar", formObj?.avatar);
    }
    exec(apiRoutes.account.updateUserDetails(), {
        method: 'PATCH',
        body: formData
    })
}
</script>

<template>
    <VCard max-width="800px">
        <!-- 👉 Avatar -->
        <VCardText class="d-flex flex-column ga-2">
            <label class="font-weight-bold">Avatar</label>
            <FormsAvatarInput size="100"
                :url="user?.profile?.avatar ? $config.public.uploadsPath + user?.profile?.avatar : appConfig.dummyAvatarUrl"
                @image="(f) => {
                    form.avatar = f
                }
                    " />
        </VCardText>

        <VCardText class="pt-2">
            <!-- 👉 Form -->
            <VForm class="mt-3" @submit.prevent="updateProfile">
                <VRow>
                    <!-- 👉 First Name -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="form.user.fullName" placeholder="John Doe" label="Full Name"
                            :error-messages="errors?.user?.fullName?._errors" />
                    </VCol>

                    <!-- 👉 Phone -->
                    <VCol md="6" cols="12">
                        <VTextField v-model="form.user.phone" type="number" placeholder="971 xxx xxxxx"
                            label="Phone number (Optional)" :error-messages="errors?.user?.phone?._errors" />
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
