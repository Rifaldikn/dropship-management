import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  font: {
    family: "Poppins",
  },
  theme: {
    themes: {
      light: {
        primary: "#5A63DC",
        // primary: "#A78AE2",

        secondary: "#EFEFFD",
        success: "#73D673",
        // secondary: "#b0bec5",
        // accent: "#8c9eff",
        error: "#FF5A58",
      },
      dark: {
        // primary: ,
      },
    },
  },
});
