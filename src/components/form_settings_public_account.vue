<template>
  <div class="mb-5 flexed">
    <img :src="user.imageProfile" :alt="user.firstName" draggable="false"/>
    <h3>Bonjour <b>{{ user.firstName }} {{ user.lastName }}</b></h3>
  </div>
  <v-alert type="success" class="mb-5" v-if="messageConfirmation">
    {{ messageConfirmation }}
  </v-alert>
  <v-alert type="error" class="mb-5" v-if="messageError">
    {{ messageError }}
  </v-alert>
  <v-form @submit.prevent="editPublicInfos">
    <v-file-input
      label="Modifier l'image de profil"
      prepend-icon="mdi-cloud-upload"
      v-model="newImageProfile"
      show-size
      accept="image/png, image/jpeg, image/gif"
      outlined
      required
    ></v-file-input>
    <v-row>
      <v-col>
        <v-text-field
          prepend-icon="mdi-account"
          v-model="newFirstName"
          label="Prénom"
          :rules="namesRules"
          hint="Entrez votre prénom"
          :placeholder="user.firstName"
          required
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="newLastName"
          label="Nom"
          :rules="namesRules"
          hint="Entrez votre nom"
          :placeholder="user.lastName"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn block x-large class="mt-2 bg-primary" type="submit" value="save"> Enregistrer</v-btn>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      userProfile: {},
      newImageProfile: "",
      newFirstName: "",
      newLastName: "",
      messageConfirmation: "",
      messageError: "",
      namesRules: [
        // "Les espaces ne sont pas autorisés"
        (v) => !v || !v.includes(" ") || "Les espaces ne sont pas autorisés"
      ]
    };
  },
  props: {
    user: Object
  },
  methods: {
    async editPublicInfos() {
      // PUT public information application/form-data
      if (localStorage.getItem("session_token")) {
        const formData = new FormData();
        formData.append("account", JSON.stringify({
          firstName: this.newFirstName,
          lastName: this.newLastName
        }));
        formData.append("imageProfile", this.newImageProfile[0]);

        const response = await fetch("http://localhost:3000/users/me", {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session_token")}`
          }
        });
        const data = await response.json();
        if (!data.error) {
          this.messageError = "";
          this.messageConfirmation = data.message;
          this.firstName = this.newFirstName;
          this.lastName = this.newLastName;
          // clean form
          this.newFirstName = "";
          this.newLastName = "";
          this.newImageProfile = "";
          // on récupère le session_token et on le met dans le localStorage
          await localStorage.setItem("session_token", data.session_token);
          // reload page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.messageConfirmation = "";
          this.messageError = data.error;
        }
      }
    }
  }
};
</script>
<style scoped>
.flexed {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.flexed > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
}
</style>
