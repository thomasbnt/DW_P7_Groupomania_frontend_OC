<template>
  <navbar_main :user="userProfile" />
  <MenuDesktop :user="userProfile" />
  <v-container>
    <v-card elevation="2" class="pa-6 pb-1 mb-5">
      <h1 class="mb-5">Vie privée</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa necessitatibus neque odit possimus quos.
        Accusantium assumenda, cum dolores facilis harum inventore minus molestiae mollitia quae, quasi similique soluta
        voluptatem voluptates.
      </p>
    </v-card>
  </v-container>
</template>

<script>
import navbar_main from "../components/navbar_main.vue";
import MenuDesktop from "../components/menuDesktop.vue";
export default {
  name: "PrivacyView",
  data: () => ({
    userProfile: {}
  }),
  components: {
    navbar_main,
    MenuDesktop
  },
};
</script>

<style scoped>

</style>