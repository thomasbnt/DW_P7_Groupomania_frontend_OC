<template>
  <v-system-bar color="red darken-4" v-if="!apiIsUp">
    <v-spacer></v-spacer>
    <v-items class="mr-1 ml-1">Erreur avec la connexion avec l'API.</v-items>
  </v-system-bar>
</template>

<script>
export default {
  name: "checkApiIsUp",
  data: () => ({
    apiIsUp: true
  }),
  methods: {
    async status_api() {
      try {
        const response = await fetch("http://localhost:3000/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
      } catch (error) {
        console.info("API is down... waiting 10 seconds to retry");
        this.apiIsUp = false;
      }
    }
  },
  created() {
    this.status_api();
  }
};
</script>

<style scoped>

</style>