<template>
    <navbar_main />
    <v-container>
        Signup
    </v-container>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import navbar_main from '../components/navbar_main.vue';
  
  export default defineComponent({
    name: 'SignupView',
  
    components: {
      navbar_main,
    },
  });
  </script>
  