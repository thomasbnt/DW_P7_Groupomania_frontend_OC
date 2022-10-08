<template>
  <navbar_main />
  <v-container>
    Login
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import navbar_main from "../components/navbar_main.vue";

export default defineComponent({
  name: "LoginView",

  components: {
    navbar_main
  }
});
</script>
  