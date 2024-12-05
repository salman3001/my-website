<script setup lang="ts">
import { onMounted } from "vue"
import { googleOneTap } from "vue3-google-login"
import type { IResType } from "~/utils/types";
import type { User } from "~/utils/types/modals";

const { user,setAuth} = useAuth()
const {exec} = useFetcher()

onMounted(() => {

     if (!user.value) {
          googleOneTap({ autoLogin: true, })
               .then(((response) => {
                    // This promise is resolved when user selects an account from the the One Tap prompt
                    exec(apiRoutes.auth.googelSignin(),{method:'POST',body:{
                         type:'credential',
                         credential:response.credential
                    }},{
                         onSuccess(res) {
                              const {data} = res as IResType<{token:string,user:User}>
                              const {token,user} = data!
                              setAuth(user,token)
                         },
                    })
               }))
               .catch((error) => {
                    console.log("Handle the error", error)
               })
     }
})

</script>

<template>
     <span></span>
</template>