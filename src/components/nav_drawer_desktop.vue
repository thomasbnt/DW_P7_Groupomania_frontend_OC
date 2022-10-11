<template>
  <v-navigation-drawer>
    <nav_content :user="userProfile" />
  </v-navigation-drawer>
</template>
<script>
import nav_content from "./nav_content.vue";
export default {
  name: "nav_drawer_desktop",
  props: {
    user: Object,
  },
  components: {
    nav_content,
  },
  
};
</script>
