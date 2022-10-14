<template>
  <v-navigation-drawer :user="userProfile">
    <nav_content :user="userProfile"/>
  </v-navigation-drawer>
</template>
<script>
import nav_content from "./nav_content.vue";
export default {
  name: "menuDesktop",
  props: {
    user: Object,
  },
  data () {
    return {
      userProfile: {},
    }
  },
  components: {
    nav_content,
  },
};
</script>
