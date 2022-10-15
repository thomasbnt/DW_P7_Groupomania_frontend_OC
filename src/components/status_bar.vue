<template>
  <v-system-bar color="green darken-4" v-if="user.role === 'ADMIN' && statusBarActivated">
    <v-spacer></v-spacer>
    <v-items class="mr-1 ml-1">{{ stats.users }}
      <v-icon>mdi-account</v-icon>
    </v-items>
    <v-items class="mr-1 ml-1">{{ stats.posts }}
      <v-icon>mdi-post</v-icon>
    </v-items>
    <v-items class="mr-1 ml-1">{{ stats.reactions }}
      <v-icon>mdi-heart</v-icon>
    </v-items>
  </v-system-bar>
</template>
<script>
export default {
  name: "status_bar",
  props: {
    user: Object
  },
  data: () => ({
    statusBarActivated: false,
    status: "Hors ligne",
    stats: {
      users: 0,
      posts: 0,
      reactions: 0
    }
  }),
  methods: {
    async getStatus() {
      const response = await fetch("http://localhost:3000/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const userConnected = !!localStorage.getItem("session_token");
      if (data.status === "Tout est up!" && userConnected) {
        this.statusBarActivated = true;
        this.status = data.status;
        this.stats.users = data.stats.usersCount;
        this.stats.posts = data.stats.postsCount;
        this.stats.reactions = data.stats.reactionsCount;

      } else {
        this.statusBarActivated = false;
      }
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>
