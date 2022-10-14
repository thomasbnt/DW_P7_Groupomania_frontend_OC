<template>
  <navbar_main />
  <v-container>
    <v-card class="pa-4 mt-10">
      <h1 class="mb-10 text-uppercase">
        <v-icon>mdi-login</v-icon>
        Connexion
      </h1>
      <v-alert type="success" class="mb-5" v-if="messageConfirmation">
        {{ messageConfirmation }}
      </v-alert>
      <v-alert type="error" class="mb-5" v-if="messageError">
        {{ messageError }}
      </v-alert>
      <form @submit.prevent="login" class="mb-3">
        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          hint="Entrez votre adresse email"
          placeholder="elliot@alder.son"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          label="Mot de passe"
          hint="Entrez votre mot de passe"
          required
        ></v-text-field>
        <v-btn block x-large class="mt-2 bg-primary" type="submit" @click="submit" value="Se connecter">
          Connexion
        </v-btn>
      </form>
      <v-divider class="mb-2"></v-divider>
      <v-flex class="pa-4 align-center text-center">
        <p>
          Pas encore de compte ?
          <router-link to="/signup" class="text-primary">S'enregistrer →</router-link>
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
  name: "LoginView",
  components: {
    navbar_main
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      messageConfirmation: "",
      messageError: "",
      emailRules: [(v) => !!v || "E-mail est requis", (v) => /.+@.+/.test(v) || "E-mail doit être valide"],
      passwordRules: [
        (v) => !!v || "Le mot de passe est requis"
      ]
    };
  },
  methods: {
    async login() {
      const { email, password } = this;
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      // On retourne le résultat de la requête
      const data = await res.json();
      // Si erreur alors on affiche l'erreur en alerte
      if (data.error) {
        this.messageConfirmation = "";
        this.messageError = data.error;
      } else {
        this.messageError = "";
        // Sinon on affiche la confirmation
        this.messageConfirmation = data.message;
        // Sinon on stocke le token dans le localStorage
        localStorage.setItem("session_token", data.session_token);
        // On redirige vers la page d'accueil
        this.$router.push("/");
      }
    }
  }
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
