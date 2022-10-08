<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-flex d-md-none"></v-app-bar-nav-icon>
    <img src="/src/assets/img/logo.svg" class="logo_groupomania ml-2" />
    <v-spacer></v-spacer>
    <v-flex class="mr-2 d-none d-sm-none d-md-flex">
      <toggleTheme />
      <Account_btn_login />
    </v-flex>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" fixed bottom temporary>
    <v-list-item two-line class="pt-6">
      <v-list-item-content v-if="!user_connected">
        <v-flex class="d-inline">
          <v-list-item-avatar color="darken-3">
            <v-img
              class="elevation-2 image_profile"
              src="https://randomuser.me/api/portraits/men/81.jpg"
              draggable="false"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-title>Nom prénom</v-list-item-title>

        </v-flex>

      </v-list-item-content>

      <v-list-item-content v-else>
        <v-list-item-avatar>
          <v-img
            class="elevation-2 image_profile"
            src="https://randomuser.me/api/portraits/men/11.jpg"
            draggable="false"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Non connecté</v-list-item-title>
        <div class="btns_menu_mobile_login">
          <Account_btn_login />
        </div>
      </v-list-item-content>
    </v-list-item>
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

export default {
  name: "navbar_main",
  components: {
    toggleTheme,
    Account_btn_login
  },
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { text: "Accueil", icon: "mdi-home", link: "/" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" }
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<style scoped>
.image_profile {
  border-radius: 50%;
  user-select: none;
}

.flexed {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo_groupomania {
  max-height: 70%;
}

.btns_menu_mobile_login v-flex {
  margin: .5rem 0 .5rem 0;
  gap: .5rem;
  display: flex;
  flex-direction: column;
}
</style>
