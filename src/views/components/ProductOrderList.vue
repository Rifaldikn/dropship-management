<template>
  <v-item-group multiple>
    <v-container>
      <!-- <v-row class="px-3 pt-5">
        <v-text-field
          solo
          label="Search Product"
          class="rounded-lg"
          id="id"
          flat
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-row> -->
      <v-row style="overflow-y: auto">
        <v-col
          v-for="product in productList"
          :key="product.id"
          cols="6"
          class="pb-0"
        >
          <v-card class="rounded-lg" height="auto" outlined>
            <v-row no-gutters class="d-flex aling-space-between">
              <v-col cols="12" class="px-5 d-flex align-center justify-center">
                <v-img
                  src="../../assets/warn.png"
                  position="center center"
                  contain
                  width="125px"
                  height="150px"
                >
                </v-img>
              </v-col>
              <v-col class="px-2 py-0 text-start">
                <v-list-item-subtitle class="caption">{{
                  product.name
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="caption primary--text">
                  Rp {{ product.price | currency }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="caption grey--text text--darken-2">
                  {{ product.supplier_name }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption grey--text text--darken-2">
                  {{ product.supplier_location }}
                </v-list-item-subtitle>
              </v-col>
              <v-col cols="12" class="d-flex justify-center pa-2">
                <v-btn
                  block
                  color="primary"
                  class="rounded-lg text-capitalize"
                  @click="$emit('selectedProduct', product)"
                  small
                  >Add to Cart
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductOrderList",
  props: ["dialog"],
  computed: {
    ...mapGetters(["productList"]),
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}
</style>

