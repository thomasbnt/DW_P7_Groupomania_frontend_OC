<template>
  <navbar_main />
  <nav_drawer_desktop />
  <v-container>
    <v-card class="pa-4">
      <h1 class="mb-10 text-uppercase">
        <v-icon>mdi-security</v-icon>
        Paramètres de sécurité
      </h1>
      <v-form @submit="editPrivateInfos">
        <v-text-field
          :rules="[emailRules]"
          prepend-icon="mdi-email"
          v-model="email"
          :label="actualEmail"
          hint="Entrez votre nouvelle adresse email"
          type="email"
          :placeholder="actualEmail"
          required
        ></v-text-field>
        <v-row>
          <v-col>
            <v-text-field
              :rules="[passwordRules, passwordMatch]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              prepend-icon="mdi-form-textbox-password"
              v-model="password"
              label="Mot de passe"
              hint="Entrez votre nouveau mot de passe"
              type="password"
              placeholder="***************"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="passwordConfirm"
              label="Tapez de nouveau votre mot de passe"
              :rules="[passwordRules, passwordMatch]"
              :type="showPassword ? 'text' : 'password'"
              placeholder="***************"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn block x-large class="mt-2 bg-primary" type="submit" value="save"> Enregistrer </v-btn>
      </v-form>
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
        <v-form @submit="deleteMyAccount">
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
import nav_drawer_desktop from "../components/nav_drawer_desktop.vue";

export default {
  name: "SettingsAccountSecurityView",
  components: { navbar_main, nav_drawer_desktop },
  data: () => ({
    actualEmail: "",
    email: "",
    password: null,
    passwordConfirm: null,
    showPassword: false,
    confirmDeleteAccount: false,
    passwordRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
  }),
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
            Authorization: `Bearer ${localStorage.getItem("session_token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          const user = data.success.user;
          this.actualEmail = user.email;
        }
      }
    },
    async deleteMyAccount() {
      const response = await fetch("http://localhost:3000/users/security", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session_token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("session_token");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.checkUserIsConnected();
    this.getUserMe();
  },
};
</script>
