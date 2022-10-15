<template>
  <v-card elevation="2" class="pa-4" :hidden="!userConnected">
    <p class="pb-4">Créer un nouveau post en tant que <b>{{ user.firstName }} {{ user.lastName }}</b> :</p>

    <v-alert type="success" class="mb-5" v-if="messageConfirmation">
      {{ messageConfirmation }}
    </v-alert>
    <v-alert type="error" class="mb-5" v-if="messageError">
      {{ messageError }}
    </v-alert>

    <v-form>
      <v-row>
        <v-col>
          <v-textarea
            autofocus="true"
            clearable
            rows="8"
            counter="500"
            v-model="text"
            label="Contenu du post"
            :rules="textRules"
            required
          ></v-textarea>
        </v-col>
        <v-col>
          <v-file-input
            label="Ajouter une image (optionnel)"
            prepend-icon="mdi-cloud-upload"
            v-model="image"
            show-size
            accept="image/png, image/jpeg, image/gif"
            outlined
          ></v-file-input>
          <v-text-field
            label="Titre alternatif de l'image (obligatoire s'il y a une image)"
            prepend-icon="mdi-text"
            v-model="altText"
          ></v-text-field>
          <div class="mb-3" role="alert">
            <v-icon size="16">
              mdi-information-outline
            </v-icon>
            Si vous envoyez une image, veuillez entrer un titre alternatif afin de décrire l'image.
          </div>

        </v-col>
      </v-row>
      <v-btn color="primary" @click.prevent="createNewPost" type="submit" class="mt-5">Publier</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "formNewPost",
  props: {
    user: Object
  },
  data() {
    return {
      userProfile: {},
      userConnected: false,
      text: "",
      image: "",
      altText: "",
      messageConfirmation: "",
      messageError: "",
      textRules: [
        (v) => !!v || "Le contenu est requis",
        (v) => (v && v.length <= 500) || "Le contenu doit faire moins de 500 caractères"
      ]
    };
  },
  methods: {
    async checkIfUserIsConnected() {
      const session_token = localStorage.getItem("session_token");
      if (session_token) {
        this.userConnected = true;
      }
    },
    async createNewPost() {
      const session_token = localStorage.getItem("session_token");
      if (!session_token) {
        return this.messageError = "Vous devez être connecté pour publier un post";
      }
      // S'il y a une image
      if (this.image) {
        const formData = new FormData();
        formData.append("content", JSON.stringify({
          text: this.text,
          altText: this.altText
        }));
        formData.append("image", this.image[0]);
        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session_token}`
          },
          body: formData
        });
        const data = await response.json();
        if (data.error) {
          this.messageConfirmation = "";
          this.messageError = data.error;
        } else {
          this.messageConfirmation = data.message;
          this.messageError = "";
          this.text = "";
          this.image = "";
          this.altText = "";
        }
      } else {
        // On envoie le texte via content.text
        const formDataWithoutImage = new FormData();
        formDataWithoutImage.append("content", JSON.stringify({
          text: this.text
        }));
        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session_token}`
          },
          body: formDataWithoutImage
        });
        const data = await response.json();
        if (data.error) {
          this.messageConfirmation = "";
          this.messageError = data.error;
        } else {
          this.messageConfirmation = data.message;
          this.messageError = "";
          this.text = "";
          this.image = "";
          this.altText = "";
          setTimeout(() => {
            this.messageConfirmation = "";
          }, 3000);
        }
      }
    }
  },
  created() {
    this.checkIfUserIsConnected();
  }
};

</script>
<style scoped>
@media screen and (max-width: 900px) {
  .v-row {
    flex-direction: column;
  }
}
</style>