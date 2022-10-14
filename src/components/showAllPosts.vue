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
  </v-card>
</template>

<script>
export default {
  name: "showAllPosts",
  props: {
    user: Object
  },
  data() {
    return {
      userProfile: {},
      posts: []
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
    }
  },
  created() {
    this.getAllPosts();
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