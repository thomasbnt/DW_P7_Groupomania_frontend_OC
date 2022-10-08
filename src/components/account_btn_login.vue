<template>
  <v-flex v-if="!user_connected">
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-notblack"
      @click="loader = 'loading'"
      to="/signup"
    >
      S'enregistrer
    </v-btn>
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-primary"
      @click="loader = 'loading'"
      to="/login"
    >
      Se connecter
    </v-btn>
  </v-flex>
  <v-flex v-else>
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-notblack"
      @click="loader = 'loading'"
      to="/settings"
    >
      Mon compte
    </v-btn>
    <v-btn
      elevation="2"
      :loading="loading"
      :disabled="loading"
      class="text-red"
      @click="loader = 'loading'"
      to="/logout"
    >
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
