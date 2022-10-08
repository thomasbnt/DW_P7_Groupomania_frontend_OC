<template>
  <navbar_main />
  <v-container>
    <h1>Les derniers posts</h1>
    <v-card></v-card>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    navbar_main,
  },
});
</script>
