<template>
  <v-card v-for="post in posts" :key="post.id" class="mb-5 pa-4">
    <v-row>
      <v-col>
        <div class="header_post">
          <v-img class="avatar" :src="post.author.imageProfile" alt="avatar"></v-img>
          <div>
            <h3>{{ post.author.firstName }} {{ post.author.lastName }}</h3>
            <small>Crée le {{ formatDate(post.createdAt) }}</small>
          </div>
        </div>
        <p>{{ post.text }}</p>
      </v-col>
      <v-col v-if="post.image">
        <v-img :src="post.image" :alt="post.altText" />
      </v-col>
    </v-row>
    <!--  Partie like, edit et supp   -->
    <div class="d-flex mt-4">
      <div>
        <!-- bouton liker -->
        <v-btn color="secondary" @click="likePost(post.id)">
          {{ post.reactions.length }}
          <v-icon>mdi-cards-heart</v-icon>
        </v-btn>
      </div>
      <div v-if="(post.author.id === user.id) && (user.role !== 'ADMIN')" class="ml-auto">
        <!-- Modifier et supprimer en tant qu'utilisateur     -->
        <v-btn color="secondary" @click="editPost(post.id)">Modifier</v-btn>
        <v-btn color="error" class="ml-1" @click="deletePost(post.id)">Supprimer</v-btn>
      </div>

      <div v-if="user.role === 'ADMIN'" class="ml-auto">
        <small class="mr-2">Action en tant qu'administrateur</small>
        <v-btn color="secondary" @click="editPost(post.id)">Modifier</v-btn>
        <v-btn color="error" class="ml-1" @click="deletePost(post.id)">Supprimer</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "showAllPosts",
  props: {
    user: Object,
    post: Object
  },
  data() {
    return {
      userProfile: {},
      posts: [],
      messageConfirmationReaction: ""
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("fr", options);
    },
    async getAllPosts() {
      const session_token = localStorage.getItem("session_token");
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session_token}`
        }
      });
      const data = await response.json();
      this.posts = data.success;
    },
    async getAllPostsTime() {
      setInterval(() => {
        this.getAllPosts();
        console.log(`Mise à jour des derniers posts le ${new Date()}`);
      }, 10000);
    },
    async likePost(id) {
      const session_token = localStorage.getItem("session_token");
      const response = await fetch(`http://localhost:3000/reactions/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session_token}`
        }
      });
      const data = await response.json();
      if (data.code === "REACTION_ADDED" || data.code === "REACTION_REMOVED") {
        this.messageConfirmationReaction = data.message;
      }
      // Modifie la couleur du bouton like
      if (data.error) {
        return console.log(data.error);
      }
      await this.getAllPosts();
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
          this.messageConfirmation = "";
          this.messageError = data.error;
        } else {
          this.messageError = "";
          this.messageConfirmation = data.success;
        }
      } else {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session_token}`
          },
          body: JSON.stringify({
            text: this.text,
            altText: this.altText
          })
        });
        const data = await response.json();
        if (data.error) {
          this.messageConfirmation = "";
          this.messageError = data.error;
        } else {
          this.messageError = "";
          this.messageConfirmation = data.success;
        }
      }
    },
    async deletePost(id) {
      const session_token = localStorage.getItem("session_token");
      if (!session_token) {
        return this.messageError = "Vous devez être connecté pour supprimer un post";
      }
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session_token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        this.messageConfirmation = "";
        this.messageError = data.error;
      } else {
        this.messageError = "";
        this.messageConfirmation = data.success;
        await this.getAllPosts();
      }
    }
  },
  created() {
    this.getAllPosts();
    this.getAllPostsTime();
  }
};
</script>

<style scoped>
.header_post {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
}

.avatar {
  min-height: 60px;
  min-width: 60px;
  max-height: 60px;
  max-width: 60px;
  border-radius: 50%;
}

@media screen and (max-width: 900px) {
  .v-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>