<template>
  <status_bar />
  <status_api />
  <navbar_main :user="userProfile" />
  <nav_drawer_desktop :user="userProfile" />
  <v-container>
    <h1>Les derniers posts</h1>
    <v-card></v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";
import nav_drawer_desktop from "../components/nav_drawer_desktop.vue";
import status_bar from "../components/status_bar.vue";
import status_api from "../components/status_api.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    navbar_main,
    nav_drawer_desktop,
    status_bar,
    status_api,
  },
  data: () => ({
    userProfile: {},
  }),
  methods: {
    async getProfile() {
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
        this.userProfile = data.success.user;
      }
    },
  },
  created() {
    this.getProfile();
  },
});
</script>
