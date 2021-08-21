<template>
  <div>
    <v-container class="pa-5">
      <v-row class="my-3 d-flex justify-center" no-gutters>
        <v-col cols="10" class="">
          <v-text-field
            class="grey--text text--darken-2 elevation-5 rounded-lg"
            background-color="#F7F7FC"
            color="primary"
            append-icon="mdi-magnify"
            flled
            hide-details
            dense
            solo
            single-line
            flat
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="2" class="px-1">
          <v-btn
            small
            color="primary"
            class="elevation-5 rounded-lg ml-2"
            height="40px"
            :to="
              storeSwitcher == 'customers'
                ? '/store/customers/add'
                : '/store/suppliers/add'
            "
          >
            <v-icon> mdi-account-plus-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="d-flex justify-center">
          <v-card
            outlined
            id="storeSwitcher"
            class="rounded-lg mx-auto pa-2"
            background-color="white"
            width="200px"
          >
            <v-item-group
              active-class="primary"
              v-model="storeSwitcher"
              mandatory
            >
              <v-row class="">
                <v-col class="px-0">
                  <v-item v-slot="{ active, toggle }" value="customers">
                    <v-btn
                      class="
                        caption
                        text-capitalize
                        elevation-0
                        font-weight-medium
                        rounded-lg
                      "
                      block
                      small
                      :color="active ? 'primary' : 'white'"
                      :class="active ? 'text--white' : 'primary--text'"
                      @click="toggle"
                      value="customers"
                      >Customers</v-btn
                    >
                  </v-item>
                </v-col>
                <v-col class="px-0">
                  <v-item v-slot="{ active, toggle }" value="suppliers">
                    <v-btn
                      class="
                        caption
                        text-capitalize
                        elevation-0
                        font-weight-medium
                        rounded-lg
                      "
                      block
                      small
                      :class="active ? 'text--white' : 'primary--text'"
                      :color="active ? 'primary' : 'white'"
                      @click="toggle"
                      >Suppliers</v-btn
                    >
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-card>
        </v-col>
      </v-row>
      <customer-list v-if="storeSwitcher == 'customers'" />
      <supplier-list v-else />
    </v-container>
    <!-- <v-container> -->
    <!-- List of Customers & Suppliers -->
    <!-- <v-slide-x-transition> -->

    <!-- </v-slide-x-transition> -->
    <!-- </v-container> -->
  </div>
</template>

<script>
import customerList from "./components/CustomerList.vue";
import supplierList from "./components/SupplierList.vue";

export default {
  name: "Store",
  components: { customerList, supplierList },
  data() {
    return {
      storeSwitcher: "customers",
    };
  },
  watch: {
    // call again the method if the route changes
    $route: "productDataFetch",
  },
};
</script>

<style scoped>
#storeSwitcher {
  position: fixed;
  bottom: 75px;
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 99;
}

.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}
</style>