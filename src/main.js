import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2TouchEvents from "vue2-touch-events";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib"; //Globally import VTextField

import "./filters/filters";

Vue.component("v-text-field", VTextField);

// Vue.use(filters);

Vue.use(VCurrencyField, {
  locale: "pt-BR",
  decimalLength: 0,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: true,
});

Vue.use(Vue2TouchEvents, {
  passive: false,
  disableClick: false,
  touchClass: "",
  tapTolerance: 10,
  touchHoldTolerance: 500,
  swipeTolerance: 30,
  longTapTimeInterval: 400,
  namespace: "my-touch",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: (h) => h(App),
}).$mount("#app");
