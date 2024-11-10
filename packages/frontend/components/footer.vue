<script setup lang="ts">
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
</script>

<template>
  <v-footer class="bg-grey-400 pa-5 rounded-t-xl">
    <v-row justify="center">
      <v-col class="d-flex flex-column" cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Services</h6>
        <a>Branding</a>
        <a>Design</a>
        <a>Marketing</a>
        <a>Advertisement</a>
      </v-col>
      <v-col class="d-flex flex-column" cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Company</h6>
        <a>About us</a>
        <a>Contact</a>
        <a>Jobs</a>
        <a>Press kit</a>
      </v-col>
      <v-col class="d-flex flex-column" cols="12" sm="4" md="3">
        <h6 class="footer-title text-h6">Legal</h6>
        <a>Terms of use</a>
        <a>Privacy policy</a>
        <a>Cookie policy</a>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h6 class="footer-title text-h6">Newsletter</h6>
        <v-text-field
          placeholder="Subscribe "
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          rounded="lg"
        >
          <template #append>
            <v-btn>Submit</v-btn>
          </template>
        </v-text-field>
      </v-col>
      <v-divider></v-divider>
      <div class="pt-1 d-flex justify-space-between ga-2 flex-wrap w-100">
        <div>
          <strong>{{ $config.public.appName }}</strong>
        </div>
        <div>
          © {{ new Date().getFullYear() }} {{ $config.public.appName }}. All
          Rights Reserved.
        </div>
        <div>Social Links</div>
      </div>
    </v-row>
  </v-footer>
</template>
