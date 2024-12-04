<script setup lang="ts">
import { googleTokenLogin } from "vue3-google-login";
import type { IResType } from "~/utils/types";
import type { User } from "~/utils/types/modals";

const { setAuth} = useAuth()
const {exec} = useFetcher()


const login = () => {
  googleTokenLogin().then((response) => {
     exec(apiRoutes.auth.googelSignin(),{method:'POST',body:{
                         type:'token',
                         token:response.access_token
                    }},{
                         onSuccess(res) {
                              const {data} = res as IResType<{token:string,user:User}>
                              const {token,user} = data!
                              setAuth(user,token)
                              navigateTo(routes.web.home())
                         },
                    })
  }).catch((err)=>{
     console.log(err);
     
  })
}
</script>

<template>
          <VBtn text="Login With Google" variant="tonal" @click="login">
               <template #prepend>
                    <VImg width="20px" src="/images/google-logo.svg"/>
               </template>
          </VBtn>
</template>