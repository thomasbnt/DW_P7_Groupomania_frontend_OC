<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-flex d-md-none"></v-app-bar-nav-icon>
    <router-link to="/" class="ml-2 groupomania_logo">
      <img src="/src/assets/img/logo.svg" class="align-self-center" />
    </router-link>
    <v-spacer></v-spacer>
    <v-flex class="mr-2 d-none d-sm-none d-md-flex">
      <v-list nav class="d-flex align-center">
        <v-list-item
          v-for="item in items"
          :key="item"
          :href="item.link"
          link
          active-class="deep-purple--text text--accent-4"
        >
          <div class="flexed">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <Account_btn_login />
      </v-list>
    </v-flex>
    <profile_image />
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" fixed bottom temporary>
    <profile_icon />
    <div class="btns_menu_mobile_login">
      <Account_btn_login />
    </div>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item
        v-for="item in items"
        :key="item"
        :href="item.link"
        link
        active-class="deep-purple--text text--accent-4"
      >
        <div class="flexed">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import toggleTheme from "./toggletheme.vue";
import Account_btn_login from "./account_btn_login.vue";
import profile_icon from "./profile_icon.vue";
import profile_image from "./profile_image.vue";

export default {
  name: "navbar_main",
  components: {
    toggleTheme,
    Account_btn_login,
    profile_icon,
    profile_image,
  },
  data: () => ({
    drawer: false,
    group: null,
    items: [{ text: "Accueil", icon: "mdi-home", link: "/" }],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
.flexed {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btns_menu_mobile_login v-flex {
  margin: 0.5rem 0 0.5rem 0;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}
.groupomania_logo {
  max-height: 85%;
}
</style>
