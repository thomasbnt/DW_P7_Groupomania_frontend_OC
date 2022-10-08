<template>
  <navbar_main />
  <v-container>
    <v-card>
      <h1>Mon compte</h1>
      <h2>
        <v-icon>mdi-account-edit</v-icon>
        Mes informations publiques
      </h2>
      <img :src="imageProfile" />
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp image/gif"
        placeholder="Modifier votre avatar"
        prepend-icon="mdi-cloud-upload"
        label="Avatar"
      >
      </v-file-input>
      <v-row>
        <v-col>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="firstName"
            label="Prénom"
            :rules="namesRules"
            hint="Entrez votre prénom"
            :placeholder="firstName"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="lastName"
            label="Nom"
            :rules="namesRules"
            hint="Entrez votre nom"
            :placeholder="lastName"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import navbar_main from "../components/navbar_main.vue";
export default {
  name: "SettingsAccountView",
  components: { navbar_main },
  data: () => ({
    firstName: null,
    lastName: null,
    imageProfile: null,
    createdAt: null,
    user_connected: localStorage.getItem("session_token") ? true : false,
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
        console.log(data.success.user);
        const profile = data.success.user;
        // Mets à jour les données de l'utilisateur
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.imageProfile = profile.imageProfile;
        this.createdAt = profile.createdAt;

        if (data.error) {
          localStorage.removeItem("session_token");
          this.$router.push("/login");
        }
      }
    },
  },
  mounted() {
    this.checkUserIsConnected();
  },
};
</script>
