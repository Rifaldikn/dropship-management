import Vue from "vue";
import VueCurrencyFilter from "vue-currency-filter";
import moment from "moment";

Vue.use(VueCurrencyFilter);
Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ".",
  fractionCount: 2,
  fractionSeparator: ",",
  symbolPosition: "front",
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
});

Vue.filter("formatDate", function(dateValue) {
  return moment
    .unix(dateValue.seconds)
    .utc()
    .format("l");
});
