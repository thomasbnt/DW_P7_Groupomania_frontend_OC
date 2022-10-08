<template>
  <navbar_main />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import navbar_main from '../components/navbar_main.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    navbar_main,
  },
});
</script>
