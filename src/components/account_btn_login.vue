<template>
  <v-flex v-if="!user_connected">
    <v-btn elevation="2" :loading="loading" :disabled="loading" class="text-notblack" @click="loader = 'loading'"
           to="/signup">
      S'enregistrer
    </v-btn>
    <v-btn elevation="2" :loading="loading" :disabled="loading" class="text-primary" @click="loader = 'loading'"
           to="/login">
      Se connecter
    </v-btn>
  </v-flex>
</template>
<script>
export default {
  name: "account_btn_login",
  data: () => ({
    user_connected: false
  })
};
</script>
