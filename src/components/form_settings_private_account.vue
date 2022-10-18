<template>
  <v-alert type="success" class="mb-5" v-if="messageConfirmation">
    {{ messageConfirmation }}
  </v-alert>
  <v-alert type="error" class="mb-5" v-if="messageError">
    {{ messageError }}
  </v-alert>
  <v-form @submit.prevent="editPrivateInfos">
    <h2 class="mt-4 mb-4">Modifier l'adresse email</h2>
    <p class="mb-6">Email actuelle : <b>{{ user.email }}</b></p>
    <v-text-field
      :rules="[emailRules]"
      prepend-icon="mdi-email"
      v-model="email"
      :label="user.email"
      hint="Entrez votre nouvelle adresse email"
      type="email"
      placeholder="Nouvel email"
      required
    ></v-text-field>
    <h2 class="mt-4 mb-4">Modifier le mot de passe</h2>
    <v-row>
      <v-col>
        <v-text-field
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          prepend-icon="mdi-form-textbox-password"
          v-model="password"
          autocomplete="new-password"
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
          :rules="passwordConfirmRules"
          :type="showPassword ? 'text' : 'password'"
          placeholder="***************"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <small>Laisser vide pour ne pas modifier.</small>
    <v-btn block x-large class="mt-7 bg-primary" type="submit" value="save"> Enregistrer</v-btn>
  </v-form>
</template>
<script>
export default {
  name: "form_settings_private_account",
  props: {
    user: Object
  },
  data() {
    return {
      userProfile: {},
      actualEmail: "",
      email: "",
      password: null,
      passwordConfirm: null,
      showPassword: false,
      messageConfirmation: "",
      messageError: "",
      emailRules: [
        (v) => !!v || "L'email est obligatoire",
        (v) => /.+@.+/.test(v) || "L'email doit être valide"
      ],
      passwordRules: [
        (v) => !!v || "Le mot de passe est obligatoire",
        // Min 8 caractères, une lettre en majuscule, un caractère spécial et un chiffre.
        (v) => !!v || "Le mot de passe est requis",
        (v) => v.length >= 8 || "Le nombre de caractères doit être minimum de 8",
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
      passwordConfirmRules: [(v) => v === this.password || "Les mots de passe ne sont pas identiques"],
    };
  },
  methods: {
    async editPrivateInfos() {
      const session_token = localStorage.getItem("session_token");
      if (!session_token) {
        this.$router.push({ name: "login" });
      }
      if (this.password && !this.passwordConfirm) {
        this.messageConfirmation = "";
        this.messageError = "Veuillez tapez de nouveau votre mot de passe";
        return;
      }
      await fetch("http://localhost:3000/users/security", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session_token}`
        },
        body: JSON.stringify({
          newEmail: this.email,
          newPassword: this.password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.codeError === "NO_INFORMATION_CHANGED" || data.codeError === "PASSWORD_INVALID") {
            this.messageConfirmation = "";
            this.messageError = data.message || data.error;
          } else {
            // on récupère le nouveau token
            localStorage.setItem("session_token", data.session_token);

            this.messageError = "";
            this.messageConfirmation = data.message;
            // reload page
            setTimeout(() => {
              this.$router.go();
            }, 2000);
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  .v-row {
    flex-direction: column;
  }
}
</style>