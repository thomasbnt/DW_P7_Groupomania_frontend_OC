<template>
  <status_bar />
  <status_api />
  <navbar_main :user="userProfile" />
  <MenuDesktop :user="userProfile" />
  <v-container>
    <v-card elevation="2" class="pa-6 pb-1 mb-5"><h1 class="mb-5">Les derniers posts</h1></v-card>
    <FormNewPost :user="userProfile" class="mb-10"/>
    <showAllPosts :user="userProfile" />
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";
import MenuDesktop from "../components/menuDesktop.vue";
import status_bar from "../components/status_bar.vue";
import status_api from "../components/status_api.vue";
import FormNewPost from "../components/formNewPost.vue";
import showAllPosts from "../components/showAllPosts.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    FormNewPost,
    navbar_main,
    MenuDesktop,
    status_bar,
    status_api,
    showAllPosts,
  },
  data: () => ({
    userProfile: {}
  }),
  methods: {
    async checkIsConnected() {
      const session_token = localStorage.getItem("session_token");
      if (!session_token) {
        this.$router.push("/login");
      }
    },
    async getProfile() {
      const session_token = localStorage.getItem("session_token");
      if (session_token) {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session_token}`
          }
        });
        const data = await response.json();
        this.userProfile = data.success.user;
      }
    }
  },
  created() {
    this.checkIsConnected()
    this.getProfile();
  }
});
</script>
