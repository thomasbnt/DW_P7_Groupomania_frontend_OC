<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-flex d-md-flex d-lg-none"></v-app-bar-nav-icon>
    <router-link to="/" class="ml-2 groupomania_logo">
      <img src="/src/assets/img/logo.svg" class="align-self-center" alt="Logo Groupomania" />
    </router-link>
    <v-spacer></v-spacer>
  </v-app-bar>

  <!-- Menu Mobile -->
  <v-navigation-drawer v-model="drawer" fixed bottom temporary :user="userProfile">
    <nav_content :user="userProfile" />
  </v-navigation-drawer>
</template>

<script>
import nav_content from "./nav_content.vue";

export default {
  name: "navbar_main",
  components: {
    nav_content
  },
  props: {
    user: Object
  },
  data() {
    return {
      userProfile: {},
      drawer: false
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<style scoped>
.groupomania_logo img {
  max-width: 85%;
  margin: 0.5rem 1rem 0 auto;
}

@media screen and (max-width: 600px) {
  .groupomania_logo img {
    max-width: 80%;
    margin: 0.3rem auto 0 auto;
  }
}
</style>
