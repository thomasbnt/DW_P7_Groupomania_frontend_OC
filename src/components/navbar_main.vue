<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-flex d-md-none"></v-app-bar-nav-icon>
    <router-link to="/" class="ml-2 groupomania_logo">
      <img src="/src/assets/img/logo.svg" class="align-self-center" />
    </router-link>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" fixed bottom temporary>
    <nav_content :user="user" />
  </v-navigation-drawer>
</template>

<script>
import toggleTheme from "./toggletheme.vue";
import account_btn_connect from "./account_btn_connect.vue";
import profile_icon from "./profile_icon.vue";
import profile_image from "./profile_image.vue";
import nav_content from "./nav_content.vue";

export default {
  name: "navbar_main",
  props: {
    user: Object,
  },
  components: {
    toggleTheme,
    account_btn_connect,
    profile_icon,
    profile_image,
    nav_content,
  },
  data: () => ({
    drawer: false,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
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
