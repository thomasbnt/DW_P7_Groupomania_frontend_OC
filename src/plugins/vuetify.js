// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#FD2D01",
          secondary: "#FFD7D7",
          tertiary: "#4E5166",
          notblack: "#1A1A1A",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#FD2D01",
          secondary: "#FFD7D7",
          tertiary: "#4E5166",
        },
      },
    },
  },
});
