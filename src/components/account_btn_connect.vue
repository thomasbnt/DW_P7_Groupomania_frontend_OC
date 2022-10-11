<template>
  <v-flex v-if="!user_connected">
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-notblack ml-1 mr-1 mb-1"
      @click="loader = 'loading'"
      to="/signup" block
    >
    <v-icon class="mr-2">mdi-account-plus</v-icon>
      S'enregistrer
    </v-btn>
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-primary ml-1 mr-1"
      @click="loader = 'loading'"
      to="/login"
      block
    >
      <v-icon class="mr-2"> mdi-login </v-icon>
      Se connecter
    </v-btn>
  </v-flex>
  <v-flex v-else>
    <v-btn elevation="2" class="text-red ml-1 mr-1 mt-2" to="/logout" block>
      <v-icon class="mr-2"> mdi-logout </v-icon>
      Se déconnecter
    </v-btn>
  </v-flex>
</template>
<script>
export default {
  name: "account_btn_login",
  data: () => ({
    user_connected: localStorage.getItem("session_token") ? true : false,
  }),
  mounted() {
    this.check_user();
  },
  methods: {
    async check_user() {
      // Check if user is connected with the session_token in the localStorage with the bearer token in the header
      const session_token = localStorage.getItem("session_token");
      if (session_token) {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session_token}`,
          },
        });
        const data = await response.json();
      }
    },
  },
};
</script>
