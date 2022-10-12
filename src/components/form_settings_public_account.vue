<template>
  <v-form @submit="editPublicInfos">
    <v-file-input
      label="Modifier l'image de profil"
      prepend-icon="mdi-cloud-upload"
      v-model="newImageProfile"
      show-size
      accept="image/png, image/jpeg, image/bmp image/gif"
      outlined
    ></v-file-input>

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
    <v-btn block x-large class="mt-2 bg-primary" type="submit" value="save"> Enregistrer </v-btn>
  </v-form>
</template>
<script>
export default {
  data () {
    return {
      userProfile: {},
    }
  },
  props: {
    user: Object,
  },
};
</script>
