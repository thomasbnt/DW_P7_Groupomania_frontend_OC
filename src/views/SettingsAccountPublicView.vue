<template>
  <navbar_main :user="userProfile" />
  <nav_drawer_desktop :user="userProfile" />
  <v-container>
    <v-card class="pa-4">
      <h1 class="mb-5 text-uppercase">
        <v-icon>mdi-account-edit</v-icon>
        Mes informations publiques
      </h1>
      <form_settings_public_account :user="userProfile" />

      <v-divider class="mt-6 mb-9"></v-divider>
      <section class="mt-10">
        <p>Vous souhaitez modifier votre adresse email, votre mot de passe ou supprimer votre compte ?</p>
        <p class="mt-2">Cliquez sur le bouton ci-dessous pour accéder à la page de gestion de votre compte.</p>
        <v-btn block class="mt-5" link href="/security"> Paramètres de sécurité</v-btn>
      </section>
    </v-card>
  </v-container>
</template>

<script>
import navbar_main from "../components/navbar_main.vue";
import nav_drawer_desktop from "../components/menuDesktop.vue";
import form_settings_public_account from "../components/form_settings_public_account.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SettingsAccountView",
  components: { navbar_main, nav_drawer_desktop, form_settings_public_account },
  data: () => ({
    userProfile: {},
    user_connected: !!localStorage.getItem("session_token"),
    namesRules: [(v) => !!v || "Ce champ est requis"],
  }),
  methods: {
    async checkUserIsConnected() {
      if (!localStorage.getItem("session_token")) {
        this.$router.push("/login");
      }
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
        this.userProfile = data.success.user;

        if (data.error) {
          localStorage.removeItem("session_token");
          this.$router.push("/login");
        }
      }
    },

  },
  created() {
    this.checkUserIsConnected();
  },
})
</script>
