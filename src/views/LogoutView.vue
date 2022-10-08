<template>
  <navbar_main />
  <v-container>
    <v-card>
        <h1>Déconnexion...</h1>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";

export default defineComponent({
  name: "LogoutView",

  components: {
    navbar_main,
  },
  data() {
    return {};
  },
  methods: {
    async logout() {
      const session_token = localStorage.getItem("session_token");
      if (session_token) {
        localStorage.removeItem("session_token");
        this.$router.push("/");
      }
    },
  },
    mounted() {
        this.logout();
    },
});
</script>
