<script setup lang="ts">
const props = defineProps<{
  type: "blog" | "discussion";
  parentId: number;
  discussionId?: string;
  blogId?: string;
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
        form.message = "";
        emits("success");
      },
    },
  );
};
</script>
<template>
  <v-sheet
    v-if="user"
    @submit.prevent="createComment"
    class="pa-2"
    rounded="lg"
  >
    <v-form v-if="user" @submit.prevent="createComment">
      <div class="d-flex flex-column ga-2">
        <div>
          <TipTapEditorLight
            v-model="form.message"
            placeholder="What are Your thoughts?"
          />
          <span class="text-error" v-if="errors?.message?._errors">{{
            errors?.message?._errors
          }}</span>
        </div>
        <v-btn
          :disabled="loading"
          class="align-self-end"
          type="submit"
          size="small"
        >
          Reply
        </v-btn>
      </div>
    </v-form>
    <div v-else>
      Please
      <NuxtLink class="text-primary" :to="routes.auth.signin()"
        >Sign in</NuxtLink
      >
      or
      <NuxtLink class="text-primary" :to="routes.auth.signup()"
        >Sign up</NuxtLink
      >
      to reply this comment.
    </div>
  </v-sheet>
</template>
