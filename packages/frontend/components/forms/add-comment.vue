<script setup lang="ts">
const props = defineProps<{
  type: "blog" | "discussion";
  discussionId?: string;
  blogId?: string;
  parentId?: number;
  rows?: number;
  placeholder?: string;
}>();

const emits = defineEmits<{
  success: [];
}>();

const { user } = useAuth();

const { errors, exec, loading } = useFetcher();

const form = reactive({
  message: "",
  blogId: props.blogId,
  discussionId: props.discussionId,
  parentId: props.parentId || undefined,
});

const createComment = async () => {
  exec(
    props.type === "blog"
      ? apiRoutes.blogComments.create()
      : apiRoutes.discussionComments.create(),
    {
      method: "post",
      body: {
        ...toRaw(form),
      },
    },
    {
      onSuccess: (res) => {
        emits("success");
      },
    },
  );
};
</script>
<template>
  <v-form v-if="user" @submit.prevent="createComment">
    <div class="d-flex flex-column ga-4">
      <v-textarea
        placeholder="Comment"
        v-model="form.message"
        :error-messages="errors?.message?._errors"
        :rows="rows"
        class="bg-surface"
      >
      </v-textarea>
      <v-btn :disabled="loading" class="align-self-end" type="submit">
        Submit
      </v-btn>
    </div>
  </v-form>
  <div v-else>
    Please
    <NuxtLink class="text-primary" :to="routes.auth.signin()">Sign in</NuxtLink>
    or
    <NuxtLink class="text-primary" :to="routes.auth.signup()">Sign up</NuxtLink>
    to reply this comment.
  </div>
</template>
