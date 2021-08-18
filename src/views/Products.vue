<template>
  <div id="scroll-target">
    <v-container class="mb-10 pa-5 text-capitalize">
      <!-- Product Search and Add Button -->
      <v-row class="my-0">
        <v-col cols="10">
          <v-text-field
            class="grey--text text--darken-2 elevation-5 rounded-lg"
            background-color="#F7F7FC"
            color="primary"
            append-icon="mdi-magnify"
            filled
            hide-details
            dense
            solo
            single-line
            flat
            outlined
            v-model="searchBar"
          >
          </v-text-field>
        </v-col>
        <v-col cols="2" class="px-1">
          <v-btn
            small
            to="/products/add"
            color="primary"
            class="elevation-5 rounded-lg"
            height="40px"
          >
            <v-icon> mdi-plus-box </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Product List -->
      <product-list :searchBar="searchBar" />
    </v-container>
  </div>
</template>

<script>
import productList from "./components/ProductList.vue";

export default {
  name: "ProductsPage",
  components: { productList },
  data() {
    return {
      searchBar: "",
    };
  },
  computed: {},
};
</script>

<style scoped>
#addProductButton {
  bottom: 75px;
  z-index: 99;
  position: -webkit-sticky;
  position: fixed;
  /* top: 0; */
}

.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}
</style> 