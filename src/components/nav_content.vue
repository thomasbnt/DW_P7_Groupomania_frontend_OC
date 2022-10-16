<template>
  <div>
    <profile_icon :user="userProfile" />
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

    <nav_btn_bottom :user="userProfile" />
  </div>
</template>
<script>
import profile_icon from "./profile_icon.vue";
import account_btn_connect from "./account_btn_connect.vue";
import nav_btn_bottom from "./nav_btn_bottom.vue";

export default {
  name: "nav_content",
  components: {
    profile_icon,
    account_btn_connect,
    nav_btn_bottom
  },
  props: {
    user: Object,
  },
  data () {
    return {
      userProfile: {},
      items: [
        { text: "Accueil", icon: "mdi-home", link: "/", userMustBeConnected: true },
        { text: "Mes informations publiques", link: "/settings", icon: "mdi-account-edit", userMustBeConnected: true },
        { text: "Paramètres de sécurité", link: "/security", icon: "mdi-security", userMustBeConnected: true },
        { text: "Vie privée", link: "/privacy", icon: "mdi-account-key", userMustBeConnected: false },
        { text: "Conditions d'utilisation", link: "/terms", icon: "mdi-account-details", userMustBeConnected: false }
      ]
    }
  },
  methods: {
    async checkUserCanViewThisPage() {
      const user = localStorage.getItem("session_token");
      // Si l'user n'est pas connecté
      if (!user) {
        this.items.forEach((item) => {
          // pour tous les items du menu où l'user doit être connecté
          if (item.userMustBeConnected) {
            // on cache l'item du menu
            item.icon = "mdi-lock";
          }
        });
      }
    }
  },
  created() {
    this.checkUserCanViewThisPage();
  }
};
</script>
<style scoped>
.flexed {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
