<template>
  <v-btn @click="toggleTheme">
    <v-icon>{{ themeIcon }}</v-icon>
  </v-btn>
</template>
<script>
import { useTheme } from "vuetify";
export default {
  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () => (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"),
      themeIcon: () => (theme.global.current.value.dark ? "mdi-lightbulb-on" : "mdi-lightbulb"),
    };
  },
};
</script>
