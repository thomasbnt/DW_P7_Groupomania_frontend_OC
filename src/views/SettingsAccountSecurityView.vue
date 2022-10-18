<template>
  <navbar_main :user="userProfile" />
  <MenuDesktop :user="userProfile" />
  <v-container>
    <v-card class="pa-4">
      <h1 class="mb-10 text-uppercase">
        <v-icon>mdi-security</v-icon>
        Paramètres de sécurité
      </h1>
      <form_settings_security :user="userProfile" />
      <section class="mt-10">
        <v-divider class="ma-5"></v-divider>
        <h2 class="mb-4">
          <v-icon>mdi-alert-octagon</v-icon>
          Danger zone
        </h2>
        <p>
          Vous pouvez supprimer votre compte en cliquant sur ce bouton. Toutes
          <b>vos données seront supprimées irrévocablement</b> tel que vos informations de compte, vos posts et vos
          réactions.
        </p>
        <p class="mt-2">Vous pourrez créer un nouveau compte avec la même adresse e-mail.</p>
        <v-form @submit.prevent="deleteMyAccount">
          <v-checkbox
            v-model="confirmDeleteAccount"
            label="Je confirme que je veux supprimer mon compte"
            class="mt-5"
          ></v-checkbox>
          <v-btn block x-large class="bg-red" type="submit" :disabled="!confirmDeleteAccount">
            Supprimer mon compte
          </v-btn>
        </v-form>
      </section>
    </v-card>
  </v-container>
</template>
<script>
import navbar_main from "../components/navbar_main.vue";
import nav_drawer_desktop from "../components/menuDesktop.vue";
import form_settings_security from "../components/form_settings_private_account.vue";
import MenuDesktop from "../components/menuDesktop.vue";

export default {
  name: "SettingsAccountSecurityView",
  components: { MenuDesktop, navbar_main, nav_drawer_desktop, form_settings_security },
  data() {
    return {
      userProfile: {},
      actualEmail: "",
      email: "",
      password: null,
      passwordConfirm: null,
      showPassword: false,
      confirmDeleteAccount: false,
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      passwordConfirmRules: [(v) => v === this.password || "Les mots de passe ne sont pas identiques"],
    };
  },
  methods: {
    async checkUserIsConnected() {
      if (!localStorage.getItem("session_token")) {
        this.$router.push("/login");
      }
    },
    async getUserMe() {
      if (localStorage.getItem("session_token")) {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("session_token")}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.userProfile = data.success.user;
        }
      }
    },
    async deleteMyAccount() {
      const response = await fetch("http://localhost:3000/users/security", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session_token")}`
        }
      });
      const data = await response.json();
      console.log(data);
      if (data.codeError === "USER_NOT_FOUND") {
        localStorage.removeItem("session_token");
        this.$router.push("/login?deletedAccount=false?error=USER_NOT_FOUND");
      }

      if (data.success) {
        localStorage.removeItem("session_token");
        this.$router.push("/login");
      }
    }
  },
  created() {
    this.checkUserIsConnected();
    this.getUserMe();
  }
};
</script>
