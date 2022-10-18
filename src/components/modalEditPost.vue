<template>
  <v-btn color="secondary" @click="openDialogEditPost(post.id)" v-if="(post.author.id === user.id)">
    Editer
  </v-btn>

  <!-- Dialog edit post -->
  <v-dialog v-model="dialogEditPost" persistent max-width="900" :key="post.id">
    <v-card>
      <v-card-text>

        <v-form>
          <v-row>
            <v-col>
              <v-textarea v-model="text" :rules="textRules" required></v-textarea>
            </v-col>
            <v-col>
              <div v-if="post.image" class="mb-4">
                <p class="mb-3">Image actuelle :</p>
                <v-img :src="post.image" :alt="post.altText" rel="preload" max-width="300" draggable="false" />
                <small>Alt texte : <b>{{ post.altText }}</b></small>
              </div>
              <v-file-input
                label="Ajouter/remplacer une image (optionnel)" prepend-icon="mdi-cloud-upload" v-model="image"
                show-size accept="image/png, image/jpeg, image/gif" outlined>
              </v-file-input>
              <v-text-field label="Titre alternatif de l'image" prepend-icon="mdi-text" v-model="altText">
              </v-text-field>
              <span>Si vous ajoutez une image, alors le titre alternatif est obligatoire.</span>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="ml-auto mt-4">
        <v-btn color="green" @click="editPost(post.id)">
          <v-icon>mdi-pencil</v-icon>
          Editer le post
        </v-btn>
        <v-btn @click="cancelEdition()">
          <v-icon>mdi-close</v-icon>
          Annuler
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "modalEditPost",
  props: {
    post: Object,
    user: Object
  },
  data() {
    return {
      dialogEditPost: false,
      text: this.post.text,
      image: "",
      altText: this.post.altText,
      textRules: [
        v => !!v || "Le contenu du post est obligatoire.",
        v => v.length <= 501 || "Le contenu du post doit faire moins de 500 caractères."
      ]
    };
  },
  methods: {
    async openDialogEditPost(id) {
      // On ouvre le dialog en fonction de l'id du post
      this.dialogEditPost = true;
      console.log(id);
    },
    cancelEdition() {
      this.dialogEditPost = false;
    },
    async editPost(id) {
      const session_token = localStorage.getItem("session_token");
      if (!session_token) {
        return this.messageError = "Vous devez être connecté pour modifier un post";
      }
      // S'il y a une image
      if (this.image) {
        const formData = new FormData();
        formData.append("content", JSON.stringify({
          text: this.text,
          altText: this.altText
        }));
        formData.append("image", this.image[0]);
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session_token}`
          },
          body: formData
        });
        const data = await response.json();
        if (data.error) {
          this.messageConfirmationEditPost = "";
          this.messageErrorEditPost = data.error;
          setInterval(() => {
            this.messageErrorEditPost = "";
          }, 5000);
        } else {
          this.messageConfirmationEditPost = data.message;
          this.messageErrorEditPost = "";
          this.$emit("getAllPosts");
          this.dialogEditPost = false;
        }
      } else {
        // On envoie le texte via content.text
        const formDataWithoutImage = new FormData();
        formDataWithoutImage.append("content", JSON.stringify({
          text: this.text
        }));
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session_token}`
          },
          body: formDataWithoutImage
        });
        const data = await response.json();
        if (data.error) {
          this.messageConfirmationEditPost = "";
          this.messageErrorEditPost = data.error;
          setInterval(() => {
            this.messageErrorEditPost = "";
          }, 5000);
        } else {
          this.messageConfirmationEditPost = data.message;
          this.messageErrorEditPost = "";
          this.$emit("getAllPosts");
          this.dialogEditPost = false;
        }
      }
    },
  }
};
</script>

<style scoped>

</style>