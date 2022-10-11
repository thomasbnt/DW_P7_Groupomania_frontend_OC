<template>
  <navbar_main />
  <v-container>
    <v-card class="pa-4 mt-10">
      <h1 class="mb-10 text-uppercase">
        <v-icon>mdi-account-plus</v-icon>
        Se créer un compte
      </h1>
      <form @submit.prevent="createNewAccount" class="mb-3">
        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          prepend-icon="mdi-email"
          hint="Entrez votre adresse email"
          placeholder="elliot@alder.son"
          autocomplete="false"
          required
        ></v-text-field>

        <v-row>
          <v-col>
            <v-text-field
              :rules="passwordRules"
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
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              placeholder="***************"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="ml-10 mr-10 mt-5 mb-5"></v-divider>
        <v-row>
          <v-col>
            <v-text-field
              v-model="firstName"
              prepend-icon="mdi-account"
              label="Prénom"
              hint="Entrez votre prénom"
              placeholder="Elliot"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="lastName"
              label="Nom"
              hint="Entrez votre nom"
              placeholder="Alderson"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-file-input
          label="Image de profil"
          prepend-icon="mdi-cloud-upload"
          v-model="imageProfile"
          show-size
          accept="image/png, image/jpeg, image/bmp image/gif"
          outlined
        ></v-file-input>

        <v-switch v-model="remember_me" label=" Se souvenir de moi" color="green"></v-switch>
        <v-btn block x-large class="mt-2 bg-primary" type="submit" @click="submit" value="S'enregistrer">
          S'enregistrer
        </v-btn>
      </form>
      <v-divider class="mb-2"></v-divider>
      <v-flex class="pa-4 align-center text-center">
        <p>
          Déjà un compte ?
          <router-link to="/login" class="text-primary">Se connecter →</router-link>
        </p>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";

export default defineComponent({
  name: "SignupView",
  components: {
    navbar_main,
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      imageProfile: "",
      showPassword: false,
      remember_me: false,
      emailRules: [(v) => !!v || "E-mail est requis", (v) => /.+@.+/.test(v) || "E-mail doit être valide"],
      passwordRules: [
        (v) => !!v || "Le mot de passe est requis",
        (v) => v.length >= 10 || "Le nombre de caractères doit être supérieur à 10",
        (v) => v === this.passwordConfirm || "Les mots de passe ne correspondent pas",
      ],
    };
  },
  methods: {
    async checkUserIsConnected() {
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
          this.$router.push("/");
        }
      }
    },
    async createNewAccount() {
      const formData = new FormData();
      formData.append("account", JSON.stringify({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      }));
      formData.append("imageProfile", this.imageProfile[0]);

      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      }
      if (data.success) {
        this.$router.push("/settings");
      }
    },
  },
  mounted() {
    this.checkUserIsConnected();
  },
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
