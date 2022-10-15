<template>
  <navbar_main />
  <MenuDesktop />
  <v-container>
    <v-card class="pa-4 mt-10">
      <h1 class="mb-6 text-uppercase">
        <v-icon>mdi-account-plus</v-icon>
        Se créer un compte
      </h1>
      <p class="mb-7">Tout les champs sont obligatoires.</p>
      <v-alert type="success" class="mb-5" v-if="messageConfirmation">
        {{ messageConfirmation }}
      </v-alert>
      <v-alert type="error" class="mb-5" v-if="messageError">
        {{ messageError }}
      </v-alert>
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
              :rules="passwordConfirmRules && passwordRules"
              v-model="passwordConfirm"
              label="Tapez de nouveau votre mot de passe"
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
              :rules="firstNameRules"
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
              :rules="lastNameRules"
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
          accept="image/png, image/jpeg, image/bmp, image/gif"
          outlined
          required
        ></v-file-input>

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

import navbar_main from "../components/navbar_main.vue";
import MenuDesktop from "../components/menuDesktop.vue";

export default defineComponent({
  name: "SignupView",
  components: {
    MenuDesktop,
    navbar_main
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      imageProfile: "",
      messageConfirmation: "",
      messageError: "",
      showPassword: false,
      emailRules: [(v) => !!v || "E-mail est requis", (v) => /.+@.+/.test(v) || "E-mail doit être valide"],
      passwordConfirmRules: [(v) => v === this.password || "Les mots de passe ne sont pas identiques"
      ],
      passwordRules: [
        // Min 9 caractères, une lettre en majuscule, un caractère spécial et un chiffre.
        (v) => !!v || "Le mot de passe est requis",
        (v) => v.length >= 9 || "Le nombre de caractères doit être supérieur à 9",
        // Le mot de passe doit comporter au moins une lettre majuscule
        (v) => /[A-Z]/.test(v) || "Le mot de passe doit comporter au moins une lettre majuscule",
        // Le mot de passe doit comporter au moins un caractère spécial
        (v) => /[#?!@$ %^&*-]/.test(v) || "Le mot de passe doit comporter au moins un caractère spécial",
        // Le mot de passe doit comporter au moins un chiffre
        (v) => /[0-9]/.test(v) || "Le mot de passe doit comporter au moins un chiffre",
        // Le mot de passe doit être identique à la confirmation
        // Les espaces ne sont pas autorisés
        (v) => !/\s/.test(v) || "Les espaces ne sont pas autorisés"
      ],
      lastNameRules: [
        (v) => !!v || "Le nom est requis",
        (v) => v.length >= 2 || "Le nombre de caractères doit être supérieur à 2",
        (v) => !/[!@#$%^&*(),.?":{}|<>]/.test(v) || "Le nom ne doit pas comporter de caractères spéciaux"
      ],
      firstNameRules: [(v) => !!v || "Le prénom est requis",
        (v) => v.length >= 2 || "Le nombre de caractères doit être supérieur à 2",
        (v) => !/[!@#$%^&*(),.?":{}|<>]/.test(v) || "Le nom ne doit pas comporter de caractères spéciaux"
      ]
    };
  },
  methods: {
    async checkUserIsConnected() {
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
        lastName: this.lastName
      }));
      formData.append("imageProfile", this.imageProfile[0]);

      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      console.log(data);
      if (data.code !== "ACCOUNT_CREATED") {
        this.messageConfirmation = "";
        this.messageError = data.error;
      }
      if (data.code === "ACCOUNT_CREATED") {
        this.messageError = "";
        this.messageConfirmation = data.success;
        // 3 secondes puis redirect to login
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      }
    }
  },
  mounted() {
    this.checkUserIsConnected();
  }
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
